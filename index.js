const express = require('express');
const cors = require('cors');
const handleProxy = require('./proxy');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/proxy', handleProxy);

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Viewer - Educational Tool</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.1.0/remixicon.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#FF0000',
                        secondary: '#282828',
                        accent: '#FF3333'
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
            <div class="flex items-center justify-center mb-4">
                <i class="ri-youtube-fill text-6xl text-primary mr-4"></i>
                <h1 class="text-5xl font-bold text-white">YouTube Viewer</h1>
            </div>
            <p class="text-gray-400 text-lg">Educational Purpose Only - View Simulator</p>
            <div class="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
                <p class="text-yellow-400 text-sm">
                    <i class="ri-information-line mr-2"></i>
                    This tool is for educational purposes only. Use responsibly and in compliance with YouTube's Terms of Service.
                </p>
            </div>
        </div>

        <!-- Main Card -->
        <div class="max-w-4xl mx-auto">
            <div class="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <!-- Input Form -->
                <form id="viewForm" class="space-y-6">
                    <!-- URL Input -->
                    <div>
                        <label class="flex items-center text-white text-lg font-semibold mb-3">
                            <i class="ri-link mr-2 text-primary"></i>
                            YouTube Video URL
                        </label>
                        <input 
                            type="url" 
                            id="url" 
                            placeholder="https://www.youtube.com/watch?v=..." 
                            required
                            class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 outline-none"
                        >
                    </div>

                    <!-- Settings Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Views Count -->
                        <div>
                            <label class="flex items-center text-white text-lg font-semibold mb-3">
                                <i class="ri-eye-line mr-2 text-primary"></i>
                                Number of Views
                            </label>
                            <div class="relative">
                                <input 
                                    type="number" 
                                    id="count" 
                                    value="5"
                                    min="1" 
                                    max="50"
                                    required
                                    class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 outline-none"
                                >
                                <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i class="ri-number-1"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Delay -->
                        <div>
                            <label class="flex items-center text-white text-lg font-semibold mb-3">
                                <i class="ri-timer-line mr-2 text-primary"></i>
                                Delay (seconds)
                            </label>
                            <div class="relative">
                                <input 
                                    type="number" 
                                    id="delay" 
                                    value="2"
                                    min="1" 
                                    max="10"
                                    required
                                    class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-2xl text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 outline-none"
                                >
                                <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i class="ri-time-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        id="submitBtn"
                        class="w-full bg-gradient-to-r from-primary to-accent hover:from-red-600 hover:to-red-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                    >
                        <i class="ri-play-circle-line text-2xl"></i>
                        <span class="text-xl">Start Sending Views</span>
                    </button>
                </form>

                <!-- Stats -->
                <div id="stats" class="hidden mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-gray-900 rounded-2xl p-6 text-center border border-gray-700">
                        <i class="ri-checkbox-circle-line text-3xl text-green-500 mb-2"></i>
                        <div class="text-2xl font-bold text-white" id="successCount">0</div>
                        <div class="text-gray-400 text-sm">Success</div>
                    </div>
                    <div class="bg-gray-900 rounded-2xl p-6 text-center border border-gray-700">
                        <i class="ri-error-warning-line text-3xl text-red-500 mb-2"></i>
                        <div class="text-2xl font-bold text-white" id="errorCount">0</div>
                        <div class="text-gray-400 text-sm">Errors</div>
                    </div>
                    <div class="bg-gray-900 rounded-2xl p-6 text-center border border-gray-700">
                        <i class="ri-line-chart-line text-3xl text-blue-500 mb-2"></i>
                        <div class="text-2xl font-bold text-white" id="successRate">0%</div>
                        <div class="text-gray-400 text-sm">Success Rate</div>
                    </div>
                    <div class="bg-gray-900 rounded-2xl p-6 text-center border border-gray-700">
                        <i class="ri-time-line text-3xl text-yellow-500 mb-2"></i>
                        <div class="text-2xl font-bold text-white" id="totalTime">0s</div>
                        <div class="text-gray-400 text-sm">Total Time</div>
                    </div>
                </div>
            </div>

            <!-- Results Section -->
            <div id="result" class="hidden mt-8">
                <div class="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold text-white flex items-center">
                            <i class="ri-list-check mr-3 text-primary"></i>
                            View Logs
                        </h3>
                        <button onclick="clearLogs()" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-2xl transition-all duration-300 flex items-center space-x-2">
                            <i class="ri-delete-bin-line"></i>
                            <span>Clear Logs</span>
                        </button>
                    </div>
                    
                    <div id="resultContent" class="space-y-4 max-h-96 overflow-y-auto">
                        <!-- Logs will appear here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 text-gray-500">
            <p class="flex items-center justify-center space-x-2">
                <i class="ri-information-line"></i>
                <span>For Educational Purpose Only • Use Responsibly</span>
            </p>
        </div>
    </div>

    <script>
        const form = document.getElementById('viewForm');
        const resultDiv = document.getElementById('result');
        const resultContent = document.getElementById('resultContent');
        const submitBtn = document.getElementById('submitBtn');
        const statsDiv = document.getElementById('stats');
        const startTime = performance.now();

        function addLog(message, type = 'info') {
            const log = document.createElement('div');
            const colors = {
                success: 'border-l-green-500 bg-green-500/10',
                error: 'border-l-red-500 bg-red-500/10',
                info: 'border-l-blue-500 bg-blue-500/10',
                warning: 'border-l-yellow-500 bg-yellow-500/10'
            };
            
            log.className = \`p-4 rounded-2xl border-l-4 \${colors[type]} text-white\`;
            log.innerHTML = \`
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="ri-\${type === 'success' ? 'check' : type === 'error' ? 'close' : type === 'warning' ? 'alert' : 'information'}-circle-fill text-\${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'blue'}-500"></i>
                        <span>\${message}</span>
                    </div>
                    <span class="text-gray-400 text-sm">\${new Date().toLocaleTimeString()}</span>
                </div>
            \`;
            
            resultContent.insertBefore(log, resultContent.firstChild);
        }

        function clearLogs() {
            resultContent.innerHTML = '';
            addLog('Logs cleared successfully', 'info');
        }

        function updateStats(data) {
            document.getElementById('successCount').textContent = data.successCount;
            document.getElementById('errorCount').textContent = data.errorCount;
            document.getElementById('successRate').textContent = data.successRate;
            const endTime = performance.now();
            document.getElementById('totalTime').textContent = \`\${((endTime - startTime) / 1000).toFixed(1)}s\`;
            statsDiv.classList.remove('hidden');
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const url = document.getElementById('url').value;
            const count = parseInt(document.getElementById('count').value);
            const delay = parseInt(document.getElementById('delay').value) * 1000;

            if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
                addLog('Please enter a valid YouTube URL', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin text-2xl"></i><span class="text-xl">Processing...</span>';
            
            addLog(\`Starting to send \${count} views to YouTube video...\`, 'info');

            try {
                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        url: url, 
                        count: count, 
                        delay: delay 
                    }),
                });

                const data = await response.json();
                
                if (data.success) {
                    addLog(\`✅ Successfully completed \${data.successCount} views with \${data.errorCount} errors\`, 'success');
                    updateStats(data);
                    
                    data.results.forEach(result => {
                        if (result.status === 'success') {
                            addLog(\`View \${result.attempt}: ✅ \${result.title} | Channel: \${result.channel}\`, 'success');
                        } else {
                            addLog(\`View \${result.attempt}: ❌ \${result.error}\`, 'error');
                        }
                    });
                } else {
                    addLog(\`❌ Error: \${data.error}\`, 'error');
                }
                
                resultDiv.classList.remove('hidden');

            } catch (error) {
                addLog(\`❌ Network Error: \${error.message}\`, 'error');
                resultDiv.classList.remove('hidden');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="ri-play-circle-line text-2xl"></i><span class="text-xl">Start Sending Views</span>';
            }
        });

        // Add initial log
        setTimeout(() => {
            addLog('YouTube Viewer Tool Ready - Enter URL and click Start', 'info');
        }, 1000);
    </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 YouTube Viewer Server running on http://localhost:${PORT}`);
  console.log(`📺 Educational Purpose Only - Use Responsibly`);
});
