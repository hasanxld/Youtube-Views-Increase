const express = require('express');
const cors = require('cors');
const handleYouTubeBoost = require('./youtube-proxy');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// YouTube View Booster API
app.post('/api/boost-views', handleYouTubeBoost);

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube View Booster - Educational Tool</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.1.0/remixicon.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        youtube: '#FF0000',
                        youtubeDark: '#CC0000',
                        success: '#10B981',
                        warning: '#F59E0B',
                        error: '#EF4444'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gradient-to-br from-gray-900 to-black min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
            <div class="flex items-center justify-center mb-6">
                <i class="ri-youtube-fill text-6xl text-youtube mr-4"></i>
                <div>
                    <h1 class="text-5xl font-bold text-white">YouTube View Booster</h1>
                    <p class="text-gray-400 text-lg mt-2">Educational Testing Tool</p>
                </div>
            </div>
            
            <!-- Warning Banner -->
            <div class="bg-yellow-500/20 border border-yellow-500/50 rounded-2xl p-6 max-w-4xl mx-auto mb-6">
                <div class="flex items-center justify-center space-x-3">
                    <i class="ri-alert-fill text-2xl text-yellow-400"></i>
                    <div>
                        <h3 class="text-yellow-400 font-semibold text-lg">Educational Purpose Only</h3>
                        <p class="text-yellow-300 text-sm mt-1">
                            This tool is for testing and educational purposes only. Use responsibly and in compliance with YouTube's Terms of Service.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Booster Card -->
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Input Section -->
            <div class="lg:col-span-2">
                <div class="bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
                    <h2 class="text-3xl font-bold text-white mb-6 flex items-center">
                        <i class="ri-rocket-2-line mr-3 text-youtube"></i>
                        Boost YouTube Views
                    </h2>

                    <form id="boostForm" class="space-y-6">
                        <!-- YouTube URL -->
                        <div>
                            <label class="flex items-center text-white text-lg font-semibold mb-3">
                                <i class="ri-youtube-line mr-2 text-youtube"></i>
                                YouTube Video URL
                            </label>
                            <input 
                                type="url" 
                                id="videoUrl" 
                                placeholder="https://www.youtube.com/watch?v=..." 
                                required
                                class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-youtube focus:ring-4 focus:ring-youtube/20 transition-all duration-300 outline-none text-lg"
                            >
                        </div>

                        <!-- Settings Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Views Count -->
                            <div>
                                <label class="flex items-center text-white text-lg font-semibold mb-3">
                                    <i class="ri-eye-line mr-2 text-youtube"></i>
                                    Number of Views
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        id="viewCount" 
                                        value="25"
                                        min="1" 
                                        max="100"
                                        required
                                        class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white focus:border-youtube focus:ring-4 focus:ring-youtube/20 transition-all duration-300 outline-none text-lg"
                                    >
                                    <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i class="ri-user-line"></i>
                                    </div>
                                </div>
                                <p class="text-gray-400 text-sm mt-2">Max: 100 views per session</p>
                            </div>

                            <!-- Delay -->
                            <div>
                                <label class="flex items-center text-white text-lg font-semibold mb-3">
                                    <i class="ri-timer-line mr-2 text-youtube"></i>
                                    Delay (Seconds)
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        id="viewDelay" 
                                        value="5"
                                        min="2" 
                                        max="30"
                                        required
                                        class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white focus:border-youtube focus:ring-4 focus:ring-youtube/20 transition-all duration-300 outline-none text-lg"
                                    >
                                    <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <i class="ri-time-line"></i>
                                    </div>
                                </div>
                                <p class="text-gray-400 text-sm mt-2">Between 2-30 seconds</p>
                            </div>
                        </div>

                        <!-- Boost Button -->
                        <button 
                            type="submit" 
                            id="boostBtn"
                            class="w-full bg-gradient-to-r from-youtube to-youtubeDark hover:from-red-600 hover:to-red-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-3 text-xl"
                        >
                            <i class="ri-rocket-2-fill text-2xl"></i>
                            <span>Start Boosting Views</span>
                        </button>
                    </form>

                    <!-- Real-time Stats -->
                    <div id="liveStats" class="hidden mt-8">
                        <div class="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                            <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                                <i class="ri-dashboard-line mr-2 text-youtube"></i>
                                Live Statistics
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-success" id="liveSuccess">0</div>
                                    <div class="text-gray-400 text-sm">Success</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-error" id="liveFailed">0</div>
                                    <div class="text-gray-400 text-sm">Failed</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-warning" id="liveProgress">0%</div>
                                    <div class="text-gray-400 text-sm">Progress</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-white" id="liveRemaining">0</div>
                                    <div class="text-gray-400 text-sm">Remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-8">
                <!-- Features -->
                <div class="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                    <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                        <i class="ri-star-line mr-2 text-youtube"></i>
                        Features
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3 text-green-400">
                            <i class="ri-checkbox-circle-fill"></i>
                            <span class="text-white">Real View Simulation</span>
                        </div>
                        <div class="flex items-center space-x-3 text-green-400">
                            <i class="ri-checkbox-circle-fill"></i>
                            <span class="text-white">Random User Agents</span>
                        </div>
                        <div class="flex items-center space-x-3 text-green-400">
                            <i class="ri-checkbox-circle-fill"></i>
                            <span class="text-white">Progressive Delays</span>
                        </div>
                        <div class="flex items-center space-x-3 text-green-400">
                            <i class="ri-checkbox-circle-fill"></i>
                            <span class="text-white">Video Info Extraction</span>
                        </div>
                    </div>
                </div>

                <!-- Server Info -->
                <div class="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                    <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                        <i class="ri-server-line mr-2 text-youtube"></i>
                        Server Info
                    </h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between text-gray-300">
                            <span>Port:</span>
                            <span class="text-white">${PORT}</span>
                        </div>
                        <div class="flex justify-between text-gray-300">
                            <span>Status:</span>
                            <span class="text-green-400">🟢 Running</span>
                        </div>
                        <div class="flex justify-between text-gray-300">
                            <span>Access URL:</span>
                            <span class="text-blue-400">http://localhost:${PORT}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Results Section -->
        <div id="resultsSection" class="hidden mt-12">
            <div class="bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-3xl font-bold text-white flex items-center">
                        <i class="ri-bar-chart-box-line mr-3 text-youtube"></i>
                        Boosting Results
                    </h2>
                    <button onclick="clearResults()" class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center space-x-2">
                        <i class="ri-delete-bin-line"></i>
                        <span>Clear Results</span>
                    </button>
                </div>

                <!-- Summary Cards -->
                <div id="summaryCards" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <!-- Summary will be populated here -->
                </div>

                <!-- Detailed Logs -->
                <div class="bg-gray-900 rounded-2xl p-6 border border-gray-700">
                    <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                        <i class="ri-list-check mr-2 text-youtube"></i>
                        Detailed View Logs
                    </h3>
                    <div id="detailedLogs" class="space-y-3 max-h-96 overflow-y-auto">
                        <!-- Logs will appear here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 text-gray-500">
            <p class="flex items-center justify-center space-x-2">
                <i class="ri-information-line"></i>
                <span>YouTube View Booster • Educational Purpose Only • Use Responsibly</span>
            </p>
        </div>
    </div>

    <script>
        const form = document.getElementById('boostForm');
        const boostBtn = document.getElementById('boostBtn');
        const resultsSection = document.getElementById('resultsSection');
        const liveStats = document.getElementById('liveStats');
        const summaryCards = document.getElementById('summaryCards');
        const detailedLogs = document.getElementById('detailedLogs');

        let currentOperation = null;

        function updateLiveStats(success, failed, total, progress) {
            document.getElementById('liveSuccess').textContent = success;
            document.getElementById('liveFailed').textContent = failed;
            document.getElementById('liveProgress').textContent = progress + '%';
            document.getElementById('liveRemaining').textContent = total - (success + failed);
        }

        function addLog(message, type = 'info') {
            const log = document.createElement('div');
            const colors = {
                success: 'border-l-green-500 bg-green-500/10 text-green-400',
                error: 'border-l-red-500 bg-red-500/10 text-red-400',
                info: 'border-l-blue-500 bg-blue-500/10 text-blue-400',
                warning: 'border-l-yellow-500 bg-yellow-500/10 text-yellow-400'
            };
            
            const icons = {
                success: 'ri-checkbox-circle-fill',
                error: 'ri-close-circle-fill',
                info: 'ri-information-fill',
                warning: 'ri-alert-fill'
            };
            
            log.className = \`p-4 rounded-2xl border-l-4 \${colors[type]} \`;
            log.innerHTML = \`
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="\${icons[type]} text-lg"></i>
                        <span class="text-white">\${message}</span>
                    </div>
                    <span class="text-gray-400 text-sm">\${new Date().toLocaleTimeString()}</span>
                </div>
            \`;
            
            detailedLogs.insertBefore(log, detailedLogs.firstChild);
        }

        function clearResults() {
            detailedLogs.innerHTML = '';
            summaryCards.innerHTML = '';
            resultsSection.classList.add('hidden');
            addLog('Results cleared. Ready for new boosting session.', 'info');
        }

        function createSummaryCard(data) {
            summaryCards.innerHTML = \`
                <div class="bg-success/10 border border-success/50 rounded-2xl p-6 text-center">
                    <i class="ri-checkbox-circle-line text-4xl text-success mb-3"></i>
                    <div class="text-3xl font-bold text-white">\${data.successfulViews}</div>
                    <div class="text-success text-sm">Successful Views</div>
                </div>
                <div class="bg-error/10 border border-error/50 rounded-2xl p-6 text-center">
                    <i class="ri-close-circle-line text-4xl text-error mb-3"></i>
                    <div class="text-3xl font-bold text-white">\${data.failedViews}</div>
                    <div class="text-error text-sm">Failed Views</div>
                </div>
                <div class="bg-warning/10 border border-warning/50 rounded-2xl p-6 text-center">
                    <i class="ri-line-chart-line text-4xl text-warning mb-3"></i>
                    <div class="text-3xl font-bold text-white">\${data.successRate}</div>
                    <div class="text-warning text-sm">Success Rate</div>
                </div>
                <div class="bg-blue-500/10 border border-blue-500/50 rounded-2xl p-6 text-center">
                    <i class="ri-time-line text-4xl text-blue-400 mb-3"></i>
                    <div class="text-3xl font-bold text-white">\${data.totalAttempts}</div>
                    <div class="text-blue-400 text-sm">Total Attempts</div>
                </div>
            \`;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const videoUrl = document.getElementById('videoUrl').value;
            const viewCount = parseInt(document.getElementById('viewCount').value);
            const viewDelay = parseInt(document.getElementById('viewDelay').value) * 1000;

            if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
                addLog('Please enter a valid YouTube URL', 'error');
                return;
            }

            // Reset UI
            boostBtn.disabled = true;
            boostBtn.innerHTML = '<i class="ri-loader-4-line animate-spin text-2xl"></i><span>Boosting Views...</span>';
            liveStats.classList.remove('hidden');
            resultsSection.classList.remove('hidden');
            updateLiveStats(0, 0, viewCount, 0);

            addLog(\`Starting YouTube view boosting for \${viewCount} views...\`, 'info');
            addLog(\`Target: \${videoUrl}\`, 'info');

            try {
                const response = await fetch('/api/boost-views', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        url: videoUrl, 
                        count: viewCount, 
                        delay: viewDelay 
                    }),
                });

                const data = await response.json();
                
                if (data.success) {
                    createSummaryCard(data.summary);
                    
                    addLog(\`🎉 Boosting completed! \${data.summary.successfulViews} successful views out of \${data.summary.totalAttempts} attempts (\${data.summary.successRate} success rate)\`, 'success');
                    
                    // Display individual results
                    data.detailedResults.forEach(result => {
                        if (result.success) {
                            addLog(\`View \${result.attempt}: ✅ \${result.title} | Watched: \${result.duration}\`, 'success');
                        } else {
                            addLog(\`View \${result.attempt}: ❌ \${result.error}\`, 'error');
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
                boostBtn.innerHTML = '<i class="ri-rocket-2-fill text-2xl"></i><span>Start Boosting Views</span>';
            }
        });

        // Add initial log
        setTimeout(() => {
            addLog('YouTube View Booster is ready! Enter a YouTube URL and start boosting.', 'info');
        }, 1000);
    </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
    console.log(`🚀 YouTube View Booster Server running on PORT: ${PORT}`);
    console.log(`📺 Access your booster: http://localhost:${PORT}`);
    console.log(`🎯 Ready to boost YouTube views!`);
    console.log(`⚠️  EDUCATIONAL PURPOSE ONLY - USE RESPONSIBLY`);
});
