// AI Trainer Module
class AITrainer {
    constructor() {
        this.userProfile = {
            fitnessLevel: null, // beginner, intermediate, advanced
            goals: [], // weight loss, muscle gain, endurance, etc.
            limitations: [], // injuries, conditions
            availability: null, // days per week
            equipment: [], // available equipment
            preferences: [], // preferred exercise types
            metrics: {
                weight: null,
                height: null,
                age: null,
                gender: null
            },
            progressData: {
                workoutHistory: [],
                performanceMetrics: {},
                adaptationRate: {}
            }
        };
        
        this.workoutAdaptations = {
            intensity: 1.0,
            volume: 1.0,
            complexity: 1.0
        };
    }

    // Initial assessment to gather user data
    async performInitialAssessment() {
        // Series of questions to determine user's current fitness level
        const questions = [
            {
                id: 'experience',
                text: 'How long have you been working out?',
                options: ['Never', 'Less than 6 months', '6-12 months', 'More than 1 year'],
                weight: 0.3
            },
            {
                id: 'frequency',
                text: 'How many days per week can you commit to working out?',
                options: ['1-2 days', '3-4 days', '5-6 days', 'Every day'],
                weight: 0.2
            },
            {
                id: 'goals',
                text: 'What are your primary fitness goals?',
                options: ['Weight Loss', 'Muscle Gain', 'Strength', 'Endurance', 'General Fitness'],
                multiple: true,
                weight: 0.25
            },
            {
                id: 'limitations',
                text: 'Do you have any injuries or limitations?',
                options: ['None', 'Back Pain', 'Joint Issues', 'Cardiovascular Conditions', 'Other'],
                multiple: true,
                weight: 0.25
            }
        ];

        // Store assessment results
        return questions;
    }

    // Generate personalized workout plan
    generateWorkoutPlan() {
        const plan = {
            weeklySchedule: [],
            exercises: [],
            progressions: {},
            adaptations: {}
        };

        // Calculate base difficulty based on user profile
        const baseDifficulty = this.calculateBaseDifficulty();
        
        // Generate weekly schedule
        plan.weeklySchedule = this.generateWeeklySchedule();
        
        // Select appropriate exercises
        plan.exercises = this.selectExercises();
        
        // Define progressions
        plan.progressions = this.defineProgressions();
        
        // Set initial adaptations
        plan.adaptations = this.calculateAdaptations();

        return plan;
    }

    // Calculate base difficulty level
    calculateBaseDifficulty() {
        let difficulty = 1.0;
        
        // Adjust based on experience
        if (this.userProfile.fitnessLevel === 'beginner') {
            difficulty *= 0.7;
        } else if (this.userProfile.fitnessLevel === 'intermediate') {
            difficulty *= 1.0;
        } else {
            difficulty *= 1.3;
        }
        
        // Adjust for limitations
        difficulty *= (1 - (this.userProfile.limitations.length * 0.1));
        
        return Math.max(0.5, Math.min(1.5, difficulty));
    }

    // Generate weekly schedule based on availability and goals
    generateWeeklySchedule() {
        const schedule = [];
        const daysPerWeek = parseInt(this.userProfile.availability);
        
        // Basic template for different frequencies
        const templates = {
            2: ['fullBody', 'rest', 'fullBody', 'rest', 'rest', 'rest', 'rest'],
            3: ['push', 'rest', 'pull', 'rest', 'legs', 'rest', 'rest'],
            4: ['upper', 'lower', 'rest', 'upper', 'lower', 'rest', 'rest'],
            5: ['push', 'pull', 'legs', 'upper', 'lower', 'rest', 'rest'],
            6: ['push', 'pull', 'legs', 'push', 'pull', 'legs', 'rest']
        };

        return templates[daysPerWeek] || templates[3]; // Default to 3 days if invalid
    }

    // Select appropriate exercises based on user profile
    selectExercises() {
        const exercises = [];
        const userLevel = this.userProfile.fitnessLevel;
        
        // Filter exercises based on difficulty and equipment
        const availableExercises = window.exerciseManager.exercises.filter(exercise => {
            return (
                this.isAppropriateLevel(exercise.difficulty, userLevel) &&
                this.hasRequiredEquipment(exercise.equipment)
            );
        });
        
        // Group by muscle groups
        const groupedExercises = this.groupByMuscle(availableExercises);
        
        // Select balanced workout
        exercises.push(...this.createBalancedWorkout(groupedExercises));
        
        return exercises;
    }

    // Define exercise progressions
    defineProgressions() {
        const progressions = {};
        
        // For each exercise, define progression path
        this.selectExercises().forEach(exercise => {
            progressions[exercise.id] = {
                currentLevel: 1,
                metrics: {
                    weight: { current: 0, increment: 2.5 },
                    reps: { current: 8, increment: 1 },
                    sets: { current: 3, increment: 1 }
                },
                conditions: {
                    toProgress: { completedSets: 3, targetReps: 12 },
                    toRegress: { failedSets: 2, minReps: 6 }
                }
            };
        });
        
        return progressions;
    }

