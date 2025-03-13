// Main application logic
class GymBuddy {
    constructor() {
        this.initializeEventListeners();
        this.setupNavigationHighlight();
    }

    initializeEventListeners() {
        // Add workout completion handler
        document.getElementById('timer').addEventListener('click', (e) => {
            if (e.target.id === 'reset-timer' && window.workoutTimer.seconds > 0) {
                this.handleWorkoutCompletion();
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupNavigationHighlight() {
        // Highlight active section in navigation
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-blue-200');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('text-blue-200');
                }
            });
        });
    }

    handleWorkoutCompletion() {
        const duration = window.workoutTimer.getCurrentDuration();
        const date = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create workout record
        const workout = {
            date: date,
            duration: duration,
            exercises: 'General Workout' // This could be enhanced to track specific exercises
        };

        // Add to history and update display
        this.addWorkoutToHistory(workout);

        // Show completion notification
        this.showNotification('Workout completed! 💪');
    }

    addWorkoutToHistory(workout) {
        // Get existing history
        let workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
        
        // Add new workout to beginning of array
        workoutHistory.unshift(workout);
        
        // Save back to localStorage
        localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
        
        // Update the display
        this.updateWorkoutHistory();
    }

    updateWorkoutHistory() {
        const historyContainer = document.getElementById('workout-history');
        if (!historyContainer) return;

        const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];

        historyContainer.innerHTML = workoutHistory
            .slice(0, 10) // Show last 10 workouts
            .map(workout => `
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <div class="font-medium">Workout</div>
                            <div class="text-sm text-gray-600">${workout.date}</div>
                        </div>
                        <div class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            ${workout.duration}
                        </div>
                    </div>
                    ${workout.exercises ? `
                        <div class="text-sm text-gray-600">
                            ${workout.exercises}
                        </div>
                    ` : ''}
                </div>
            `).join('');
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-x-full';
        notification.textContent = message;

        // Add to document
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove notification after delay
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gymBuddy = new GymBuddy();

    // Add some sample workout history if none exists
    if (!localStorage.getItem('workoutHistory')) {
        const sampleWorkouts = [
            {
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                duration: '45:00',
                exercises: 'Full Body Workout'
            },
            {
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                duration: '30:00',
                exercises: 'Cardio Session'
            }
        ];

        localStorage.setItem('workoutHistory', JSON.stringify(sampleWorkouts));
        window.gymBuddy.updateWorkoutHistory();
    }
});

// Service Worker Registration for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
