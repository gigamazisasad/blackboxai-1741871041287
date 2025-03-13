// Onboarding experience similar to Duolingo's approach
class Onboarding {
    constructor() {
        this.currentStep = 0;
        this.answers = {};
        this.steps = [
            {
                id: 'welcome',
                type: 'welcome',
                title: 'Welcome to GymBuddy AI',
                description: 'Your personal AI fitness trainer that adapts to your progress',
                button: "Let's Get Started"
            },
            {
                id: 'goal',
                type: 'single-choice',
                title: 'What\'s your main fitness goal?',
                options: [
                    {
                        id: 'weight-loss',
                        icon: '🔥',
                        title: 'Lose Weight',
                        description: 'Burn fat and improve fitness'
                    },
                    {
                        id: 'muscle-gain',
                        icon: '💪',
                        title: 'Build Muscle',
                        description: 'Gain strength and size'
                    },
                    {
                        id: 'fitness',
                        icon: '🎯',
                        title: 'Get Fitter',
                        description: 'Improve overall fitness'
                    },
                    {
                        id: 'strength',
                        icon: '🏋️',
                        title: 'Get Stronger',
                        description: 'Focus on strength gains'
                    }
                ]
            },
            {
                id: 'experience',
                type: 'single-choice',
                title: 'What\'s your fitness experience?',
                options: [
                    {
                        id: 'beginner',
                        icon: '🌱',
                        title: 'Beginner',
                        description: 'New to working out'
                    },
                    {
                        id: 'intermediate',
                        icon: '⭐',
                        title: 'Intermediate',
                        description: '6-12 months experience'
                    },
                    {
                        id: 'advanced',
                        icon: '🌟',
                        title: 'Advanced',
                        description: '1+ years experience'
                    }
                ]
            },
            {
                id: 'frequency',
                type: 'single-choice',
                title: 'How often can you work out?',
                options: [
                    {
                        id: '2-days',
                        icon: '2️⃣',
                        title: '2 days/week',
                        description: 'Minimal time commitment'
                    },
                    {
                        id: '3-days',
                        icon: '3️⃣',
                        title: '3 days/week',
                        description: 'Balanced approach'
                    },
                    {
                        id: '4-days',
                        icon: '4️⃣',
                        title: '4 days/week',
                        description: 'Dedicated routine'
                    },
                    {
                        id: '5-plus-days',
                        icon: '5️⃣',
                        title: '5+ days/week',
                        description: 'Maximum results'
                    }
                ]
            },
            {
                id: 'equipment',
                type: 'multiple-choice',
                title: 'What equipment do you have access to?',
                options: [
                    {
                        id: 'none',
                        icon: '🏃',
                        title: 'No Equipment',
                        description: 'Bodyweight only'
                    },
                    {
                        id: 'dumbbells',
                        icon: '🏋️',
                        title: 'Dumbbells',
                        description: 'Basic weights'
                    },
                    {
                        id: 'gym',
                        icon: '🏋️‍♂️',
                        title: 'Full Gym',
                        description: 'All equipment'
                    },
                    {
                        id: 'bands',
                        icon: '➰',
                        title: 'Resistance Bands',
                        description: 'Portable equipment'
                    }
                ]
            },
            {
                id: 'limitations',
                type: 'multiple-choice',
                title: 'Any physical limitations?',
                options: [
                    {
                        id: 'none',
                        icon: '✅',
                        title: 'None',
                        description: 'No limitations'
                    },
                    {
                        id: 'back',
                        icon: '⚠️',
                        title: 'Back Issues',
                        description: 'Back pain or injury'
                    },
                    {
                        id: 'joints',
                        icon: '🦴',
                        title: 'Joint Issues',
                        description: 'Joint pain or limitations'
                    },
                    {
                        id: 'other',
                        icon: '❗',
                        title: 'Other',
                        description: 'Other limitations'
                    }
                ]
            },
            {
                id: 'metrics',
                type: 'form',
                title: 'Tell us about yourself',
                fields: [
                    {
                        id: 'age',
                        type: 'number',
                        label: 'Age',
                        placeholder: 'Enter your age'
                    },
                    {
                        id: 'weight',
                        type: 'number',
                        label: 'Weight (kg)',
                        placeholder: 'Enter your weight'
                    },
                    {
                        id: 'height',
                        type: 'number',
                        label: 'Height (cm)',
                        placeholder: 'Enter your height'
                    }
                ]
            },
            {
                id: 'complete',
                type: 'complete',
                title: 'All Set! 🎉',
                description: 'Your personalized plan is ready',
                button: 'Start Your Journey'
            }
        ];
    }

    initialize() {
        this.container = document.getElementById('onboarding-container');
        if (!this.container) return;
        
        this.render();
        this.setupEventListeners();
    }

    render() {
        const step = this.steps[this.currentStep];
        let html = '';

        switch (step.type) {
            case 'welcome':
                html = this.renderWelcome(step);
                break;
            case 'single-choice':
                html = this.renderChoices(step, false);
                break;
            case 'multiple-choice':
                html = this.renderChoices(step, true);
                break;
            case 'form':
                html = this.renderForm(step);
                break;
            case 'complete':
                html = this.renderComplete(step);
                break;
        }

        this.container.innerHTML = html;
    }

    renderWelcome(step) {
        return `
            <div class="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <h1 class="text-4xl font-bold mb-4">${step.title}</h1>
                <p class="text-lg text-gray-600 mb-8">${step.description}</p>
                <button class="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
                        onclick="onboarding.nextStep()">
                    ${step.button}
                </button>
            </div>
        `;
    }

