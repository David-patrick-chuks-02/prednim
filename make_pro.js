const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lffrryypartlludmjzqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZnJyeXlwYXJ0bGx1ZG1qenF5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ0MjQ3OCwiZXhwIjoyMTA5MDE4NDc4fQ.YP24tDmnCDXhY--GRN6Hx4S2v4CynEYhQqng2TXX99k';

const supabase = createClient(supabaseUrl, supabaseKey);

async function makeProUser() {
  try {
    // Get user by email
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('Error listing users:', userError);
      return;
    }

    const user = users.users.find(u => u.email === 'davidchuksdev@gmail.com');
    
    if (!user) {
      console.error('User not found');
      return;
    }

    console.log(`Found user: ${user.id} (${user.email})`);

    // Create subscription for this user
    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        plan_type: 'monthly',
        status: 'active',
        current_period_start: now.toISOString(),
        current_period_end: endDate.toISOString(),
        cancel_at_period_end: false,
      }, { onConflict: 'user_id' });

    if (subError) {
      console.error('Error creating subscription:', subError);
      return;
    }

    console.log('✓ Subscription created/updated successfully!');
    console.log(`✓ User ${user.email} is now a PRO member`);
    console.log(`✓ Subscription active until: ${endDate.toDateString()}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

makeProUser();
