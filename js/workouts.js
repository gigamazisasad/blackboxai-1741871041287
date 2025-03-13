// Exercise library data and functionality
class ExerciseManager {
    constructor() {
        this.exercises = [
            {
                id: 1,
                name: "Leg Press",
                category: "Legs",
                muscleGroups: ["Quadriceps", "Hamstrings", "Glutes"],
                difficulty: "Beginner to Advanced",
                description: "A compound lower body exercise that targets quadriceps, hamstrings, and glutes.",
                instructions: [
                    "Sit in the leg press machine with your back flat against the pad",
                    "Place feet shoulder-width apart on the platform",
                    "Lower the weight with control until knees form 90-degree angles",
                    "Push the platform back to starting position"
                ],
                sets: [
                    { type: "Warm-up", reps: "20-25", intensity: "Easy" },
                    { type: "Working Set", reps: "10-15", intensity: "Hard" },
                    { type: "Working Set", reps: "8-12", intensity: "Harder" }
                ],
                image: "https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg",
                featured: true
            },
            {
                id: 2,
                name: "Pull-Ups",
                category: "Back",
                muscleGroups: ["Latissimus Dorsi", "Biceps", "Upper Back"],
                difficulty: "Advanced",
                description: "Classic bodyweight exercise for upper body pulling strength.",
                instructions: [
                    "Grip pull-up bar slightly wider than shoulders",
                    "Start from dead hang position",
                    "Pull body up until chin clears bar",
                    "Lower with control to starting position"
                ],
                sets: [
                    { type: "Warm-up", reps: "As many as possible", intensity: "Moderate" },
                    { type: "Working Set", reps: "5-8", intensity: "Hard" },
                    { type: "Working Set", reps: "3-5", intensity: "Harder" }
                ],
                image: "https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg",
                featured: false
            },
            {
                id: 3,
                name: "Bench Press",
                category: "Chest",
                muscleGroups: ["Chest", "Front Deltoids", "Triceps"],
                difficulty: "Intermediate",
                description: "Classic compound movement for chest development.",
                instructions: [
                    "Lie on bench with feet flat on floor",
                    "Grip barbell slightly wider than shoulders",
                    "Lower bar to chest with control",
                    "Press bar back to starting position"
                ],
                sets: [
                    { type: "Warm-up", reps: "15", intensity: "Easy" },
                    { type: "Working Set", reps: "12", intensity: "Moderate" },
                    { type: "Working Set", reps: "8-10", intensity: "Hard" }
                ],
                image: "https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg",
                featured: true
            }
        ];
        
        this.initializeDisplay();
        this.setupEventListeners();
    }

    initializeDisplay() {
        const exerciseList = document.getElementById('exercise-list');
        if (exerciseList) {
            exerciseList.innerHTML = this.exercises.map(exercise => this.createExerciseCard(exercise)).join('');
        }
    }

    setupEventListeners() {
        // Add event listeners for exercise interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('exercise-details-btn')) {
                const exerciseId = parseInt(e.target.dataset.exerciseId);
                this.showExerciseDetails(exerciseId);
            }
        });
    }

    createExerciseCard(exercise) {
        const muscleGroupsHtml = exercise.muscleGroups.map(muscle => 
            `<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">${muscle}</span>`
        ).join('');

        const setsHtml = exercise.sets.map(set => `
            <div class="flex justify-between text-sm text-gray-600 border-b border-gray-200 py-1">
                <span>${set.type}</span>
                <span>${set.reps} reps</span>
                <span>${set.intensity}</span>
            </div>
        `).join('');

        return `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 ${exercise.featured ? 'border-2 border-blue-500' : ''}">
                <div class="h-48 overflow-hidden relative">
                    <img src="${exercise.image}" alt="${exercise.name}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
                    ${exercise.featured ? '<span class="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">Featured</span>' : ''}
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold mb-2 text-gray-800">${exercise.name}</h3>
                    <div class="flex flex-wrap items-center gap-2 mb-4">
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">${exercise.category}</span>
                        <span class="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">${exercise.difficulty}</span>
                    </div>
                    <div class="mb-4">
                        <h4 class="text-sm font-semibold text-gray-600 mb-2">Target Muscles:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${muscleGroupsHtml}
                        </div>
                    </div>
                    <p class="text-gray-600 mb-4">${exercise.description}</p>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">Instructions:</h4>
                            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                                ${exercise.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">Sets:</h4>
                            <div class="bg-gray-50 rounded-lg p-3">
                                ${setsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showExerciseDetails(exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        if (!exercise) return;

        // Create modal with exercise details
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-2xl font-bold">${exercise.name}</h2>
                        <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <!-- Exercise details content -->
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    filterExercises(filters) {
        return this.exercises.filter(exercise => {
            const matchesSearch = !filters.search || 
                exercise.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                exercise.description.toLowerCase().includes(filters.search.toLowerCase());
            
            const matchesCategory = !filters.category || exercise.category === filters.category;
            const matchesDifficulty = !filters.difficulty || exercise.difficulty.includes(filters.difficulty);
            const matchesMuscle = !filters.muscle || exercise.muscleGroups.includes(filters.muscle);

            return matchesSearch && matchesCategory && matchesDifficulty && matchesMuscle;
        });
    }
}

// Initialize exercise manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.exerciseManager = new ExerciseManager();
});
