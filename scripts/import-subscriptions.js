const fs = require('fs');
const path = require('path');

const CSV_PATH = '/Users/mac/Documents/github/my-bounty/data/customers-data.csv';
const API_URL = process.env.API_URL || 'http://localhost:3000';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

async function importSubscriptions() {
  try {
    // Read CSV file
    console.log(`📖 Reading CSV from: ${CSV_PATH}`);
    const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');

    if (!csvContent) {
      console.error('❌ CSV file is empty');
      process.exit(1);
    }

    const lines = csvContent.trim().split('\n');
    console.log(`✅ CSV loaded with ${lines.length} lines`);

    // Call import endpoint
    console.log(`\n📤 Calling import endpoint: ${API_URL}/api/admin/import-customers`);

    const response = await fetch(`${API_URL}/api/admin/import-customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(ADMIN_TOKEN && { 'Authorization': `Bearer ${ADMIN_TOKEN}` }),
      },
      body: JSON.stringify({ csvContent }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Import failed:', result.error);
      process.exit(1);
    }

    console.log(`\n✅ Import successful!`);
    console.log(`📊 Details:`, result.details);
    console.log(`\n✨ ${result.message}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importSubscriptions();
