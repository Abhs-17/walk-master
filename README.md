# 🛋️ Couch Commander - Inactivity Master

A satirical, anti-movement web app that tracks inactivity time while celebrating the art of doing absolutely nothing. Now with 4 distinctive modes, each offering unique experiences, quotes, and achievements!

## Features

- **4 Distinctive Modes**: Each mode has unique behaviors, quotes, and achievements
- **Mode-Specific Content**: Different stats, messages, and responses for each mode
- **Inactivity Timer**: Tracks time spent doing nothing in MM:SS format
- **Dynamic Scoring**: Each mode calculates points differently
- **Motion Detection**: Uses DeviceMotion API to detect movement and apply mode-specific penalties
- **Unique Quotes**: 6+ distinctive quotes per mode that reflect each mode's personality
- **Mode-Specific Achievements**: Different achievement sets for each mode
- **Background Animation**: Random dark color changes every 8 seconds
- **Mobile-Friendly**: Responsive design that works great on mobile devices
- **No Backend**: Pure HTML/CSS/JavaScript - just open `index.html` in a browser

## Modes

### 🧘 Stillness Master

- **Description**: Find inner peace through perfect stillness. Meditate on your couch and earn zen points.
- **Stats**: Meditation Timer, Zen Points
- **Behavior**: Resets timer when movement is detected with peaceful messages
- **Scoring**: 1 Zen Point per 10 seconds
- **Quotes**: "In stillness, you find the true meaning of doing nothing."
- **Achievements**: First Breath, Zen Beginner, Meditation Master
- **Personality**: Calm, meditative, zen-like

### 😴 Laziness Celebrator

- **Description**: Embrace your inner sloth! Celebrate doing nothing and become a laziness champion.
- **Stats**: Lazy Timer, Laziness Score
- **Behavior**: Resets timer when movement is detected with encouraging lazy messages
- **Scoring**: 1 Laziness Point per 5 seconds
- **Quotes**: "You're not lazy, you're just conserving energy for important things like breathing."
- **Achievements**: Lazy Start, Laziness Pro, Laziness Expert
- **Personality**: Encouraging, celebratory, champion-like

### 👎 Negative Feedback

- **Description**: For those who need tough love. Gets angry when you move, praises perfect stillness.
- **Stats**: Angry Timer, Compliance Score
- **Behavior**: Gets angry and resets timer when movement is detected
- **Scoring**: 1 Compliance Point per 8 seconds
- **Quotes**: "STOP MOVING! You're ruining everything!"
- **Achievements**: Not Terrible, Acceptable, Surprisingly Decent
- **Personality**: Angry, strict, tough love

### 🤪 Unreliable Metrics

- **Description**: Bizarre tracking that makes no sense. Perfect for those who love confusion!
- **Stats**: Backward Steps, Unburned Calories
- **Behavior**: Provides unreliable feedback and random stat changes
- **Scoring**: 1 Unburned Calorie per 12 seconds
- **Quotes**: "You've taken -5 steps backward today. Impressive!"
- **Achievements**: Confusion Begins, Chaos Theory, Reality Bender
- **Personality**: Confusing, nonsensical, chaotic

## How to Use

1. **Open the app**: Simply open `index.html` in any modern web browser
2. **Choose a mode**: Select from the 4 different inactivity modes, each with unique characteristics
3. **Start not moving**: Click the "Start Not Moving" button
4. **Grant permissions**: If prompted, allow motion detection permissions
5. **Stay perfectly still**: Don't move, shake your phone, or use your mouse
6. **Enjoy the experience**: Each mode provides different quotes, achievements, and responses
7. **Stop**: Click "Stop Being Lazy" when you're done accomplishing nothing
8. **Change modes**: Click "Change Mode" to try different inactivity styles

## Mode-Specific Features

### **Start Messages**

- **Stillness**: "🧘 Meditation session started. Find your inner peace through stillness."
- **Laziness**: "😴 Laziness mode activated! Time to become a champion of doing nothing!"
- **Negative**: "👎 Negative feedback mode ON. I'm watching you. Don't move."
- **Unreliable**: "🤪 Unreliable tracking engaged! Who knows what will happen next?"

### **Stop Messages**

- **Stillness**: "🧘 Meditation complete. You have achieved perfect stillness."
- **Laziness**: "😴 Laziness session finished! You're a true champion of doing nothing!"
- **Negative**: "👎 Session ended. You didn't completely fail this time."
- **Unreliable**: "🤪 Tracking stopped. Your stats may or may not be accurate."

