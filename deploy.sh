#!/bin/bash

# ReVu Systems - Quick Deploy Script
# Run with: ./deploy.sh

# Display banner
echo ""
echo -e "\033[36m================================================\033[0m"
echo -e "\033[36m 🚀 ReVu Systems - Quick Webhook Deployment 🚀 \033[0m"
echo -e "\033[36m================================================\033[0m"
echo ""

# Run the deploy script
node deploy.js

# Make the script executable
chmod +x deploy.sh
