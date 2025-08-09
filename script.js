class CouchCommander {
    constructor() {
        this.isActive = false;
        this.inactivityTime = 0;
        this.sedentaryScore = 0;
        this.timerInterval = null;
        this.lastMotionTime = 0;
        this.motionThreshold = 15;
        this.achievements = [];
        this.backgroundChangeInterval = null;
        this.currentMode = 'stillness';
        this.cameraStream = null;
        this.isCameraActive = false;

        // DOM elements
        this.modeSelection = document.getElementById('modeSelection');
        this.appSection = document.getElementById('appSection');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.statusMessage = document.getElementById('statusMessage');
        this.stat1Value = document.getElementById('stat1Value');
        this.stat2Value = document.getElementById('stat2Value');
        this.stat1Title = document.getElementById('stat1Title');
        this.stat2Title = document.getElementById('stat2Title');
        this.quoteDisplay = document.getElementById('quoteDisplay');
        this.achievementsContainer = document.getElementById('achievements');
        this.currentModeTitle = document.getElementById('currentModeTitle');
        this.changeModeBtn = document.getElementById('changeModeBtn');
        
        // New DOM elements for camera functionality and new modes
        this.lazyVisionBtn = document.getElementById('lazyVisionBtn');
        this.dadJokeBtn = document.getElementById('dadJokeBtn');
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.videoContainer = document.getElementById('video-container');

        // Mode configurations
        this.modes = {
            stillness: {
                title: 'Stillness Master',
                stat1Title: 'Meditation Timer',
                stat2Title: 'Zen Points',
                quotes: [
                    "In stillness, you find the true meaning of doing nothing.",
                    "Your couch is your meditation cushion. Breathe in, breathe out, stay still.",
                    "Movement is just energy wasted on unnecessary activity.",
                    "Every second of stillness brings you closer to enlightenment.",
                    "The master sits in perfect stillness while the world moves around them.",
                    "Stillness is not the absence of movement, but the presence of peace."
                ]
            },
            laziness: {
                title: 'Laziness Celebrator',
                stat1Title: 'Lazy Timer',
                stat2Title: 'Laziness Score',
                quotes: [
                    "You're not lazy, you're just conserving energy for important things like breathing.",
                    "The best exercise is the one you don't do. You're already winning!",
                    "You're not avoiding exercise, you're just practicing advanced relaxation techniques.",
                    "Laziness is a skill, and you're becoming a master at it.",
                    "Why work hard when you can work smart by doing nothing?",
                    "Your laziness is an inspiration to us all. Keep up the good work!"
                ]
            },
            negative: {
                title: 'Negative Feedback',
                stat1Title: 'Angry Timer',
                stat2Title: 'Compliance Score',
                quotes: [
                    "STOP MOVING! You're ruining everything!",
                    "Why can't you just sit still like a normal person?",
                    "I'm getting really frustrated with your constant movement.",
                    "You're the worst at staying still. Absolutely terrible.",
                    "I've never seen someone so bad at doing nothing.",
                    "This is why we can't have nice things. You keep moving!"
                ]
            },
            unreliable: {
                title: 'Unreliable Metrics',
                stat1Title: 'Backward Steps',
                stat2Title: 'Unburned Calories',
                quotes: [
                    "You've taken -5 steps backward today. Impressive!",
                    "Your unburned calories are at an all-time high!",
                    "Your laziness quotient is off the charts!",
                    "According to my calculations, you're moving in reverse.",
                    "The sensors say you're walking backwards through time.",
                    "Your inactivity is so intense, it's creating negative energy."
                ]
            },
            lazyVision: {
                title: 'Lazy Vision',
                stat1Title: 'AI Analysis',
                stat2Title: 'Lazy Score',
                quotes: []
            },
            dadJokes: {
                title: 'Dad Jokes',
                stat1Title: 'Joke Counter',
                stat2Title: 'Chuckles Earned',
                quotes: []
            }
        };

        this.init();
    }

    init() {
        // Mode selection
        const modeCards = document.querySelectorAll('.mode-card');
        modeCards.forEach(card => {
            card.addEventListener('click', () => {
                this.selectMode(card.dataset.mode);
            });
        });

        // App controls
        this.startBtn.addEventListener('click', () => this.startInactivity());
        this.stopBtn.addEventListener('click', () => this.stopInactivity());
        this.changeModeBtn.addEventListener('click', () => this.showModeSelection());

        // New event listeners for the lazy features
        this.lazyVisionBtn.addEventListener('click', () => {
            if (!this.isCameraActive) {
                this.startCamera();
            } else {
                this.fetchVisionLazyTask();
            }
        });
        this.dadJokeBtn.addEventListener('click', () => this.fetchFunnyJoke());

        // Request device motion permission
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            this.startBtn.addEventListener('click', () => this.requestMotionPermission());
        }
    }
    
    // New function to start the camera stream
    async startCamera() {
        try {
            this.stopInactivity();
            this.statusMessage.textContent = 'Opening camera...';

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.cameraStream = stream;
            this.video.srcObject = stream;
            this.videoContainer.classList.add('active');
            this.isCameraActive = true;
            this.lazyVisionBtn.textContent = 'Capture & Analyze';
            
            this.video.onloadedmetadata = () => {
                this.statusMessage.textContent = 'Camera is live! Click "Capture & Analyze" to get your task.';
                this.quoteDisplay.textContent = 'What lazy task awaits you?';
            };
        } catch (error) {
            console.error("Error accessing camera:", error);
            this.statusMessage.textContent = 'Camera access denied or not available.';
            this.lazyVisionBtn.textContent = 'Lazy Vision 👀';
            this.stopCamera();
        }
    }

    // New function to stop the camera stream
    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
            this.cameraStream = null;
            this.videoContainer.classList.remove('active');
            this.isCameraActive = false;
            this.lazyVisionBtn.textContent = 'Lazy Vision 👀';
        }
    }

    // New function to take a picture and send to Gemini for a vision-based task
    async fetchVisionLazyTask() {
        this.statusMessage.textContent = 'Analyzing your laziness...';
        this.quoteDisplay.textContent = 'The AI is contemplating your surroundings.';
        
        const context = this.canvas.getContext('2d');
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        
        const base64ImageData = this.canvas.toDataURL('image/jpeg').split(',')[1];
        
        const prompt = "Based on this image, suggest a single, simple, and incredibly lazy task. For example, if you see a remote control, you might suggest 'Just imagine changing the channel.'";
        
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: base64ImageData
                            }
                        }
                    ]
                }
            ],
        };
        
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        let response;
        let delay = 1000;
        let success = false;
        for (let i = 0; i < 3; i++) {
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    success = true;
                    break;
                }
            } catch (error) {
                // Retry on network errors
            }
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }

        if (!success) {
            this.quoteDisplay.textContent = "Failed to fetch from API. Maybe that's a task in itself?";
            this.statusMessage.textContent = 'Error during AI analysis.';
            this.stopCamera();
            throw new Error("Failed to fetch from API after multiple retries.");
        }

        const result = await response.json();
        
        let finalTask = "Could not generate a task from the image.";
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            finalTask = result.candidates[0].content.parts[0].text;
        }
        
        this.quoteDisplay.textContent = finalTask.trim();
        this.statusMessage.textContent = 'New lazy task received!';
        this.stopCamera();
    }

    // New function to fetch a list of lazy tasks from the Gemini API
    async fetchLazyTask() {
        this.statusMessage.textContent = 'Generating a lazy task...';

        const prompt = "Generate a single, funny and sarcastic lazy task. The task should be a witty and short, single sentence. Do not include any numbers or bullet points.";
        
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        let response;
        let delay = 1000;
        let success = false;
        for (let i = 0; i < 3; i++) {
            try {
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    success = true;
                    break;
                }
            } catch (error) {
                // Retry on network errors
            }
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }

        if (!success) {
            this.quoteDisplay.textContent = "Failed to fetch from API. Maybe that's a task in itself?";
            this.statusMessage.textContent = 'Error during task generation.';
            throw new Error("Failed to fetch from API after multiple retries.");
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            
            const text = result.candidates[0].content.parts[0].text;
            this.quoteDisplay.textContent = text.trim();
            this.statusMessage.textContent = 'New lazy task generated!';
        } else {
            this.quoteDisplay.textContent = "Could not generate a lazy task.";
            this.statusMessage.textContent = 'Error during task generation.';
        }
    }

    // New function to fetch a dad joke from an external API
    async fetchFunnyJoke() {
        this.statusMessage.textContent = 'Fetching a dad joke...';

        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            const result = await response.json();
            if (result && result.joke) {
                this.quoteDisplay.textContent = result.joke;
                this.statusMessage.textContent = 'Here is a joke for you!';
                this.sedentaryScore++; // Increment joke counter
                this.updateStats();
            } else {
                this.quoteDisplay.textContent = "Couldn't get a joke. My apologies for the lack of humor.";
                this.statusMessage.textContent = 'Error fetching joke.';
            }
        } catch (error) {
            console.error('Error fetching joke:', error);
            this.quoteDisplay.textContent = "My joke-fetching circuits are on vacation. Try again later!";
            this.statusMessage.textContent = 'Error fetching joke.';
        }
    }

    selectMode(mode) {
        this.currentMode = mode;
        const modeConfig = this.modes[mode];
        
        // Hide all extra buttons and camera elements
        this.lazyVisionBtn.style.display = 'none';
        this.dadJokeBtn.style.display = 'none';
        this.startBtn.style.display = 'inline-block';
        this.stopBtn.style.display = 'inline-block';
        this.videoContainer.classList.remove('active');
        this.stopCamera();

        // Show specific buttons and elements based on mode
        if (mode === 'lazyVision') {
            this.lazyVisionBtn.style.display = 'inline-block';
            this.startBtn.style.display = 'none';
            this.stopBtn.style.display = 'none';
        } else if (mode === 'dadJokes') {
            this.dadJokeBtn.style.display = 'inline-block';
            this.startBtn.style.display = 'none';
            this.stopBtn.style.display = 'none';
        }

        // Update UI
        this.currentModeTitle.textContent = `Mode: ${modeConfig.title}`;
        this.stat1Title.textContent = modeConfig.stat1Title;
        this.stat2Title.textContent = modeConfig.stat2Title;
        
        // Show app section and hide mode selection
        this.modeSelection.style.display = 'none';
        this.appSection.style.display = 'flex';
        
        // Reset stats
        this.inactivityTime = 0;
        this.sedentaryScore = 0;
        this.updateStats();
        this.showRandomQuote();
    }

    showModeSelection() {
        this.stopInactivity();
        this.stopCamera(); // Ensure camera is stopped when changing modes
        this.appSection.style.display = 'none';
        this.modeSelection.style.display = 'block';
    }

    async requestMotionPermission() {
        try {
            const permission = await DeviceMotionEvent.requestPermission();
            if (permission === 'granted') {
                this.startInactivity();
            } else {
                this.statusMessage.textContent = 'Motion permission denied. Stay perfectly still manually!';
            }
        } catch (error) {
            console.log('Motion permission not supported, using manual detection');
            this.startInactivity();
        }
    }

    startInactivity() {
        this.isActive = true;
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.stopCamera();
        
        // Mode-specific start messages
        switch (this.currentMode) {
            case 'stillness':
                this.statusMessage.textContent = '🧘 Meditation session started. Find your inner peace through stillness.';
                break;
            case 'laziness':
                this.statusMessage.textContent = '😴 Laziness mode activated! Time to become a champion of doing nothing!';
                break;
            case 'negative':
                this.statusMessage.textContent = '👎 Negative feedback mode ON. I\'m watching you. Don\'t move.';
                break;
            case 'unreliable':
                this.statusMessage.textContent = '🤪 Unreliable tracking engaged! Who knows what will happen next?';
                break;
        }

        // Start inactivity timer
        this.startTimer();

        // Start motion detection for penalties
        this.startMotionDetection();

        // Start background color changes
        this.startBackgroundChanges();

        // Show initial quote
        this.showRandomQuote();
    }

    stopInactivity() {
        this.isActive = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        // Mode-specific stop messages
        switch (this.currentMode) {
            case 'stillness':
                this.statusMessage.textContent = '🧘 Meditation complete. You have achieved perfect stillness.';
                break;
            case 'laziness':
                this.statusMessage.textContent = '😴 Laziness session finished! You\'re a true champion of doing nothing!';
                break;
            case 'negative':
                this.statusMessage.textContent = '👎 Session ended. You didn\'t completely fail this time.';
                break;
            case 'unreliable':
                this.statusMessage.textContent = '🤪 Tracking stopped. Your stats may or may not be accurate.';
                break;
        }

        // Stop inactivity timer
        this.stopTimer();

        // Stop motion detection
        this.stopMotionDetection();

        // Stop background changes
        this.stopBackgroundChanges();

        // Show final message
        this.showFinalMessage();
        this.quoteDisplay.classList.remove('animated');

        // Show final achievement
        this.showFinalAchievement();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.inactivityTime++;
            this.updateStats();
            this.checkAchievements();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateStats() {
        const modeConfig = this.modes[this.currentMode];
        
        // Update timer
        const minutes = Math.floor(this.inactivityTime / 60);
        const seconds = this.inactivityTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.stat1Value.textContent = timeString;

        // Update score based on mode
        switch (this.currentMode) {
            case 'stillness':
                this.sedentaryScore = Math.floor(this.inactivityTime / 10);
                this.stat2Value.textContent = `${this.sedentaryScore} Zen Points`;
                break;
            case 'laziness':
                this.sedentaryScore = Math.floor(this.inactivityTime / 5);
                this.stat2Value.textContent = `${this.sedentaryScore} Laziness Points`;
                break;
            case 'negative':
                this.sedentaryScore = Math.floor(this.inactivityTime / 8);
                this.stat2Value.textContent = `${this.sedentaryScore} Compliance Points`;
                break;
            case 'unreliable':
                this.sedentaryScore = Math.floor(this.inactivityTime / 12);
                this.stat2Value.textContent = `${this.sedentaryScore} Unburned Calories`;
                break;
            case 'lazyVision':
                this.sedentaryScore = 0; // Not a timed mode
                this.stat1Value.textContent = '--';
                this.stat2Value.textContent = `${this.sedentaryScore} Lazy Score`;
                break;
            case 'dadJokes':
                this.stat1Value.textContent = `${this.sedentaryScore} Chuckles Earned`;
                this.stat2Value.textContent = '--';
                break;
        }
    }

    startMotionDetection() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', (event) => this.handleMotion(event));
        } else {
            let lastTime = Date.now();
            let lastX = 0;
            let lastY = 0;

            const handleMovement = (e) => {
                if (!this.isActive) return;

                const currentTime = Date.now();
                const timeDiff = currentTime - lastTime;

                if (timeDiff > 100) {
                    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
                    const currentY = e.clientY || e.touches?.[0]?.clientY || 0;

                    const deltaX = Math.abs(currentX - lastX);
                    const deltaY = Math.abs(currentY - lastY);

                    if (deltaX > 10 || deltaY > 10) {
                        this.detectMovement();
                    }

                    lastX = currentX;
                    lastY = currentY;
                    lastTime = currentTime;
                }
            };

            document.addEventListener('mousemove', handleMovement);
            document.addEventListener('touchmove', handleMovement);

            this.cleanupFunctions = () => {
                document.removeEventListener('mousemove', handleMovement);
                document.removeEventListener('touchmove', handleMovement);
            };
        }
    }

    stopMotionDetection() {
        if (this.cleanupFunctions) {
            this.cleanupFunctions();
        }
        window.removeEventListener('devicemotion', this.handleMotion);
    }

    handleMotion(event) {
        if (!this.isActive) return;

        const currentTime = Date.now();
        if (currentTime - this.lastMotionTime < 1000) return;

        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;

        const magnitude = Math.sqrt(
            Math.pow(acceleration.x || 0, 2) +
            Math.pow(acceleration.y || 0, 2) +
            Math.pow(acceleration.z || 0, 2)
        );

        if (magnitude > this.motionThreshold) {
            this.detectMovement();
            this.lastMotionTime = currentTime;
        }
    }

    detectMovement() {
        const modeConfig = this.modes[this.currentMode];
        
        switch (this.currentMode) {
            case 'stillness':
            case 'laziness':
                this.inactivityTime = 0;
                this.updateStats();
                this.statusMessage.textContent = 'Activity Detected! Timer reset. Stay still!';
                this.quoteDisplay.textContent = 'Movement detected! Your inactivity streak has been broken. Shame on you!';
                this.showAchievement('Movement Penalty', 'You moved! Your inactivity timer has been reset. Stay still next time!');
                break;
                
            case 'negative':
                this.inactivityTime = 0;
                this.updateStats();
                this.statusMessage.textContent = 'STOP MOVING! You\'re ruining everything!';
                this.quoteDisplay.textContent = 'I can\'t believe you moved again. Unbelievable.';
                this.showAchievement('Angry Penalty', 'You made the app angry! Stop moving!');
                break;
                
            case 'unreliable':
                this.inactivityTime += Math.floor(Math.random() * 10) - 5;
                if (this.inactivityTime < 0) this.inactivityTime = 0;
                this.updateStats();
                this.statusMessage.textContent = 'Movement detected! Or maybe not. Who knows?';
                this.quoteDisplay.textContent = 'Your movement might be real, or it might not be. Who knows?';
                break;
        }

        this.quoteDisplay.classList.add('animated');
        setTimeout(() => {
            this.quoteDisplay.classList.remove('animated');
        }, 3000);
    }

    showRandomQuote() {
        const modeConfig = this.modes[this.currentMode];
        if (modeConfig.quotes.length > 0) {
            const randomQuote = modeConfig.quotes[Math.floor(Math.random() * modeConfig.quotes.length)];
            this.quoteDisplay.textContent = randomQuote;
        }
    }

    showFinalMessage() {
        switch (this.currentMode) {
            case 'stillness':
                this.quoteDisplay.textContent = 'You have achieved perfect stillness. Your meditation journey is complete.';
                break;
            case 'laziness':
                this.quoteDisplay.textContent = 'You\'ve mastered the art of doing nothing! A true laziness champion!';
                break;
            case 'negative':
                this.quoteDisplay.textContent = 'You survived the session. Barely. Try harder next time.';
                break;
            case 'unreliable':
                this.quoteDisplay.textContent = 'Session complete. Your stats are probably wrong, but who cares?';
                break;
            case 'lazyVision':
            case 'dadJokes':
                this.quoteDisplay.textContent = 'Go back to the mode selection to choose a new task!';
                break;
        }
    }

    showFinalAchievement() {
        switch (this.currentMode) {
            case 'stillness':
                this.showAchievement('Zen Master', 'You have achieved perfect stillness and inner peace!');
                break;
            case 'laziness':
                this.showAchievement('Laziness Champion', 'You\'re the undisputed champion of doing absolutely nothing!');
                break;
            case 'negative':
                this.showAchievement('Survivor', 'You didn\'t completely fail this time. That\'s... something.');
                break;
            case 'unreliable':
                this.showAchievement('Confusion Master', 'You survived the unreliable tracking! Your confusion is legendary!');
                break;
        }
    }

    checkAchievements() {
        const modeAchievements = {
            stillness: [
                { id: 'first_minute', title: 'First Breath', description: 'You survived your first minute of meditation!', threshold: 60 },
                { id: 'five_minutes', title: 'Zen Beginner', description: '5 minutes of perfect stillness!', threshold: 300 },
                { id: 'ten_minutes', title: 'Meditation Master', description: '10 minutes! You\'re finding your inner peace!', threshold: 600 }
            ],
            laziness: [
                { id: 'first_minute', title: 'Lazy Start', description: 'First minute of doing nothing! You\'re getting the hang of this!', threshold: 60 },
                { id: 'five_minutes', title: 'Laziness Pro', description: '5 whole minutes of nothing! You\'re a natural!', threshold: 300 },
                { id: 'ten_minutes', title: 'Laziness Expert', description: '10 minutes! You\'re becoming a laziness legend!', threshold: 600 }
            ],
            negative: [
                { id: 'first_minute', title: 'Not Terrible', description: 'You lasted a whole minute without moving. Impressive.', threshold: 60 },
                { id: 'five_minutes', title: 'Acceptable', description: '5 minutes. I guess you\'re not completely hopeless.', threshold: 300 },
                { id: 'ten_minutes', title: 'Surprisingly Decent', description: '10 minutes! You might actually be learning something.', threshold: 600 }
            ],
            unreliable: [
                { id: 'first_minute', title: 'Confusion Begins', description: 'First minute tracked! Accuracy: questionable.', threshold: 60 },
                { id: 'five_minutes', title: 'Chaos Theory', description: '5 minutes! The sensors are getting confused.', threshold: 300 },
                { id: 'ten_minutes', title: 'Reality Bender', description: '10 minutes! You\'ve broken the laws of physics!', threshold: 600 }
            ]
        };

        const achievements = modeAchievements[this.currentMode] || [];
        
        achievements.forEach(achievement => {
            if (this.achievements.includes(achievement.id)) return;

            if (this.inactivityTime >= achievement.threshold) {
                this.achievements.push(achievement.id);
                this.showAchievement(achievement.title, achievement.description);
            }
        });
    }

    showAchievement(title, description) {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement';
        achievementElement.innerHTML = `<strong>🏆 ${title}:</strong> ${description}`;

        this.achievementsContainer.appendChild(achievementElement);

        setTimeout(() => {
            if (achievementElement.parentNode) {
                achievementElement.parentNode.removeChild(achievementElement);
            }
        }, 5000);
    }

    startBackgroundChanges() {
        this.backgroundChangeInterval = setInterval(() => {
            const colors = ['color-change-1', 'color-change-2', 'color-change-3', 'color-change-4'];
            const currentColor = document.body.className.match(/color-change-\d/);
            let nextColor;

            if (currentColor) {
                const currentIndex = parseInt(currentColor[0].split('-')[2]) - 1;
                nextColor = colors[(currentIndex + 1) % colors.length];
            } else {
                nextColor = colors[0];
            }

            document.body.className = nextColor;
        }, 8000);
    }

    stopBackgroundChanges() {
        if (this.backgroundChangeInterval) {
            clearInterval(this.backgroundChangeInterval);
            this.backgroundChangeInterval = null;
        }
        document.body.className = '';
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CouchCommander();
});
