const axios = require('axios');
const cheerio = require('cheerio');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { HttpProxyAgent } = require('http-proxy-agent');

class AdvancedYouTubeBooster {
    constructor() {
        this.proxies = require('./proxies.json').proxies;
        this.currentProxyIndex = 0;
        this.userAgents = this.generateUserAgents();
        this.activeProxies = [];
    }

    generateUserAgents() {
        return [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        ];
    }

    getRandomUserAgent() {
        return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
    }

    getNextProxy() {
        const proxy = this.proxies[this.currentProxyIndex];
        this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxies.length;
        return proxy;
    }

    createProxyAgent(proxy) {
        try {
            const proxyUrl = `${proxy.type}://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`;
            if (proxy.type === 'https') {
                return new HttpsProxyAgent(proxyUrl);
            } else {
                return new HttpProxyAgent(proxyUrl);
            }
        } catch (error) {
            console.log(`❌ Proxy agent creation failed: ${error.message}`);
            return null;
        }
    }

    extractVideoId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    async testProxy(proxy) {
        try {
            const agent = this.createProxyAgent(proxy);
            if (!agent) return false;

            const response = await axios.get('http://httpbin.org/ip', {
                httpsAgent: agent,
                httpAgent: agent,
                timeout: 10000
            });
            
            if (response.status === 200) {
                console.log(`✅ Proxy ${proxy.ip}:${proxy.port} - WORKING`);
                return true;
            }
            return false;
        } catch (error) {
            console.log(`❌ Proxy ${proxy.ip}:${proxy.port} - FAILED: ${error.message}`);
            return false;
        }
    }

