# ReVu Systems - Vercel Deploy Fallback

This repository serves as a lightweight deployment trigger for ReVu Systems using Vercel Deploy Hooks. It allows direct deployment to revusystems.ca without requiring a full GitHub push of the entire codebase.

## Purpose
- **Bypass GitHub Size Limitations**: Deploy directly from Replit to Vercel
- **Faster Deployments**: Cut deployment time from minutes to seconds
- **More Reliable**: Eliminate timeout issues with large repositories
- **No Compromises**: Maintain full production quality with instant updates

## Deployment Methods

### Primary Method: Vercel Deploy Hook
```bash
# Run the simple deploy script
node deploy.js

# Or use the shell script
./deploy.sh
```

### Advanced Options
- `direct-vercel-push.js` - Enhanced deployment with fallback mechanisms
- `deploy-webhook.js` - Specialized webhook-only deployment with detailed logging

## Required Environment Variables
- `VERCEL_WEBHOOK_URL` - Vercel project deploy hook URL
- `VERCEL_TOKEN` - Vercel API token (for fallback deployment methods only)

## ReVu Systems Platform Features
- Intelligent Dental Code Queue
- Hygiene AI Assistant
- CBCT, Sedation, NIHB, [L] Flagging Logic
- Stripe Monetization Engine
- Family Mode + Wife Dashboard
- Advanced AI-Powered Billing Intelligence

## Production System
Linked to: https://revusystems.ca  
Powered by Vercel + Replit + AI
