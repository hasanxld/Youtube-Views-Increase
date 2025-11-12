#!/bin/bash

echo "🔥 ULTRA YouTube Views Booster Setup"
echo "===================================="

# Check dependencies
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    pkg update && pkg install nodejs -y
fi

if ! command -v git &> /dev/null; then
    echo "📦 Installing Git..."
    pkg install git -y
fi

# Create project directory
mkdir -p youtube-views-booster
cd youtube-views-booster

# Create package.json
cat > package.json << 'EOF'
{
  "name": "youtube-views-booster",
  "version": "1.0.0",
  "description": "Advanced YouTube Views Booster with Real Proxy Rotation",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12",
    "cors": "^2.8.5",
    "https-proxy-agent": "^7.0.0",
    "http-proxy-agent": "^5.0.0"
  }
}
EOF

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo ""
echo "✅ ULTRA YouTube Views Booster Setup Complete!"
echo "🚀 Starting server with 10 REAL Webshare Proxies..."
echo ""

npm start