    // Calculate workout adaptations based on performance
    calculateAdaptations() {
        const adaptations = {};
        
        // Analyze recent performance
        const recentPerformance = this.analyzeRecentPerformance();
        
        // Adjust difficulty components
        adaptations.intensity = this.adjustIntensity(recentPerformance);
        adaptations.volume = this.adjustVolume(recentPerformance);
        adaptations.complexity = this.adjustComplexity(recentPerformance);
        
        return adaptations;
    }

    // Analyze user's recent performance
    analyzeRecentPerformance() {
        const history = this.userProfile.progressData.workoutHistory;
        if (history.length === 0) return null;
        
        // Calculate completion rates
        const completionRate = this.calculateCompletionRate(history);
        
        // Analyze progression
        const progressionRate = this.analyzeProgressionRate(history);
        
        // Check form ratings
        const formQuality = this.analyzeFormQuality(history);
        
        return {
            completionRate,
            progressionRate,
            formQuality
        };
    }

    // Update workout plan based on performance
    updateWorkoutPlan(performance) {
        // Adjust difficulty based on performance
        this.workoutAdaptations = this.calculateAdaptations();
        
        // Generate new exercises if needed
        if (this.shouldRegenerateExercises(performance)) {
            return this.generateWorkoutPlan();
        }
        
        // Otherwise modify existing plan
        return this.modifyExistingPlan(performance);
    }

    // Helper methods
    isAppropriateLevel(exerciseLevel, userLevel) {
        const levels = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        return Math.abs(levels[exerciseLevel] - levels[userLevel]) <= 1;
    }

    hasRequiredEquipment(requiredEquipment) {
        return requiredEquipment.every(eq => this.userProfile.equipment.includes(eq));
    }

    groupByMuscle(exercises) {
        return exercises.reduce((groups, exercise) => {
            exercise.muscleGroups.forEach(muscle => {
                if (!groups[muscle]) groups[muscle] = [];
                groups[muscle].push(exercise);
            });
            return groups;
        }, {});
    }

    createBalancedWorkout(groupedExercises) {
        const workout = [];
        const targetExercisesPerMuscle = this.userProfile.fitnessLevel === 'beginner' ? 1 : 2;
        
        Object.entries(groupedExercises).forEach(([muscle, exercises]) => {
            workout.push(...exercises.slice(0, targetExercisesPerMuscle));
        });
        
        return workout;
    }

    calculateCompletionRate(history) {
        const recent = history.slice(-10);
        return recent.filter(workout => workout.completed).length / recent.length;
    }

    analyzeProgressionRate(history) {
        // Analyze weight, reps, and sets progression over time
        return history.reduce((progression, workout) => {
            workout.exercises.forEach(exercise => {
                if (!progression[exercise.id]) {
                    progression[exercise.id] = {
                        weight: [],
                        reps: [],
                        sets: []
                    };
                }
                progression[exercise.id].weight.push(exercise.weight);
                progression[exercise.id].reps.push(exercise.reps);
                progression[exercise.id].sets.push(exercise.sets);
            });
            return progression;
        }, {});
    }

    analyzeFormQuality(history) {
        return history.reduce((quality, workout) => {
            workout.exercises.forEach(exercise => {
                if (!quality[exercise.id]) {
                    quality[exercise.id] = [];
                }
                quality[exercise.id].push(exercise.formRating);
            });
            return quality;
        }, {});
    }

    shouldRegenerateExercises(performance) {
        return performance.completionRate < 0.6 || performance.formQuality < 0.5;
    }

    modifyExistingPlan(performance) {
        const plan = this.userProfile.currentPlan;
        
        // Adjust exercise parameters based on performance
        plan.exercises = plan.exercises.map(exercise => {
            const exercisePerformance = performance[exercise.id];
            if (!exercisePerformance) return exercise;
            
            return {
                ...exercise,
                sets: this.adjustSets(exercise.sets, exercisePerformance),
                reps: this.adjustReps(exercise.reps, exercisePerformance),
                weight: this.adjustWeight(exercise.weight, exercisePerformance)
            };
        });
        
        return plan;
    }

    adjustSets(currentSets, performance) {
        if (performance.completionRate > 0.8 && performance.formQuality > 0.8) {
            return currentSets + 1;
        }
        return currentSets;
    }

    adjustReps(currentReps, performance) {
        if (performance.completionRate > 0.9) {
            return currentReps + 2;
        }
        return currentReps;
    }

    adjustWeight(currentWeight, performance) {
        if (performance.completionRate > 0.8 && performance.formQuality > 0.7) {
            return currentWeight * 1.05; // 5% increase
        }
        return currentWeight;
    }
}

// Initialize AI trainer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiTrainer = new AITrainer();
});
