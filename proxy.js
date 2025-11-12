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
  
  // Validate YouTube URL
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({ error: 'Please enter a valid YouTube URL' });
  }

  try {
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < count; i++) {
      try {
        // Add progressive delay
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
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0'
          }
        });

        const $ = cheerio.load(response.data);
        const title = $('title').text().replace(' - YouTube', '') || 'YouTube Video';
        const channel = $('meta[itemprop="name"]').attr('content') || 'Unknown Channel';
        
        // Simulate view count extraction (educational purpose)
        const viewInfo = $('meta[itemprop="interactionCount"]').attr('content') || '0';

        results.push({
          attempt: i + 1,
          status: 'success',
          statusCode: response.status,
          title: title,
          channel: channel,
          views: viewInfo,
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
