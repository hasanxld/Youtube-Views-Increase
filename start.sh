#!/bin/bash

echo "🎬 YouTube Viewer Proxy Setup"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Installing..."
    pkg install nodejs -y
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Installing..."
    pkg install git -y
fi

# Ask for custom port
echo ""
echo "🔧 Custom Port Setup"
echo "-------------------"
read -p "Enter your desired port number (default: 8080): " CUSTOM_PORT
CUSTOM_PORT=${CUSTOM_PORT:-8080}

# Validate port number
if ! [[ "$CUSTOM_PORT" =~ ^[0-9]+$ ]] || [ "$CUSTOM_PORT" -lt 1024 ] || [ "$CUSTOM_PORT" -gt 65535 ]; then
    echo "❌ Invalid port number. Using default port 8080."
    CUSTOM_PORT=8080
fi

echo "✅ Using port: $CUSTOM_PORT"

# Create project directory
mkdir -p youtube-proxy
cd youtube-proxy

# Create package.json
echo "📦 Creating package.json..."
cat > package.json << EOF
{
  "name": "youtube-proxy",
  "version": "1.0.0",
  "description": "YouTube Viewer Proxy - Educational Purpose Only",
  "main": "index.js",
  "scripts": {
    "start": "PORT=$CUSTOM_PORT node index.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12",
    "cors": "^2.8.5"
  }
}
EOF

# Create proxy.js
echo "🔧 Creating proxy.js..."
cat > proxy.js << 'EOF'
const axios = require('axios');
const cheerio = require('cheerio');

async function handleProxy(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url, count = 1, delay = 2000 } = req.body;
  
  if (!url) return res.status(400).json({ error: 'YouTube URL is required' });
  
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ error: 'Please enter a valid YouTube URL' });
  }

  try {
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < count; i++) {
      try {
        if (i > 0) {
          const progressiveDelay = delay + (i * 500) + Math.random() * 3000;
          await new Promise(resolve => setTimeout(resolve, progressiveDelay));
        }

        const response = await axios.get(url, {
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
          }
        });

        const $ = cheerio.load(response.data);
        const title = $('title').text().replace(' - YouTube', '') || 'YouTube Video';
        const channel = $('meta[itemprop="name"]').attr('content') || 'Unknown Channel';
        
        results.push({
          attempt: i + 1,
          status: 'success',
          statusCode: response.status,
          title: title,
          channel: channel,
          timestamp: new Date().toLocaleTimeString(),
          delay: delay + 'ms'
        });

        successCount++;
        console.log(`✅ View ${i + 1} sent to: ${title}`);

      } catch (error) {
        results.push({
          attempt: i + 1,
          status: 'error',
          error: error.code || error.message,
          timestamp: new Date().toLocaleTimeString(),
          delay: delay + 'ms'
        });
        errorCount++;
        console.log(`❌ View ${i + 1} failed: ${error.message}`);
      }
    }

    res.status(200).json({
      success: true,
      target: url,
      totalAttempts: count,
      successCount: successCount,
      errorCount: errorCount,
      successRate: ((successCount / count) * 100).toFixed(2) + '%',
      results: results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = handleProxy;
EOF

# Create index.js with custom port
echo "🚀 Creating index.js with port $CUSTOM_PORT..."
cat > index.js << EOF
const express = require('express');
const cors = require('cors');
const handleProxy = require('./proxy');

const app = express();
const PORT = process.env.PORT || $CUSTOM_PORT;

app.use(cors());
app.use(express.json());

app.post('/api/proxy', handleProxy);

app.get('/', (req, res) => {
  res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Viewer - Port \${PORT}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.1.0/remixicon.min.css">
</head>
<body class="bg-gradient-to-br from-gray-900 to-black min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="text-center mb-12">
            <div class="flex items-center justify-center mb-4">
                <i class="ri-youtube-fill text-6xl text-red-600 mr-4"></i>
                <h1 class="text-5xl font-bold text-white">YouTube Viewer</h1>
            </div>
            <p class="text-gray-400 text-lg">Running on Port: \${PORT}</p>
            <div class="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
                <p class="text-green-400 text-sm">
                    <i class="ri-server-line mr-2"></i>
                    Server is running on: http://localhost:\${PORT}
                </p>
            </div>
        </div>
        <!-- Rest of your HTML content from previous index.js -->
    </div>
</body>
</html>
  \`);
});

app.listen(PORT, () => {
  console.log(\`🚀 YouTube Viewer Server running on PORT: \${PORT}\`);
  console.log(\`📺 Access your server: http://localhost:\${PORT}\`);
  console.log(\`⚠️  Educational Purpose Only - Use Responsibly\`);
});
EOF

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo ""
echo "✅ Setup Completed Successfully!"
echo "================================"
echo "🔧 Port: $CUSTOM_PORT"
echo "🚀 To start server: npm start"
echo "📺 Access: http://localhost:$CUSTOM_PORT"
echo ""
echo "🎬 Starting server now..."
echo ""

# Start the server
npm start
