/**
 * ReVu Systems - Direct Webhook Deployment Script
 * 
 * This script triggers a deployment to revusystems.ca using Vercel Deploy Hooks,
 * which is the most reliable method for large repositories.
 * It bypasses GitHub for deployment while maintaining production quality.
 */

require('dotenv').config();
const axios = require('axios');

// Display console banner
console.log('\n\x1b[36m=================================================\x1b[0m');
console.log('\x1b[36m 🚀 ReVu Systems - Direct Webhook Deployment 🚀 \x1b[0m');
console.log('\x1b[36m=================================================\x1b[0m\n');

// Get webhook URL from environment
const WEBHOOK_URL = process.env.VERCEL_WEBHOOK_URL;

if (!WEBHOOK_URL) {
  console.error('\x1b[31m❌ ERROR: Missing VERCEL_WEBHOOK_URL in environment\x1b[0m');
  console.log('\x1b[33mPlease add the webhook URL to your .env file or environment variables.\x1b[0m');
  console.log('\x1b[33mVercel Project → Settings → Git → Deploy Hooks → Create Hook → Copy URL\x1b[0m');
  process.exit(1);
}

// Trigger the deployment via Vercel webhook
async function triggerDeployment() {
  console.log('\x1b[36m➡️ Triggering deployment to revusystems.ca...\x1b[0m');
  
  try {
    const response = await axios.post(WEBHOOK_URL);
    console.log('\x1b[32m✅ Deployment triggered successfully!\x1b[0m');
    console.log(`\x1b[36m➡️ Vercel is now building and deploying revusystems.ca\x1b[0m`);
    console.log(`\x1b[36m➡️ This typically takes 1-2 minutes to complete\x1b[0m`);
    return response.data;
  } catch (error) {
    console.error(`\x1b[31m❌ Deployment failed: ${error.message}\x1b[0m`);
    
    if (error.response) {
      console.error(`\x1b[31mStatus: ${error.response.status}\x1b[0m`);
      console.error(`\x1b[31mResponse: ${JSON.stringify(error.response.data)}\x1b[0m`);
    }
    
    process.exit(1);
  }
}

// Execute deployment
triggerDeployment();