### **Final Quotes**

- **Stillness**: "You have achieved perfect stillness. Your meditation journey is complete."
- **Laziness**: "You've mastered the art of doing nothing! A true laziness champion!"
- **Negative**: "You survived the session. Barely. Try harder next time."
- **Unreliable**: "Session complete. Your stats are probably wrong, but who cares?"

### **Final Achievements**

- **Stillness**: "Zen Master" - You have achieved perfect stillness and inner peace!
- **Laziness**: "Laziness Champion" - You're the undisputed champion of doing absolutely nothing!
- **Negative**: "Survivor" - You didn't completely fail this time. That's... something.
- **Unreliable**: "Confusion Master" - You survived the unreliable tracking! Your confusion is legendary!

## Mobile Usage

- **iOS**: May require HTTPS for motion detection to work
- **Android**: Should work immediately with motion permissions
- **Fallback**: If motion detection doesn't work, the app will detect mouse/touch movement instead

## Technical Details

- **Motion Detection**: Uses `DeviceMotionEvent` API with fallback to mouse/touch events
- **Timer System**: Real-time inactivity timer that updates every second
- **Mode System**: 4 different modes with unique behaviors, quotes, and achievements
- **Responsive Design**: Mobile-first CSS with dark, cozy color scheme
- **No Dependencies**: Pure vanilla JavaScript, no frameworks or libraries
- **Cross-Platform**: Works on desktop and mobile browsers

## File Structure

```
couch-commander/
├── index.html      # Main HTML structure with enhanced mode selection
├── style.css       # Dark, cozy, mobile-friendly styles
├── script.js       # Enhanced inactivity timer, motion detection, and mode logic
└── README.md       # This comprehensive documentation
```

## Anti-Movement Features

- **30+ Mode-Specific Quotes**: Each mode has 6+ unique quotes that reflect its personality
- **Mode-Specific Achievements**: Different achievement sets for each mode
- **Motion Penalties**: Each mode has unique responses to movement detection
- **Floating Animations**: Quotes animate when movement is detected
- **Background Changes**: Random dark color transitions
- **Existential Humor**: Anti-movement app that celebrates doing nothing while tracking everything

## Inactivity Timer Feature

Couch Commander includes a fully functional inactivity timer that:

- Tracks time spent doing nothing in real-time
- Displays time in MM:SS format (e.g., "05:30" for 5 minutes 30 seconds)
- Calculates mode-specific scores based on inactivity duration
- Applies mode-specific penalties when movement is detected
- Works on both mobile devices and desktop computers
- Provides the same accuracy as traditional fitness apps (which is to say, not very accurate)

## Motion Detection Penalties

Each mode has unique responses to movement detection:

- **Stillness Master**: Peaceful reset with meditation-themed messages
- **Laziness Celebrator**: Encouraging reset with lazy achievement messages
- **Negative Feedback**: Angry reset with strict, critical messages
- **Unreliable Metrics**: Unreliable feedback and random stat changes

## Browser Compatibility

- Chrome/Edge: Full support with motion detection
- Firefox: Full support with motion detection
- Safari: Full support (may require HTTPS on iOS)
- Mobile browsers: Full support with motion permissions

## Why This App Exists

Couch Commander is a satirical take on the fitness tracking industry. While it includes a functional inactivity timer, it celebrates the idea that movement doesn't have to be purposeful or fitness-oriented. It's perfect for:

- People who want to track inactivity without the pressure of fitness goals
- Anyone who finds traditional fitness apps too serious
- Users who appreciate existential humor and satire
- Those who want to feel productive while accomplishing nothing
- People who want to master the art of doing absolutely nothing
- Users who enjoy different approaches to the same meaningless activity
- Those who appreciate mode-specific experiences and content

## Color Scheme

The app uses a dark, cozy color palette:

- **Background**: Deep gradients from dark blue to gray
- **Cards**: Semi-transparent dark backgrounds with colored borders
- **Text**: Light colors for readability
- **Buttons**: Gradient backgrounds (red for start, purple for stop)
- **Animations**: Smooth transitions and floating effects

## Mode Selection Experience

The enhanced mode selection now provides:

- **Clear Descriptions**: Each mode explains what makes it unique
- **Personality Preview**: Users can see what to expect from each mode
- **Better Navigation**: Clearer distinction between modes
- **Enhanced Content**: More engaging descriptions and expectations

Enjoy your journey to complete stillness with the mode that best fits your personality! 🛋️✨
