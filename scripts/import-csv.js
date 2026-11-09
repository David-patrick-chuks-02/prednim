const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const CSV_PATH = '/Users/mac/Documents/github/my-bounty/data/customers-data.csv';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwocylryfugxftsxrjmc.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  process.exit(1);
}

async function importSubscriptions() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Read CSV
    console.log(`📖 Reading CSV from: ${CSV_PATH}`);
    const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = csvContent.trim().split('\n');

    console.log(`✅ CSV loaded with ${lines.length} lines`);

    // Get all auth users
    console.log(`\n👥 Fetching auth users...`);
    let allAuthUsers = [];
    let page = 1;
    while (true) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage: 50,
      });
      if (error) throw error;
      const users = Array.isArray(data?.users) ? data.users : [];
      allAuthUsers = allAuthUsers.concat(users);
      console.log(`   Page ${page}: ${users.length} users`);
      if (users.length < 50) break;
      page++;
    }
    console.log(`✅ Total auth users: ${allAuthUsers.length}`);

    // Parse CSV - alternating rows for data and status
    const subscriptionsToInsert = [];
    const currentDate = new Date();
    let activeCount = 0;
    let processedCount = 0;

    // Skip line 0 (header) and line 1 (payment_status label)
    for (let i = 2; i < lines.length; i += 2) {
      const dataLine = lines[i]?.trim();
      const statusLine = lines[i + 1]?.trim();

      if (!dataLine || !statusLine) continue;

      try {
        // Parse payment status
        const statusParts = statusLine.split(',');
        const status = statusParts[1]?.trim().toLowerCase() || '';

        if (status !== 'paid') continue;

        // Parse customer data - handle quoted CSV fields
        const parts = [];
        let current = '';
        let inQuotes = false;

        for (let j = 0; j < dataLine.length; j++) {
          const char = dataLine[j];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            parts.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        parts.push(current.trim());

        // Extract fields based on header: customer_id,email,name,phone_number,is_guest,metadata,...,created_at,updated_at
        const email = parts[1]?.toLowerCase() || '';
        const createdAtStr = parts[13]?.trim() || '';

        if (!email || !createdAtStr) continue;

        // Find auth user
        const authUser = allAuthUsers.find(u => u.email?.toLowerCase() === email);
        if (!authUser) {
          console.log(`⚠️  No auth user found for: ${email}`);
          continue;
        }

        // Calculate expiry (30 days from purchase)
        const purchaseDate = new Date(createdAtStr);
        const expiryDate = new Date(purchaseDate);
        expiryDate.setDate(expiryDate.getDate() + 30);

        const isActive = currentDate < expiryDate;
        if (isActive) activeCount++;

        // Only import active subscriptions (schema doesn't support 'expired' status)
        if (!isActive) continue;

        subscriptionsToInsert.push({
          id: Math.floor(Math.random() * 9000000000) + 1000000000,
          user_id: authUser.id,
          plan_type: 'monthly',
          status: 'active',
          current_period_start: purchaseDate.toISOString(),
          current_period_end: expiryDate.toISOString(),
          cancel_at_period_end: false,
        });

        processedCount++;
      } catch (err) {
        console.error(`❌ Error parsing line ${i}:`, err.message);
      }
    }

    if (subscriptionsToInsert.length === 0) {
      console.error('❌ No valid paid subscriptions found in CSV');
      process.exit(1);
    }

    console.log(`\n📊 Parsed ${processedCount} paid subscriptions (${activeCount} active, ${subscriptionsToInsert.length - activeCount} expired)`);

    // Upsert subscriptions
    console.log(`\n⏳ Upserting subscriptions...`);
    const { data, error } = await supabase
      .from('subscriptions')
      .upsert(subscriptionsToInsert, { onConflict: 'user_id' })
      .select();

    if (error) {
      console.error('❌ Upsert error:', error);
      process.exit(1);
    }

    console.log(`✅ Successfully imported ${subscriptionsToInsert.length} subscriptions`);
    console.log(`\n📈 Summary:`);
    console.log(`   Total: ${subscriptionsToInsert.length}`);
    console.log(`   Active: ${activeCount}`);
    console.log(`   Expired: ${subscriptionsToInsert.length - activeCount}`);

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

importSubscriptions();
