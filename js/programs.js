// Workout Programs functionality
class WorkoutPrograms {
    constructor() {
        this.programs = {
            beginner: {
                name: "Beginner Full Body",
                description: "Perfect for those just starting their fitness journey",
                duration: "45 minutes",
                frequency: "3 times per week",
                level: "Beginner",
                schedule: [
                    {
                        name: "Full Body Workout A",
                        exercises: [
                            {
                                name: "Machine Chest Press",
                                sets: "3",
                                reps: "12-15",
                                notes: "Focus on form and controlled movement"
                            },
                            {
                                name: "Lat Pulldown",
                                sets: "3",
                                reps: "12-15",
                                notes: "Keep chest up, pull to upper chest"
                            },
                            {
                                name: "Leg Press",
                                sets: "3",
                                reps: "15-20",
                                notes: "Push through heels"
                            }
                        ]
                    },
                    {
                        name: "Full Body Workout B",
                        exercises: [
                            {
                                name: "Seated Row",
                                sets: "3",
                                reps: "12-15",
                                notes: "Squeeze shoulder blades together"
                            },
                            {
                                name: "Shoulder Press",
                                sets: "3",
                                reps: "12-15",
                                notes: "Keep core tight"
                            },
                            {
                                name: "Leg Extensions",
                                sets: "3",
                                reps: "15-20",
                                notes: "Focus on quad contraction"
                            }
                        ]
                    }
                ]
            },
            intermediate: {
                name: "Intermediate Split",
                description: "Upper/Lower body split for consistent trainers",
                duration: "60 minutes",
                frequency: "4 times per week",
                level: "Intermediate",
                schedule: [
                    {
                        name: "Upper Body Power",
                        exercises: [
                            {
                                name: "Bench Press",
                                sets: "4",
                                reps: "8-10",
                                notes: "Focus on explosive press"
                            },
                            {
                                name: "Barbell Row",
                                sets: "4",
                                reps: "8-10",
                                notes: "Keep back straight"
                            },
                            {
                                name: "Military Press",
                                sets: "3",
                                reps: "8-10",
                                notes: "Core tight, full range of motion"
                            }
                        ]
                    },
                    {
                        name: "Lower Body Power",
                        exercises: [
                            {
                                name: "Squats",
                                sets: "4",
                                reps: "8-10",
                                notes: "Drive through heels"
                            },
                            {
                                name: "Romanian Deadlifts",
                                sets: "4",
                                reps: "8-10",
                                notes: "Feel stretch in hamstrings"
                            },
                            {
                                name: "Calf Raises",
                                sets: "4",
                                reps: "15-20",
                                notes: "Full range of motion"
                            }
                        ]
                    }
                ]
            },
            advanced: {
                name: "Advanced PPL",
                description: "Push/Pull/Legs split for experienced lifters",
                duration: "75 minutes",
                frequency: "6 times per week",
                level: "Advanced",
                schedule: [
                    {
                        name: "Push Day",
                        exercises: [
                            {
                                name: "Incline Bench Press",
                                sets: "4",
                                reps: "6-8",
                                notes: "Progressive overload focus"
                            },
                            {
                                name: "Overhead Press",
                                sets: "4",
                                reps: "6-8",
                                notes: "Strict form"
                            },
                            {
                                name: "Lateral Raises",
                                sets: "3",
                                reps: "12-15",
                                notes: "Control the negative"
                            }
                        ]
                    },
                    {
                        name: "Pull Day",
                        exercises: [
                            {
                                name: "Weighted Pull-ups",
                                sets: "4",
                                reps: "6-8",
                                notes: "Full range of motion"
                            },
                            {
                                name: "Barbell Row",
                                sets: "4",
                                reps: "6-8",
                                notes: "Squeeze at contraction"
                            },
                            {
                                name: "Face Pulls",
                                sets: "3",
                                reps: "12-15",
                                notes: "Focus on rear delts"
                            }
                        ]
                    },
                    {
                        name: "Legs Day",
                        exercises: [
                            {
                                name: "Back Squats",
                                sets: "4",
                                reps: "6-8",
                                notes: "Below parallel"
                            },
                            {
                                name: "Romanian Deadlifts",
                                sets: "4",
                                reps: "6-8",
                                notes: "Keep back straight"
                            },
                            {
                                name: "Walking Lunges",
                                sets: "3",
                                reps: "12 each leg",
                                notes: "Keep torso upright"
                            }
                        ]
                    }
                ]
            }
        };

        this.initializeDisplay();
        this.setupEventListeners();
    }

    initializeDisplay() {
        this.showProgram('beginner'); // Show beginner program by default
    }

    setupEventListeners() {
        document.querySelectorAll('[data-program]').forEach(button => {
            button.addEventListener('click', (e) => {
                const programId = e.target.dataset.program;
                this.showProgram(programId);
            });
        });
    }

    showProgram(programId) {
        const program = this.programs[programId];
        if (!program) return;

        const detailsContainer = document.getElementById('program-details');
        if (!detailsContainer) return;

        detailsContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold mb-4">${program.name}</h2>
                <p class="text-gray-600 mb-6">${program.description}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="font-medium">Duration</div>
                        <div class="text-gray-600">${program.duration}</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="font-medium">Frequency</div>
                        <div class="text-gray-600">${program.frequency}</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <div class="font-medium">Level</div>
                        <div class="text-gray-600">${program.level}</div>
                    </div>
                </div>

                <div class="space-y-6">
                    ${program.schedule.map(day => `
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">${day.name}</h3>
                            <div class="space-y-4">
                                ${day.exercises.map(exercise => `
                                    <div class="bg-white rounded-lg p-4 shadow-sm">
                                        <div class="font-medium text-lg mb-2">${exercise.name}</div>
                                        <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div>
                                                <span class="font-medium">Sets:</span> ${exercise.sets}
                                            </div>
                                            <div>
                                                <span class="font-medium">Reps:</span> ${exercise.reps}
                                            </div>
                                        </div>
                                        <div class="text-sm text-gray-500 mt-2">
                                            <i class="fas fa-info-circle mr-1"></i> ${exercise.notes}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Initialize workout programs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.workoutPrograms = new WorkoutPrograms();
});
