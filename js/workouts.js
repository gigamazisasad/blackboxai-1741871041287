// Exercise library data and functionality
class ExerciseManager {
    constructor() {
        this.exercises = [
            {
                id: 1,
                name: "Barbell Squat",
                category: "Legs",
                muscleGroups: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
                difficulty: "Intermediate",
                description: "A fundamental compound exercise that targets the entire lower body and core.",
                equipment: "Barbell, Squat Rack",
                instructions: [
                    "Position bar on upper back, not neck",
                    "Feet shoulder-width apart, toes slightly pointed out",
                    "Break at hips and knees simultaneously",
                    "Keep chest up and core tight throughout movement",
                    "Lower until thighs are parallel to ground",
                    "Drive through heels to return to starting position"
                ],
                sets: [
                    { type: "Warm-up", reps: "15", intensity: "Light" },
                    { type: "Working Set", reps: "8-12", intensity: "Moderate" },
                    { type: "Working Set", reps: "6-8", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg",
                featured: true,
                tips: "Maintain neutral spine throughout movement. Breathe in during descent, out during ascent.",
                variations: ["Front Squat", "Box Squat", "Pause Squat"],
                formCues: [
                    "Chest up, core tight",
                    "Knees track over toes",
                    "Hip hinge and knee bend together",
                    "Full depth at parallel"
                ]
            },
            {
                id: 2,
                name: "Romanian Deadlift",
                category: "Legs",
                muscleGroups: ["Hamstrings", "Glutes", "Lower Back"],
                difficulty: "Intermediate",
                description: "An excellent exercise for posterior chain development.",
                equipment: "Barbell or Dumbbells",
                instructions: [
                    "Hold weight at hip level with overhand grip",
                    "Slight bend in knees throughout movement",
                    "Hinge at hips, pushing them back",
                    "Lower bar along thighs while maintaining flat back",
                    "Feel stretch in hamstrings at bottom",
                    "Drive hips forward to return to start"
                ],
                sets: [
                    { type: "Warm-up", reps: "12-15", intensity: "Light" },
                    { type: "Working Set", reps: "10-12", intensity: "Moderate" },
                    { type: "Working Set", reps: "8-10", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162488/pexels-photo-4162488.jpeg",
                featured: false,
                tips: "Keep bar close to legs throughout movement. Focus on hip hinge pattern.",
                variations: ["Single-Leg RDL", "Dumbbell RDL", "Banded RDL"],
                formCues: [
                    "Hips back, not down",
                    "Soft knee bend",
                    "Bar close to legs",
                    "Flat back position"
                ]
            },
            {
                id: 3,
                name: "Barbell Row",
                category: "Back",
                muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Rear Deltoids", "Biceps"],
                difficulty: "Intermediate",
                description: "A compound pulling movement for overall back development.",
                equipment: "Barbell",
                instructions: [
                    "Hinge forward at hips, back straight",
                    "Grip bar slightly wider than shoulder width",
                    "Pull bar to lower chest/upper abs",
                    "Squeeze shoulder blades at top",
                    "Lower with control to start position"
                ],
                sets: [
                    { type: "Warm-up", reps: "15", intensity: "Light" },
                    { type: "Working Set", reps: "10-12", intensity: "Moderate" },
                    { type: "Working Set", reps: "8-10", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162489/pexels-photo-4162489.jpeg",
                featured: true,
                tips: "Keep core tight and back straight. Focus on pulling with elbows.",
                variations: ["Pendlay Row", "Meadows Row", "T-Bar Row"],
                formCues: [
                    "Chest parallel to ground",
                    "Pull through elbows",
                    "Squeeze shoulder blades",
                    "Control the negative"
                ]
            },
            {
                id: 4,
                name: "Pull-Ups",
                category: "Back",
                muscleGroups: ["Latissimus Dorsi", "Biceps", "Upper Back"],
                difficulty: "Advanced",
                description: "The king of upper body pulling exercises.",
                equipment: "Pull-up Bar",
                instructions: [
                    "Grip bar slightly wider than shoulders",
                    "Start from dead hang position",
                    "Pull until chin clears bar",
                    "Focus on squeezing back muscles",
                    "Lower with control"
                ],
                sets: [
                    { type: "Warm-up", reps: "As many as possible", intensity: "Moderate" },
                    { type: "Working Set", reps: "5-8", intensity: "Hard" },
                    { type: "Working Set", reps: "3-5", intensity: "Maximum" }
                ],
                image: "https://images.pexels.com/photos/4162491/pexels-photo-4162491.jpeg",
                featured: true,
                tips: "Use full range of motion. Avoid swinging or kipping.",
                variations: ["Chin-Ups", "Neutral Grip Pull-Ups", "Weighted Pull-Ups"],
                formCues: [
                    "Start from dead hang",
                    "Pull shoulder blades down",
                    "Lead with chest to bar",
                    "Control the descent"
                ]
            },
            {
                id: 5,
                name: "Bench Press",
                category: "Chest",
                muscleGroups: ["Chest", "Front Deltoids", "Triceps"],
                difficulty: "Intermediate",
                description: "The primary exercise for chest development.",
                equipment: "Barbell, Bench, Power Rack",
                instructions: [
                    "Lie flat on bench, feet planted firmly",
                    "Grip bar slightly wider than shoulders",
                    "Unrack bar over chest",
                    "Lower bar to mid-chest with control",
                    "Press bar up and slightly back",
                    "Lock out elbows at top"
                ],
                sets: [
                    { type: "Warm-up", reps: "15", intensity: "Light" },
                    { type: "Working Set", reps: "10-12", intensity: "Moderate" },
                    { type: "Working Set", reps: "6-8", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162492/pexels-photo-4162492.jpeg",
                featured: true,
                tips: "Keep shoulder blades retracted. Maintain arch in lower back.",
                variations: ["Incline Bench", "Decline Bench", "Close-Grip Bench"],
                formCues: [
                    "Shoulder blades pinched",
                    "Elbows at 45 degrees",
                    "Bar path slight curve",
                    "Feet planted firmly"
                ]
            },
            {
                id: 6,
                name: "Overhead Press",
                category: "Shoulders",
                muscleGroups: ["Deltoids", "Upper Chest", "Triceps"],
                difficulty: "Intermediate",
                description: "Primary movement for shoulder strength and development.",
                equipment: "Barbell or Dumbbells",
                instructions: [
                    "Hold bar at shoulder level",
                    "Elbows slightly in front of bar",
                    "Press bar overhead while squeezing glutes",
                    "Lock out arms at top",
                    "Lower with control to start"
                ],
                sets: [
                    { type: "Warm-up", reps: "12-15", intensity: "Light" },
                    { type: "Working Set", reps: "8-10", intensity: "Moderate" },
                    { type: "Working Set", reps: "6-8", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162493/pexels-photo-4162493.jpeg",
                featured: false,
                tips: "Keep core tight throughout. Avoid excessive back arch.",
                variations: ["Push Press", "Behind-the-Neck Press", "Seated Press"],
                formCues: [
                    "Brace core tight",
                    "Bar path straight up",
                    "Full lockout at top",
                    "Control the descent"
                ]
            },
            {
                id: 7,
                name: "Barbell Curl",
                category: "Arms",
                muscleGroups: ["Biceps", "Forearms"],
                difficulty: "Beginner",
                description: "Classic exercise for biceps development.",
                equipment: "Barbell",
                instructions: [
                    "Stand with feet shoulder width",
                    "Hold bar with underhand grip",
                    "Curl bar to shoulder level",
                    "Keep elbows at sides",
                    "Lower with control"
                ],
                sets: [
                    { type: "Warm-up", reps: "15-20", intensity: "Light" },
                    { type: "Working Set", reps: "12-15", intensity: "Moderate" },
                    { type: "Working Set", reps: "8-10", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162494/pexels-photo-4162494.jpeg",
                featured: false,
                tips: "Avoid swinging. Focus on biceps contraction.",
                variations: ["EZ Bar Curl", "Preacher Curl", "Hammer Curl"],
                formCues: [
                    "Elbows pinned to sides",
                    "Wrists straight",
                    "Full range of motion",
                    "Control negative"
                ]
            },
            {
                id: 8,
                name: "Plank",
                category: "Core",
                muscleGroups: ["Abs", "Lower Back", "Shoulders"],
                difficulty: "Beginner",
                description: "Fundamental exercise for core stability.",
                equipment: "None - Bodyweight only",
                instructions: [
                    "Forearms on ground, elbows under shoulders",
                    "Body straight from head to heels",
                    "Engage core and glutes",
                    "Hold position with neutral spine",
                    "Breathe steadily throughout"
                ],
                sets: [
                    { type: "Warm-up", reps: "30 seconds", intensity: "Light" },
                    { type: "Working Set", reps: "45-60 seconds", intensity: "Moderate" },
                    { type: "Working Set", reps: "60+ seconds", intensity: "Hard" }
                ],
                image: "https://images.pexels.com/photos/4162495/pexels-photo-4162495.jpeg",
                featured: false,
                tips: "Don't let hips sag. Keep body in straight line.",
                variations: ["Side Plank", "Up-Down Plank", "Weighted Plank"],
                formCues: [
                    "Straight line head to heels",
                    "Core drawn in tight",
                    "Neutral neck position",
                    "Shoulders over elbows"
                ]
            },
            {
                id: 9,
                name: "Dumbbell Shoulder Press",
                category: "Shoulders",
                muscleGroups: ["Deltoids", "Triceps", "Upper Traps"],
                difficulty: "Intermediate",
                description: "Excellent exercise for shoulder development and overhead pressing strength.",
                equipment: "Dumbbells, Bench (optional)",
                instructions: [
                    "Sit or stand with dumbbells at shoulder height",
                    "Palms facing forward, elbows at 90 degrees",
                    "Press dumbbells overhead until arms are straight",
                    "Lower with control back to starting position"
                ],
                sets: [
                    { type: "Warm-up", reps: "15", intensity: "Light" },
                    { type: "Working Set", reps: "10-12", intensity: "Moderate" },
                    { type: "Working Set", reps: "8-10", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162496/pexels-photo-4162496.jpeg",
                featured: false,
                tips: "Keep core engaged throughout. Avoid arching lower back.",
                variations: ["Arnold Press", "Single-Arm Press", "Seated Press"],
                formCues: [
                    "Stack shoulders over hips",
                    "Keep wrists straight and strong",
                    "Drive head through on lockout",
                    "Maintain neutral spine"
                ]
            },
            {
                id: 10,
                name: "Cable Row",
                category: "Back",
                muscleGroups: ["Latissimus Dorsi", "Rhomboids", "Rear Deltoids"],
                difficulty: "Beginner",
                description: "Great exercise for back development with constant tension.",
                equipment: "Cable Machine, Row Handle",
                instructions: [
                    "Sit with feet braced, grab handle with both hands",
                    "Keep chest up, pull handle to lower chest",
                    "Squeeze shoulder blades together at peak",
                    "Return to start with control"
                ],
                sets: [
                    { type: "Warm-up", reps: "15-20", intensity: "Light" },
                    { type: "Working Set", reps: "12-15", intensity: "Moderate" },
                    { type: "Working Set", reps: "10-12", intensity: "Heavy" }
                ],
                image: "https://images.pexels.com/photos/4162497/pexels-photo-4162497.jpeg",
                featured: false,
                tips: "Focus on pulling with elbows, not hands. Keep torso stable.",
                variations: ["Wide Grip Row", "Single Arm Row", "Face Pull"],
                formCues: [
                    "Chest up, shoulders back",
                    "Pull through elbows",
                    "Control eccentric phase",
                    "Maintain upright torso"
                ]
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

        // Populate muscle filter
        const muscleFilter = document.getElementById('muscle-filter');
        if (muscleFilter) {
            const allMuscles = [...new Set(this.exercises.flatMap(ex => ex.muscleGroups))].sort();
            muscleFilter.innerHTML = '<option value="">All Muscles</option>' +
                allMuscles.map(muscle => `<option value="${muscle}">${muscle}</option>`).join('');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('exercise-search');
        const categoryFilter = document.getElementById('category-filter');
        const difficultyFilter = document.getElementById('difficulty-filter');
        const muscleFilter = document.getElementById('muscle-filter');
        const featuredFilter = document.getElementById('featured-filter');

        const updateDisplay = () => {
            const filters = {
                search: searchInput?.value || '',
                category: categoryFilter?.value || '',
                difficulty: difficultyFilter?.value || '',
                muscle: muscleFilter?.value || '',
                featured: featuredFilter?.checked || false
            };

            const filteredExercises = this.filterExercises(filters);
            const exerciseList = document.getElementById('exercise-list');
            if (exerciseList) {
                exerciseList.innerHTML = filteredExercises.map(exercise => this.createExerciseCard(exercise)).join('');
            }
        };

        // Add event listeners
        [searchInput, categoryFilter, difficultyFilter, muscleFilter, featuredFilter].forEach(element => {
            if (element) {
                element.addEventListener('change', updateDisplay);
                if (element === searchInput) {
                    element.addEventListener('keyup', updateDisplay);
                }
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
                <span>${set.reps}</span>
                <span>${set.intensity}</span>
            </div>
        `).join('');

        const formCuesHtml = exercise.formCues ? `
            <div class="mt-4">
                <h4 class="font-semibold text-gray-800 mb-2">Form Cues:</h4>
                <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                    ${exercise.formCues.map(cue => `<li>${cue}</li>`).join('')}
                </ul>
            </div>
        ` : '';

        const variationsHtml = exercise.variations ? `
            <div class="mt-4">
                <h4 class="font-semibold text-gray-800 mb-2">Variations:</h4>
                <div class="flex flex-wrap gap-2">
                    ${exercise.variations.map(variation => 
                        `<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">${variation}</span>`
                    ).join('')}
                </div>
            </div>
        ` : '';

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
                        ${exercise.equipment ? `<span class="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">${exercise.equipment}</span>` : ''}
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
                        ${exercise.tips ? `
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">Tips:</h4>
                            <p class="text-sm text-gray-600">${exercise.tips}</p>
                        </div>
                        ` : ''}
                        ${formCuesHtml}
                        ${variationsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    filterExercises(filters) {
        return this.exercises.filter(exercise => {
            const matchesSearch = !filters.search || 
                exercise.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                exercise.description.toLowerCase().includes(filters.search.toLowerCase());
            
            const matchesCategory = !filters.category || exercise.category === filters.category;
            const matchesDifficulty = !filters.difficulty || exercise.difficulty.includes(filters.difficulty);
            const matchesMuscle = !filters.muscle || exercise.muscleGroups.includes(filters.muscle);
            const matchesFeatured = !filters.featured || exercise.featured;

            return matchesSearch && matchesCategory && matchesDifficulty && matchesMuscle && matchesFeatured;
        });
    }
}

// Initialize exercise manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.exerciseManager = new ExerciseManager();
});
