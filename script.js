// Game state variables
let timer = 60;
let score = 0;
let hitrn = 0;
let gameRunning = false;
let timerInterval;

// DOM elements
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const bubblesContainer = document.getElementById('bubbles-container');
const finalScoreElement = document.getElementById('final-score');

// Initialize game
function initGame() {
    timer = 60;
    score = 0;
    hitrn = 0;
    gameRunning = false;
    
    // Update display
    document.querySelector("#scoreVal").textContent = score;
    document.querySelector("#timerVal").textContent = timer;
    document.querySelector("#hitVal").textContent = hitrn;
    
    // Show start screen
    startScreen.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
}

// Start game
function startGame() {
    gameRunning = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    // Initialize game state
    score = 0;
    timer = 60;
    hitrn = Math.floor(Math.random() * 10);
    
    // Update display
    document.querySelector("#scoreVal").textContent = score;
    document.querySelector("#timerVal").textContent = timer;
    document.querySelector("#hitVal").textContent = hitrn;
    
    // Generate bubbles and start timer
    bubble();
    runTimer();
}

// End game
function endGame() {
    gameRunning = false;
    clearInterval(timerInterval);
    
    // Update final score
    finalScoreElement.textContent = score;
    
    // Show game over screen
    gameOverScreen.classList.remove('hidden');
}

// Increase score with animation
function increaseScore() {
    score += 10;
    document.querySelector("#scoreVal").textContent = score;
    
    // Add score animation
    const scoreElement = document.querySelector("#scoreVal");
    scoreElement.style.transform = 'scale(1.2)';
    scoreElement.style.color = '#4CAF50';
    
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
        scoreElement.style.color = '';
    }, 200);
}

// Generate bubbles with improved layout
function bubble() {
    let clutter = "";
    const bubbleCount = 150; // Increased for better gameplay

    for (var i = 0; i < bubbleCount; i++) {
        let line = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble" data-number="${line}">${line}</div>`;
    }

    bubblesContainer.innerHTML = clutter;
}

// Run timer with visual feedback
function runTimer() {
    timerInterval = setInterval(function () {
        if (timer > 0 && gameRunning) {
            timer--;
            const timerElement = document.querySelector("#timerVal");
            timerElement.textContent = timer;
            
            // Visual warning when time is running low
            if (timer <= 10) {
                timerElement.style.color = '#ff4444';
                timerElement.style.animation = 'pulse 1s infinite';
            }
        } else if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

// Generate new hit value
function hitVal() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitVal").textContent = hitrn;
    
    // Add animation to target number
    const hitElement = document.querySelector("#hitVal");
    hitElement.style.transform = 'scale(1.1)';
    hitElement.style.color = '#FFD700';
    
    setTimeout(() => {
        hitElement.style.transform = 'scale(1)';
        hitElement.style.color = '';
    }, 300);
}

// Handle bubble clicks with improved feedback
bubblesContainer.addEventListener("click", function(dets) {
    if (!gameRunning) return;
    
    const clickedBubble = dets.target;
    if (!clickedBubble.classList.contains('bubble')) return;
    
    const clickNum = Number(clickedBubble.textContent);
    
    if (clickNum === hitrn) {
        // Correct match
        increaseScore();
        
        // Add pop animation to the clicked bubble
        clickedBubble.style.transform = 'scale(1.3)';
        clickedBubble.style.opacity = '0';
        clickedBubble.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        setTimeout(() => {
            bubble(); // Generate new bubbles
            hitVal(); // Generate new target
        }, 300);
    } else {
        // Wrong match - add shake animation
        clickedBubble.style.animation = 'shake 0.5s ease-in-out';
        clickedBubble.style.background = 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)';
        
        setTimeout(() => {
            clickedBubble.style.animation = '';
            clickedBubble.style.background = '';
        }, 500);
    }
});

// Event listeners for buttons
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => {
    initGame();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize game on load
document.addEventListener('DOMContentLoaded', initGame);
