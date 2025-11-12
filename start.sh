#!/bin/bash

echo "🎬 YouTube View Booster Setup"
echo "============================="

# Check dependencies
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    pkg install nodejs -y
fi

if ! command -v git &> /dev/null; then
    echo "📦 Installing Git..."
    pkg install git -y
fi

# Create project
mkdir -p youtube-view-booster
cd youtube-view-booster

# Create package.json
cat > package.json << 'EOF'
{
  "name": "youtube-view-booster",
  "version": "1.0.0",
  "description": "YouTube View Booster - Educational Testing Tool",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12",
    "cors": "^2.8.5",
    "user-agents": "^1.1.1"
  }
}
EOF

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo ""
echo "✅ YouTube View Booster Setup Complete!"
echo "🚀 Starting server..."
echo ""

npm start
