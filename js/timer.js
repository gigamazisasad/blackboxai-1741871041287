// Timer functionality
class WorkoutTimer {
    constructor() {
        this.seconds = 0;
        this.isRunning = false;
        this.interval = null;
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.display = document.getElementById('timer-display');
        this.startBtn = document.getElementById('start-timer');
        this.pauseBtn = document.getElementById('pause-timer');
        this.resetBtn = document.getElementById('reset-timer');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    updateDisplay() {
        if (this.display) {
            this.display.textContent = this.formatTime(this.seconds);
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => {
                this.seconds++;
                this.updateDisplay();
            }, 1000);

            // Update button states
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.startBtn.classList.add('opacity-50', 'cursor-not-allowed');
            this.pauseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.interval);

            // Update button states
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            this.pauseBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    reset() {
        this.isRunning = false;
        clearInterval(this.interval);
        this.seconds = 0;
        this.updateDisplay();

        // Reset button states
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        this.pauseBtn.classList.add('opacity-50', 'cursor-not-allowed');

        // Log workout if time was tracked
        if (window.gymBuddy && this.seconds > 0) {
            window.gymBuddy.handleWorkoutCompletion();
        }
    }

    getCurrentDuration() {
        return this.formatTime(this.seconds);
    }

    getSeconds() {
        return this.seconds;
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.workoutTimer = new WorkoutTimer();
});
