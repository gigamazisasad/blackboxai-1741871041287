// Exercise search and filter functionality
class ExerciseSearch {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.searchInput = document.getElementById('exercise-search');
        this.categoryFilter = document.getElementById('category-filter');
        this.difficultyFilter = document.getElementById('difficulty-filter');
        this.muscleFilter = document.getElementById('muscle-filter');
        this.featuredFilter = document.getElementById('featured-filter');
        this.exerciseList = document.getElementById('exercise-list');
        this.loadingState = document.getElementById('loading-state');

        // Populate muscle filter with unique muscles from exercises
        if (this.muscleFilter && window.exerciseManager) {
            const allMuscles = new Set();
            window.exerciseManager.exercises.forEach(exercise => {
                exercise.muscleGroups.forEach(muscle => allMuscles.add(muscle));
            });
            
            const muscleOptions = Array.from(allMuscles).sort();
            
            this.muscleFilter.innerHTML = `
                <option value="">All Muscles</option>
                ${muscleOptions.map(muscle => `<option value="${muscle}">${muscle}</option>`).join('')}
            `;
        }
    }

    setupEventListeners() {
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.filterExercises());
        }

        // Category filter
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => this.filterExercises());
        }

        // Difficulty filter
        if (this.difficultyFilter) {
            this.difficultyFilter.addEventListener('change', () => this.filterExercises());
        }

        // Muscle filter
        if (this.muscleFilter) {
            this.muscleFilter.addEventListener('change', () => {
                const selectedMuscle = this.muscleFilter.value;
                
                if (selectedMuscle && window.exerciseManager) {
                    const exercisesWithMuscle = window.exerciseManager.exercises.filter(ex => 
                        ex.muscleGroups.includes(selectedMuscle)
                    );
                    
                    // Auto-select category if all exercises with selected muscle are in same category
                    const categories = new Set(exercisesWithMuscle.map(ex => ex.category));
                    if (categories.size === 1 && this.categoryFilter) {
                        this.categoryFilter.value = exercisesWithMuscle[0].category;
                    }
                }
                
                this.filterExercises();
            });
        }

        // Featured filter
        if (this.featuredFilter) {
            this.featuredFilter.addEventListener('change', () => this.filterExercises());
        }

        // Category quick links
        document.querySelectorAll('[data-category]').forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                if (this.categoryFilter) {
                    this.categoryFilter.value = category;
                    this.filterExercises();
                }
            });
        });

        // Category navigation links
        document.querySelectorAll('[data-category-link]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.currentTarget.dataset.categoryLink;
                if (this.categoryFilter) {
                    this.categoryFilter.value = category;
                    this.filterExercises();
                }
            });
        });
    }

    filterExercises() {
        if (!window.exerciseManager) return;

        const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : '';
        const category = this.categoryFilter ? this.categoryFilter.value : '';
        const difficulty = this.difficultyFilter ? this.difficultyFilter.value : '';
        const muscle = this.muscleFilter ? this.muscleFilter.value : '';
        const featuredOnly = this.featuredFilter ? this.featuredFilter.checked : false;

        // Show loading state
        if (this.loadingState) {
            this.loadingState.classList.remove('hidden');
        }

        // Filter exercises
        const filteredExercises = window.exerciseManager.exercises.filter(exercise => {
            const matchesSearch = !searchTerm || 
                exercise.name.toLowerCase().includes(searchTerm) ||
                exercise.description.toLowerCase().includes(searchTerm) ||
                exercise.muscleGroups.some(m => m.toLowerCase().includes(searchTerm));
            
            const matchesCategory = !category || exercise.category === category;
            const matchesDifficulty = !difficulty || exercise.difficulty.includes(difficulty);
            const matchesMuscle = !muscle || exercise.muscleGroups.includes(muscle);
            const matchesFeatured = !featuredOnly || exercise.featured;

            return matchesSearch && matchesCategory && matchesDifficulty && matchesMuscle && matchesFeatured;
        });

        // Update display with filtered exercises
        setTimeout(() => {
            if (this.exerciseList) {
                if (filteredExercises.length === 0) {
                    this.exerciseList.innerHTML = `
                        <div class="col-span-full text-center py-12">
                            <div class="text-gray-500 text-lg">No exercises found matching your criteria</div>
                            <button onclick="window.exerciseSearch.resetFilters()" 
                                    class="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                                Reset Filters
                            </button>
                        </div>
                    `;
                } else {
                    this.exerciseList.innerHTML = filteredExercises
                        .map(exercise => window.exerciseManager.createExerciseCard(exercise))
                        .join('');
                }
            }

            // Hide loading state
            if (this.loadingState) {
                this.loadingState.classList.add('hidden');
            }
        }, 300); // Small delay for loading animation
    }

    resetFilters() {
        if (this.searchInput) this.searchInput.value = '';
        if (this.categoryFilter) this.categoryFilter.value = '';
        if (this.difficultyFilter) this.difficultyFilter.value = '';
        if (this.muscleFilter) this.muscleFilter.value = '';
        if (this.featuredFilter) this.featuredFilter.checked = false;
        
        this.filterExercises();
    }
}

// Initialize exercise search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.exerciseSearch = new ExerciseSearch();
});