    renderChoices(step, multiple) {
        return `
            <div class="min-h-screen p-6">
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-2">${step.title}</h2>
                    <div class="h-2 bg-gray-200 rounded-full">
                        <div class="h-2 bg-blue-600 rounded-full" style="width: ${(this.currentStep / (this.steps.length - 1)) * 100}%"></div>
                    </div>
                </div>
                <div class="grid gap-4">
                    ${step.options.map(option => `
                        <button class="option-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-4 ${this.isSelected(step.id, option.id) ? 'border-2 border-blue-500' : ''}"
                                onclick="onboarding.selectOption('${step.id}', '${option.id}', ${multiple})">
                            <span class="text-2xl">${option.icon}</span>
                            <div class="text-left">
                                <div class="font-medium">${option.title}</div>
                                <div class="text-sm text-gray-600">${option.description}</div>
                            </div>
                            ${multiple ? `
                                <div class="ml-auto">
                                    <div class="w-6 h-6 rounded-md border-2 border-gray-300 flex items-center justify-center ${this.isSelected(step.id, option.id) ? 'bg-blue-500 border-blue-500' : ''}">
                                        ${this.isSelected(step.id, option.id) ? '<i class="fas fa-check text-white"></i>' : ''}
                                    </div>
                                </div>
                            ` : ''}
                        </button>
                    `).join('')}
                </div>
                <div class="mt-8 flex justify-between">
                    <button class="text-gray-600 px-6 py-2 rounded-full hover:bg-gray-100 transition"
                            onclick="onboarding.previousStep()">
                        Back
                    </button>
                    <button class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                            onclick="onboarding.nextStep()">
                        Continue
                    </button>
                </div>
            </div>
        `;
    }

    renderForm(step) {
        return `
            <div class="min-h-screen p-6">
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-2">${step.title}</h2>
                    <div class="h-2 bg-gray-200 rounded-full">
                        <div class="h-2 bg-blue-600 rounded-full" style="width: ${(this.currentStep / (this.steps.length - 1)) * 100}%"></div>
                    </div>
                </div>
                <form onsubmit="onboarding.handleFormSubmit(event)" class="space-y-6">
                    ${step.fields.map(field => `
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                            <input type="${field.type}" 
                                   id="${field.id}" 
                                   placeholder="${field.placeholder}"
                                   class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                   required>
                        </div>
                    `).join('')}
                    <div class="flex justify-between mt-8">
                        <button type="button" 
                                class="text-gray-600 px-6 py-2 rounded-full hover:bg-gray-100 transition"
                                onclick="onboarding.previousStep()">
                            Back
                        </button>
                        <button type="submit" 
                                class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    renderComplete(step) {
        return `
            <div class="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <div class="text-5xl mb-6">🎉</div>
                <h1 class="text-4xl font-bold mb-4">${step.title}</h1>
                <p class="text-lg text-gray-600 mb-8">${step.description}</p>
                <button class="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
                        onclick="onboarding.complete()">
                    ${step.button}
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        // Touch gesture support
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        // Handle swipe
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left
                    this.nextStep();
                } else {
                    // Swipe right
                    this.previousStep();
                }
            }
        };
    }

    selectOption(stepId, optionId, multiple) {
        if (!this.answers[stepId]) {
            this.answers[stepId] = multiple ? [] : null;
        }

        if (multiple) {
            if (optionId === 'none') {
                this.answers[stepId] = ['none'];
            } else {
                this.answers[stepId] = this.answers[stepId].filter(id => id !== 'none');
                const index = this.answers[stepId].indexOf(optionId);
                if (index === -1) {
                    this.answers[stepId].push(optionId);
                } else {
                    this.answers[stepId].splice(index, 1);
                }
            }
        } else {
            this.answers[stepId] = optionId;
            // Auto-advance for single choice questions
            setTimeout(() => this.nextStep(), 300);
        }

        this.render();
    }

    isSelected(stepId, optionId) {
        if (!this.answers[stepId]) return false;
        if (Array.isArray(this.answers[stepId])) {
            return this.answers[stepId].includes(optionId);
        }
        return this.answers[stepId] === optionId;
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const formData = {};
        const step = this.steps[this.currentStep];
        
        step.fields.forEach(field => {
            formData[field.id] = document.getElementById(field.id).value;
        });
        
        this.answers[step.id] = formData;
        this.nextStep();
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.render();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.render();
        }
    }

    async complete() {
        // Initialize AI trainer with collected data
        if (window.aiTrainer) {
            const profile = this.createUserProfile();
            await window.aiTrainer.initializeWithProfile(profile);
        }

        // Save onboarding completion
        localStorage.setItem('onboardingComplete', 'true');
        localStorage.setItem('userProfile', JSON.stringify(this.answers));

        // Redirect to main app
        window.location.href = '/app.html';
    }

    createUserProfile() {
        return {
            fitnessLevel: this.answers.experience,
            goals: [this.answers.goal],
            limitations: this.answers.limitations,
            availability: this.answers.frequency,
            equipment: this.answers.equipment,
            metrics: this.answers.metrics
        };
    }
}

// Initialize onboarding when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if onboarding is completed
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    
    if (!onboardingComplete && window.location.pathname !== '/app.html') {
        window.onboarding = new Onboarding();
        window.onboarding.initialize();
    }
});