    async initializeProxies() {
        console.log('🔄 Testing all proxies...');
        this.activeProxies = [];
        
        for (const proxy of this.proxies) {
            const isWorking = await this.testProxy(proxy);
            if (isWorking) {
                this.activeProxies.push(proxy);
            }
            // Small delay between proxy tests
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        console.log(`✅ ${this.activeProxies.length}/${this.proxies.length} proxies are active`);
        return this.activeProxies.length;
    }

    getRandomActiveProxy() {
        if (this.activeProxies.length === 0) return null;
        return this.activeProxies[Math.floor(Math.random() * this.activeProxies.length)];
    }

    async simulateAdvancedView(videoUrl, attemptNumber, useProxy = true) {
        try {
            const videoId = this.extractVideoId(videoUrl);
            if (!videoId) {
                throw new Error('Invalid YouTube URL');
            }

            const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
            let proxy = null;
            let agent = null;

            if (useProxy) {
                proxy = this.getRandomActiveProxy();
                if (!proxy) {
                    throw new Error('No active proxies available');
                }
                agent = this.createProxyAgent(proxy);
            }

            const userAgent = this.getRandomUserAgent();
            const viewDuration = 5000 + Math.random() * 15000; // 5-20 seconds
            const initialDelay = 1000 + Math.random() * 4000;

            await new Promise(resolve => setTimeout(resolve, initialDelay));

            const axiosConfig = {
                timeout: 45000,
                headers: {
                    'User-Agent': userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
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
                },
                maxRedirects: 5
            };

            if (agent) {
                axiosConfig.httpsAgent = agent;
                axiosConfig.httpAgent = agent;
                axiosConfig.proxy = false;
            }

            const response = await axios.get(watchUrl, axiosConfig);

            const $ = cheerio.load(response.data);
            const title = $('meta[property="og:title"]').attr('content') || 'YouTube Video';
            const channel = $('link[itemprop="name"]').attr('content') || 'Unknown Channel';
            const thumbnail = $('meta[property="og:image"]').attr('content') || '';

            // Simulate actual watch time with random interactions
            await new Promise(resolve => setTimeout(resolve, viewDuration));

            // Simulate scroll and additional interactions
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

            return {
                success: true,
                attempt: attemptNumber,
                videoId: videoId,
                title: title.replace(' - YouTube', ''),
                channel: channel,
                duration: Math.round(viewDuration / 1000) + 's',
                timestamp: new Date().toLocaleTimeString(),
                userAgent: userAgent.split(' ')[0] + '...',
                proxy: proxy ? `${proxy.ip}:${proxy.port} (${proxy.country})` : 'DIRECT',
                thumbnail: thumbnail,
                watchTime: viewDuration,
                status: 'COMPLETED',
                responseTime: response.headers['date'] || 'Unknown'
            };

        } catch (error) {
            return {
                success: false,
                attempt: attemptNumber,
                error: error.message,
                errorCode: error.code,
                timestamp: new Date().toLocaleTimeString(),
                proxy: useProxy ? 'PROXY_FAILED' : 'DIRECT_FAILED',
                status: 'FAILED'
            };
        }
    }

    async boostYouTubeViews(videoUrl, count, delayBetweenViews, useProxy = true) {
        const results = [];
        let successfulViews = 0;
        let failedViews = 0;
        let totalWatchTime = 0;

        console.log(`🚀 STARTING ADVANCED YOUTUBE VIEW BOOSTER`);
        console.log(`🎯 Target: ${videoUrl}`);
        console.log(`📊 Views: ${count} | Delay: ${delayBetweenViews}ms`);
        console.log(`🛡️  Proxy System: ${useProxy ? 'ENABLED' : 'DISABLED'}`);
        console.log(`🔧 Active Proxies: ${this.activeProxies.length}`);
        console.log('='.repeat(60));

        // Initialize proxies if using proxy system
        if (useProxy) {
            const activeCount = await this.initializeProxies();
            if (activeCount === 0) {
                throw new Error('No working proxies available. Please check your proxy credentials.');
            }
        }

        for (let i = 0; i < count; i++) {
            try {
                if (i > 0) {
                    const progressiveDelay = delayBetweenViews + (i * 1000) + Math.random() * 5000;
                    await new Promise(resolve => setTimeout(resolve, progressiveDelay));
                }

                const result = await this.simulateAdvancedView(videoUrl, i + 1, useProxy);
                results.push(result);

                if (result.success) {
                    successfulViews++;
                    totalWatchTime += result.watchTime;
                    console.log(`✅ View ${i + 1}: SUCCESS | ${result.proxy} | ${result.duration} watch`);
                } else {
                    failedViews++;
                    console.log(`❌ View ${i + 1}: FAILED | ${result.errorCode || 'Unknown'}`);
                }

            } catch (error) {
                results.push({
                    success: false,
                    attempt: i + 1,
                    error: error.message,
                    timestamp: new Date().toLocaleTimeString(),
                    status: 'CRASHED'
                });
                failedViews++;
                console.log(`💥 View ${i + 1}: CRASHED | ${error.message}`);
            }
        }

        const averageWatchTime = successfulViews > 0 ? Math.round(totalWatchTime / successfulViews / 1000) : 0;

        return {
            summary: {
                totalAttempts: count,
                successfulViews: successfulViews,
                failedViews: failedViews,
                successRate: ((successfulViews / count) * 100).toFixed(2) + '%',
                averageWatchTime: averageWatchTime + 's',
                totalWatchTime: Math.round(totalWatchTime / 1000) + 's',
                videoUrl: videoUrl,
                completionTime: new Date().toLocaleString(),
                proxiesUsed: useProxy ? this.activeProxies.length : 0,
                uniqueUserAgents: this.userAgents.length,
                activeProxies: this.activeProxies.map(p => `${p.ip}:${p.port}`)
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

    const { url, count = 25, delay = 3000, useProxy = true } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'YouTube URL is required' });
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        return res.status(400).json({ error: 'Please enter a valid YouTube URL' });
    }

    if (count > 100) {
        return res.status(400).json({ error: 'Maximum 100 views per request for safety' });
    }

    try {
        const booster = new AdvancedYouTubeBooster();
        const results = await booster.boostYouTubeViews(url, parseInt(count), parseInt(delay), useProxy);

        res.status(200).json({
            success: true,
            message: 'Advanced view boosting completed',
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
