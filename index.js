const express = require('express');
const cors = require('cors');
const handleYouTubeBoost = require('./youtube-proxy');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/boost-views', handleYouTubeBoost);

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔥 ULTRA YouTube Views Booster</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.1.0/remixicon.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .gradient-text { background: linear-gradient(135deg, #FF0000, #FF3333); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .glow {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
        }
        
        .pulse-glow {
            animation: pulse-glow 2s infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.3); }
            50% { box-shadow: 0 0 40px rgba(255, 0, 0, 0.6); }
        }
        
        .slide-in {
            animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    </style>
</head>
<body class="bg-black min-h-screen text-white overflow-x-hidden">
    <!-- Animated Background -->
    <div class="fixed inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/20"></div>
    <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-black to-black"></div>

    <div class="relative z-10 container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12 slide-in">
            <div class="flex items-center justify-center mb-6">
                <div class="relative mr-6">
                    <div class="absolute inset-0 bg-red-500 animate-ping rounded-full opacity-20"></div>
                    <i class="ri-youtube-fill text-8xl text-red-500 relative z-10 pulse-glow"></i>
                </div>
                <div>
                    <h1 class="text-7xl font-black gradient-text mb-2">
                        ULTRA BOOST
                    </h1>
                    <p class="text-gray-400 text-xl font-medium">Advanced YouTube Views Increase System</p>
                </div>
            </div>
            
            <!-- Stats Banner -->
            <div class="glass border border-gray-800 rounded-3xl p-6 max-w-4xl mx-auto mb-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div class="text-3xl font-black text-green-400">10</div>
                        <div class="text-gray-400 text-sm font-medium">PREMIUM PROXIES</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-black text-blue-400">9</div>
                        <div class="text-gray-400 text-sm font-medium">USER AGENTS</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-black text-yellow-400">100%</div>
                        <div class="text-gray-400 text-sm font-medium">REAL SIMULATION</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-black text-red-400">ULTRA</div>
                        <div class="text-gray-400 text-sm font-medium">PERFORMANCE</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Grid -->
        <div class="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
            <!-- Input Section -->
            <div class="xl:col-span-3">
                <div class="glass border border-gray-800 rounded-3xl p-8 glow">
                    <div class="flex items-center justify-between mb-8">
                        <h2 class="text-4xl font-black text-white flex items-center">
                            <i class="ri-rocket-2-line mr-3 text-red-500"></i>
                            BOOST CONTROL PANEL
                        </h2>
                        <div class="flex items-center space-x-2 bg-gray-900 rounded-2xl px-4 py-2 border border-gray-700">
                            <i class="ri-server-line text-blue-400"></i>
                            <span class="text-sm font-bold">PORT: ${PORT}</span>
                        </div>
                    </div>

                    <form id="boostForm" class="space-y-8">
                        <!-- YouTube URL -->
                        <div>
                            <label class="flex items-center text-white text-xl font-black mb-4">
                                <i class="ri-link mr-3 text-red-500"></i>
                                YOUTUBE VIDEO URL
                            </label>
                            <div class="relative">
                                <input 
                                    type="url" 
                                    id="videoUrl" 
                                    placeholder="https://www.youtube.com/watch?v=..." 
                                    required
                                    class="w-full px-6 py-5 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all duration-300 outline-none text-lg font-bold"
                                >
                                <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <i class="ri-youtube-line text-2xl text-red-500"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Settings Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <!-- Views Count -->
                            <div>
                                <label class="flex items-center text-white text-lg font-black mb-3">
                                    <i class="ri-eye-line mr-2 text-red-500"></i>
                                    VIEWS COUNT
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        id="viewCount" 
                                        value="50"
                                        min="1" 
                                        max="100"
                                        required
                                        class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all duration-300 outline-none text-center font-black text-lg"
                                    >
                                </div>
                            </div>

                            <!-- Delay -->
                            <div>
                                <label class="flex items-center text-white text-lg font-black mb-3">
                                    <i class="ri-timer-line mr-2 text-red-500"></i>
                                    DELAY (SECONDS)
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        id="viewDelay" 
                                        value="3"
                                        min="1" 
                                        max="10"
                                        required
                                        class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all duration-300 outline-none text-center font-black text-lg"
                                    >
                                </div>
                            </div>

                            <!-- Proxy Toggle -->
                            <div>
                                <label class="flex items-center text-white text-lg font-black mb-3">
                                    <i class="ri-shield-keyhole-line mr-2 text-red-500"></i>
                                    PROXY SYSTEM
                                </label>
                                <div class="relative">
                                    <label class="inline-flex items-center cursor-pointer w-full">
                                        <input type="checkbox" id="proxyToggle" checked class="sr-only peer">
                                        <div class="w-16 h-8 bg-gray-700 peer-focus:outline-none rounded-2xl peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-2xl after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                                        <span class="ml-3 text-sm font-black text-white">ENABLED</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Boost Button -->
                        <button 
                            type="submit" 
                            id="boostBtn"
                            class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-3 text-xl relative overflow-hidden group pulse-glow"
                        >
                            <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <i class="ri-fire-fill text-2xl group-hover:animate-bounce"></i>
                            <span class="relative z-10">🚀 IGNITE BOOSTER</span>
                        </button>
                    </form>

                    <!-- Live Stats -->
                    <div id="liveStats" class="hidden mt-8 slide-in">
                        <div class="glass border border-gray-700 rounded-2xl p-6">
                            <h3 class="text-xl font-black text-white mb-4 flex items-center">
                                <i class="ri-dashboard-3-line mr-2 text-red-500"></i>
                                LIVE BOOSTING STATS
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                                    <div class="text-2xl font-black text-green-400" id="liveSuccess">0</div>
                                    <div class="text-green-400 text-sm font-black">SUCCESS</div>
                                </div>
                                <div class="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
                                    <div class="text-2xl font-black text-red-400" id="liveFailed">0</div>
                                    <div class="text-red-400 text-sm font-black">FAILED</div>
                                </div>
                                <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                                    <div class="text-2xl font-black text-yellow-400" id="liveProgress">0%</div>
                                    <div class="text-yellow-400 text-sm font-black">PROGRESS</div>
                                </div>
                                <div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-center">
                                    <div class="text-2xl font-black text-white" id="liveRemaining">0</div>
                                    <div class="text-blue-400 text-sm font-black">REMAINING</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Side Panel -->
            <div class="space-y-8">
                <!-- System Info -->
                <div class="glass border border-gray-800 rounded-3xl p-6">
                    <h3 class="text-xl font-black text-white mb-4 flex items-center">
                        <i class="ri-cpu-line mr-2 text-red-500"></i>
                        SYSTEM STATUS
                    </h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Proxies</span>
                            <span class="text-green-400 font-black">10 ACTIVE</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">User Agents</span>
                            <span class="text-yellow-400 font-black">9 ROTATING</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Security</span>
                            <span class="text-blue-400 font-black">MAXIMUM</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Speed</span>
                            <span class="text-red-400 font-black">ULTRA</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="glass border border-gray-800 rounded-3xl p-6">
                    <h3 class="text-xl font-black text-white mb-4 flex items-center">
                        <i class="ri-flashlight-line mr-2 text-red-500"></i>
                        QUICK ACTIONS
                    </h3>
                    <div class="space-y-3">
                        <button onclick="clearLogs()" class="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 font-black border border-gray-700">
                            <i class="ri-delete-bin-line"></i>
                            <span>CLEAR LOGS</span>
                        </button>
                        <button onclick="exportLogs()" class="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 font-black border border-gray-700">
                            <i class="ri-download-line"></i>
                            <span>EXPORT LOGS</span>
                        </button>
                    </div>
                </div>

                <!-- Proxy Info -->
                <div class="glass border border-gray-800 rounded-3xl p-6">
                    <h3 class="text-xl font-black text-white mb-4 flex items-center">
                        <i class="ri-shield-star-line mr-2 text-red-500"></i>
                        PROXY INFO
                    </h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-400">Provider:</span>
                            <span class="text-green-400 font-bold">WEBSHARE</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Total:</span>
                            <span class="text-white font-bold">10 Proxies</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Type:</span>
                            <span class="text-blue-400 font-bold">HTTP/HTTPS</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Auth:</span>
                            <span class="text-yellow-400 font-bold">USER/PASS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Results Section -->
        <div id="resultsSection" class="hidden mt-12 slide-in">
            <div class="glass border border-gray-800 rounded-3xl p-8 glow">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-4xl font-black text-white flex items-center">
                        <i class="ri-bar-chart-2-line mr-3 text-red-500"></i>
                        BOOSTING RESULTS
                    </h2>
                    <div class="flex items-center space-x-3">
                        <div id="completionTime" class="bg-gray-800 rounded-2xl px-4 py-2 text-sm font-black border border-gray-700"></div>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div id="summaryCards" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <!-- Dynamic Content -->
                </div>

                <!-- Advanced Logs -->
                <div class="bg-gray-900 rounded-3xl p-6 border border-gray-800">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-black text-white flex items-center">
                            <i class="ri-terminal-line mr-2 text-red-500"></i>
                            ADVANCED LOGS SYSTEM
                        </h3>
                        <div class="flex items-center space-x-2 text-sm">
                            <div class="bg-red-500/20 text-red-400 rounded-2xl px-3 py-1 font-black">REAL-TIME</div>
                            <div class="bg-green-500/20 text-green-400 rounded-2xl px-3 py-1 font-black">LIVE</div>
                        </div>
                    </div>
                    
                    <div id="detailedLogs" class="space-y-3 max-h-96 overflow-y-auto scrollbar-hide rounded-2xl p-4 bg-black/50">
                        <!-- Logs will appear here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12">
            <div class="glass border border-gray-800 rounded-3xl p-6 max-w-2xl mx-auto">
                <p class="text-gray-400 flex items-center justify-center space-x-2 text-sm font-black">
                    <i class="ri-shield-check-line text-red-500"></i>
                    <span>ULTRA YOUTUBE VIEWS BOOSTER • WEBSHARE PROXIES • EDUCATIONAL USE</span>
                </p>
            </div>
        </div>
    </div>

    <script>
        const form = document.getElementById('boostForm');
        const boostBtn = document.getElementById('boostBtn');
        const resultsSection = document.getElementById('resultsSection');
        const liveStats = document.getElementById('liveStats');
        const summaryCards = document.getElementById('summaryCards');
        const detailedLogs = document.getElementById('detailedLogs');
        const completionTime = document.getElementById('completionTime');

        function updateLiveStats(success, failed, total, progress) {
            document.getElementById('liveSuccess').textContent = success;
            document.getElementById('liveFailed').textContent = failed;
            document.getElementById('liveProgress').textContent = progress + '%';
            document.getElementById('liveRemaining').textContent = total - (success + failed);
        }

        function addLog(message, type = 'info', data = null) {
            const log = document.createElement('div');
            const colors = {
                success: 'border-l-green-500 bg-green-500/5',
                error: 'border-l-red-500 bg-red-500/5', 
                info: 'border-l-blue-500 bg-blue-500/5',
                warning: 'border-l-yellow-500 bg-yellow-500/5',
                system: 'border-l-red-500 bg-red-500/5'
            };
            
            const icons = {
                success: 'ri-checkbox-circle-fill text-green-400',
                error: 'ri-close-circle-fill text-red-400',
                info: 'ri-information-fill text-blue-400',
                warning: 'ri-alert-fill text-yellow-400',
                system: 'ri-terminal-line text-red-400'
            };
            
            log.className = \`p-4 rounded-2xl border-l-4 \${colors[type]} transition-all duration-300 hover:scale-105 slide-in\`;
            
            let logContent = \`
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3 flex-1">
                        <i class="\${icons[type]} text-xl"></i>
                        <div class="flex-1">
                            <div class="text-white font-bold">\${message}</div>
            \`;
            
            if (data) {
                logContent += \`
                            <div class="text-gray-400 text-sm mt-1 flex flex-wrap gap-2">
                                \${data.proxy ? \`<span class="bg-gray-800 px-2 py-1 rounded-2xl border border-gray-700">\${data.proxy}</span>\` : ''}
                                \${data.duration ? \`<span class="bg-green-500/20 text-green-400 px-2 py-1 rounded-2xl border border-green-500/20">⏱️ \${data.duration}</span>\` : ''}
                                \${data.userAgent ? \`<span class="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-2xl border border-blue-500/20">🖥️ \${data.userAgent}</span>\` : ''}
                            </div>
                \`;
            }
            
            logContent += \`
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="text-gray-400 text-sm font-mono font-bold">\${new Date().toLocaleTimeString()}</span>
                        <div class="w-2 h-2 bg-\${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'red'}-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            \`;
            
            log.innerHTML = logContent;
            detailedLogs.insertBefore(log, detailedLogs.firstChild);
        }

        function clearLogs() {
            detailedLogs.innerHTML = '';
            addLog('System logs cleared successfully. Ready for new boosting session.', 'system');
        }

        function exportLogs() {
            const logs = detailedLogs.innerText;
            const blob = new Blob([logs], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ultra-booster-logs.txt';
            a.click();
            URL.revokeObjectURL(url);
            addLog('Logs exported successfully!', 'success');
        }

        function createSummaryCard(data) {
            summaryCards.innerHTML = \`
                <div class="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 glow">
                    <i class="ri-checkbox-circle-line text-4xl text-green-400 mb-3"></i>
                    <div class="text-3xl font-black text-white">\${data.successfulViews}</div>
                    <div class="text-green-400 text-sm font-black">SUCCESSFUL VIEWS</div>
                </div>
                <div class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 glow">
                    <i class="ri-close-circle-line text-4xl text-red-400 mb-3"></i>
                    <div class="text-3xl font-black text-white">\${data.failedViews}</div>
                    <div class="text-red-400 text-sm font-black">FAILED VIEWS</div>
                </div>
                <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 glow">
                    <i class="ri-line-chart-line text-4xl text-yellow-400 mb-3"></i>
                    <div class="text-3xl font-black text-white">\${data.successRate}</div>
                    <div class="text-yellow-400 text-sm font-black">SUCCESS RATE</div>
                </div>
                <div class="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 glow">
                    <i class="ri-time-line text-4xl text-blue-400 mb-3"></i>
                    <div class="text-3xl font-black text-white">\${data.averageWatchTime}</div>
                    <div class="text-blue-400 text-sm font-black">AVG WATCH TIME</div>
                </div>
            \`;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const videoUrl = document.getElementById('videoUrl').value;
            const viewCount = parseInt(document.getElementById('viewCount').value);
            const viewDelay = parseInt(document.getElementById('viewDelay').value) * 1000;
            const useProxy = document.getElementById('proxyToggle').checked;

            if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
                addLog('Please enter a valid YouTube URL', 'error');
                return;
            }

            // Reset UI
            boostBtn.disabled = true;
            boostBtn.innerHTML = '<i class="ri-loader-4-line animate-spin text-2xl"></i><span class="ml-2">BOOSTING IN PROGRESS...</span>';
            liveStats.classList.remove('hidden');
            resultsSection.classList.remove('hidden');
            updateLiveStats(0, 0, viewCount, 0);

            addLog(\`🚀 Starting ULTRA YouTube view booster for \${viewCount} views...\`, 'system');
            addLog(\`🎯 Target URL: \${videoUrl}\`, 'info');
            addLog(\`🛡️  Proxy System: \${useProxy ? 'ENABLED' : 'DISABLED'}\`, 'info');

            try {
                const response = await fetch('/api/boost-views', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        url: videoUrl, 
                        count: viewCount, 
                        delay: viewDelay,
                        useProxy: useProxy
                    }),
                });

                const data = await response.json();
                
                if (data.success) {
                    createSummaryCard(data.summary);
                    completionTime.textContent = data.summary.completionTime;
                    
                    addLog(\`🎉 ULTRA BOOSTING COMPLETED! \${data.summary.successfulViews} successful views out of \${data.summary.totalAttempts} attempts (\${data.summary.successRate} success rate)\`, 'success');
                    
                    // Display individual results
                    data.detailedResults.forEach(result => {
                        if (result.success) {
                            addLog(\`View \${result.attempt}: ✅ \${result.title}\`, 'success', {
                                proxy: result.proxy,
                                duration: result.duration,
                                userAgent: result.userAgent
                            });
                        } else {
                            addLog(\`View \${result.attempt}: ❌ \${result.error}\`, 'error', {
                                proxy: result.proxy
                            });
                        }
                    });

                    updateLiveStats(data.summary.successfulViews, data.summary.failedViews, viewCount, 100);

                } else {
                    addLog(\`❌ Boosting failed: \${data.error}\`, 'error');
                }

            } catch (error) {
                addLog(\`❌ Network error: \${error.message}\`, 'error');
            } finally {
                boostBtn.disabled = false;
                boostBtn.innerHTML = '<i class="ri-fire-fill text-2xl"></i><span class="ml-2">🚀 IGNITE BOOSTER</span>';
            }
        });

        // Add initial log
        setTimeout(() => {
            addLog('🔥 ULTRA YouTube Views Booster is READY! Enter YouTube URL and ignite booster.', 'system');
        }, 1000);
    </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
    console.log(`🔥 ULTRA YouTube Views Booster Server running on PORT: ${PORT}`);
    console.log(`📺 Access your booster: http://localhost:${PORT}`);
    console.log(`🛡️  Using 10 Premium Webshare Proxies`);
    console.log(`🚀 Ready to boost YouTube views with REAL proxy rotation!`);
    console.log(`⚠️  EDUCATIONAL PURPOSE ONLY - USE RESPONSIBLY`);
});
