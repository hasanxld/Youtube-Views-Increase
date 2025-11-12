const axios = require('axios');
const cheerio = require('cheerio');
const UserAgent = require('user-agents');

class YouTubeViewBooster {
    constructor() {
        this.userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
        ];
    }

    getRandomUserAgent() {
        return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
    }

    extractVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    async simulateView(videoUrl, attemptNumber) {
        try {
            const videoId = this.extractVideoId(videoUrl);
            if (!videoId) {
                throw new Error('Invalid YouTube URL');
            }

            // Construct watch URL
            const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
            
            // Random delay between 2-8 seconds
            const viewDuration = 2000 + Math.random() * 6000;
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

            const response = await axios.get(watchUrl, {
                timeout: 30000,
                headers: {
                    'User-Agent': this.getRandomUserAgent(),
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'DNT': '1',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'none',
                    'Cache-Control': 'max-age=0',
                    'Referer': 'https://www.youtube.com/'
                }
            });

            const $ = cheerio.load(response.data);
            
            // Extract video information
            const title = $('meta[property="og:title"]').attr('content') || 'YouTube Video';
            const channel = $('meta[property="og:site_name"]').attr('content') || 'YouTube';
            const description = $('meta[property="og:description"]').attr('content') || 'No description';
            
            // Simulate watch time
            await new Promise(resolve => setTimeout(resolve, viewDuration));

            return {
                success: true,
                attempt: attemptNumber,
                videoId: videoId,
                title: title.replace(' - YouTube', ''),
                channel: channel,
                duration: Math.round(viewDuration / 1000) + 's',
                timestamp: new Date().toLocaleTimeString(),
                userAgent: this.getRandomUserAgent().substring(0, 50) + '...'
            };

        } catch (error) {
            return {
                success: false,
                attempt: attemptNumber,
                error: error.message,
                timestamp: new Date().toLocaleTimeString()
            };
        }
    }

    async boostViews(videoUrl, count, delayBetweenViews) {
        const results = [];
        let successfulViews = 0;
        let failedViews = 0;

        console.log(`🚀 Starting YouTube View Booster for: ${videoUrl}`);
        console.log(`📊 Target Views: ${count}`);
        console.log(`⏰ Delay: ${delayBetweenViews}ms`);

        for (let i = 0; i < count; i++) {
            try {
                // Progressive delay to avoid detection
                if (i > 0) {
                    const progressiveDelay = delayBetweenViews + (i * 1000) + Math.random() * 5000;
                    await new Promise(resolve => setTimeout(resolve, progressiveDelay));
                }

                const result = await this.simulateView(videoUrl, i + 1);
                results.push(result);

                if (result.success) {
                    successfulViews++;
                    console.log(`✅ View ${i + 1}: SUCCESS - ${result.title}`);
                } else {
                    failedViews++;
                    console.log(`❌ View ${i + 1}: FAILED - ${result.error}`);
                }

            } catch (error) {
                results.push({
                    success: false,
                    attempt: i + 1,
                    error: error.message,
                    timestamp: new Date().toLocaleTimeString()
                });
                failedViews++;
                console.log(`❌ View ${i + 1}: ERROR - ${error.message}`);
            }
        }

        return {
            summary: {
                totalAttempts: count,
                successfulViews: successfulViews,
                failedViews: failedViews,
                successRate: ((successfulViews / count) * 100).toFixed(2) + '%',
                videoUrl: videoUrl,
                completionTime: new Date().toLocaleString()
            },
            detailedResults: results
        };
    }
}

async function handleYouTubeBoost(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { url, count = 10, delay = 5000 } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'YouTube URL is required' });
    }

    // Validate YouTube URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        return res.status(400).json({ error: 'Please enter a valid YouTube URL' });
    }

    if (count > 100) {
        return res.status(400).json({ error: 'Maximum 100 views per request for safety' });
    }

    try {
        const booster = new YouTubeViewBooster();
        const results = await booster.boostViews(url, parseInt(count), parseInt(delay));

        res.status(200).json({
            success: true,
            message: 'View boosting completed',
            ...results
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = handleYouTubeBoost;
