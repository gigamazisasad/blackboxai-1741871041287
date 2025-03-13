// Progress tracking functionality
class ProgressTracker {
    constructor() {
        this.workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
        this.initializeDisplay();
        this.setupEventListeners();
    }

    initializeDisplay() {
        this.updateStats();
        this.updateWorkoutHistory();
        this.updateCalendar();
    }

    setupEventListeners() {
        const form = document.getElementById('log-workout-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.logWorkout();
            });
        }
    }

    logWorkout() {
        const type = document.getElementById('workout-type').value;
        const duration = document.getElementById('workout-duration').value;
        const notes = document.getElementById('workout-notes').value;
        const date = new Date();

        const workout = {
            type: type,
            duration: `${duration}:00`,
            notes: notes,
            date: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            timestamp: date.getTime()
        };

        this.workoutHistory.unshift(workout);
        localStorage.setItem('workoutHistory', JSON.stringify(this.workoutHistory));
        
        this.updateStats();
        this.updateWorkoutHistory();
        this.updateCalendar();
        this.showNotification('Workout logged successfully! 💪');
        
        // Reset form
        document.getElementById('workout-duration').value = '';
        document.getElementById('workout-notes').value = '';
    }

    updateStats() {
        // Total workouts
        const totalWorkouts = this.workoutHistory.length;
        document.getElementById('total-workouts').textContent = totalWorkouts;

        // This week's workouts
        const weekAgo = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
        const weekWorkouts = this.workoutHistory.filter(w => w.timestamp >= weekAgo).length;
        document.getElementById('week-workouts').textContent = weekWorkouts;

        // Total time
        const totalMinutes = this.workoutHistory.reduce((total, workout) => {
            const duration = workout.duration.split(':')[0];
            return total + parseInt(duration);
        }, 0);
        const totalHours = Math.round(totalMinutes / 60);
        document.getElementById('total-time').textContent = `${totalHours}h`;

        // Workout streak
        const streak = this.calculateStreak();
        document.getElementById('workout-streak').textContent = streak;
    }

    updateWorkoutHistory() {
        const historyContainer = document.getElementById('workout-history');
        if (!historyContainer) return;

        historyContainer.innerHTML = this.workoutHistory
            .slice(0, 10) // Show last 10 workouts
            .map(workout => `
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <div class="font-medium">${workout.type}</div>
                            <div class="text-sm text-gray-600">${workout.date}</div>
                        </div>
                        <div class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            ${workout.duration}
                        </div>
                    </div>
                    ${workout.notes ? `
                        <div class="text-sm text-gray-600">
                            ${workout.notes}
                        </div>
                    ` : ''}
                </div>
            `).join('');
    }

    updateCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) return;

        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        // Create array of dates for the month
        const dates = [];
        for (let i = 0; i < firstDay.getDay(); i++) {
            dates.push(null); // Padding for days before the 1st
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            dates.push(new Date(today.getFullYear(), today.getMonth(), i));
        }

        // Create calendar HTML
        calendarGrid.innerHTML = dates.map(date => {
            if (!date) {
                return '<div class="h-12 bg-gray-50 rounded"></div>';
            }

            const hasWorkout = this.workoutHistory.some(workout => {
                const workoutDate = new Date(workout.timestamp);
                return workoutDate.toDateString() === date.toDateString();
            });

            const isToday = date.toDateString() === today.toDateString();
            
            return `
                <div class="h-12 ${hasWorkout ? 'bg-green-100' : 'bg-gray-50'} 
                           ${isToday ? 'ring-2 ring-blue-500' : ''} 
                           rounded flex items-center justify-center">
                    <span class="text-sm ${hasWorkout ? 'text-green-800' : 'text-gray-600'}">
                        ${date.getDate()}
                    </span>
                </div>
            `;
        }).join('');
    }

    calculateStreak() {
        if (this.workoutHistory.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if worked out today
        const lastWorkoutDate = new Date(this.workoutHistory[0].timestamp);
        lastWorkoutDate.setHours(0, 0, 0, 0);
        
        if (lastWorkoutDate.getTime() !== today.getTime() && 
            lastWorkoutDate.getTime() !== today.getTime() - 86400000) {
            return 0;
        }

        // Calculate streak
        let currentDate = lastWorkoutDate;
        for (let workout of this.workoutHistory) {
            const workoutDate = new Date(workout.timestamp);
            workoutDate.setHours(0, 0, 0, 0);

            if (workoutDate.getTime() === currentDate.getTime()) {
                streak++;
                currentDate = new Date(currentDate.getTime() - 86400000); // Subtract one day
            } else if (workoutDate.getTime() < currentDate.getTime()) {
                break;
            }
        }

        return streak;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-full';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize progress tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});
