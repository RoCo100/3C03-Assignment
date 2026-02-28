
const { createApp, ref } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

const App = {
    setup() {
        const scoreCount = ref(0);
        // Update this when a user answers a question correctly/incorrectly (requires click handlers + question logic).
        // Add a function validateResult to check if the choice made is the correctAnswer string value in each array of the row of buttons. 

        const backgroundColour = ref("white");
        // Sets the background for the main screen

        const imageBlue = "whale.png";
        const imageWhite = "imageNoBackground.png";
        // The 2 image filenames used. Need to keep these assets available in the same folder so the html can render it consistently.


        const gameComplete = ref(false); // A boolean that controls when the game is done 
        const answeredQuestions = ref([]); // An array of all questions that have been answered and must subsequently get disabled 

        // This if...else determines when the game should end (when all 20 questions have been answered)
        if (answeredQuestions.value.length === 20) {
            gameComplete.value = true;
            backgroundColour.value = "#BBEDFF"; // Changes the background colour 
        } else {
            gameComplete.value = false;
        }

        // This function is activated when the player presses a "Play Again" button. 
        function restartGame() {
            answeredQuestions.value = false;
            scoreCount.value = 0;
            backgroundColour.value = "white"; // Changes the background colour 
        }

        // This function is connected to multiple-choice answers. It checks if the user has selected the correct answer.
        function validateResult(input, correct, buttonID, points) {
            if (input == correct) {
                scoreCount.value = scoreCount.value + Number(points);
                answeredQuestions.value.push(buttonID); // Add the buttonID to the answered questions array
                //after getting a question right, the question needs to disply a "correct!"
            } else {
                //need to display "incorrect, try again!" and not add points to the score.
            }

        }

        const categories = [
            // These are category headers shown at the top of the board. Need to align the question bank so each column/category has matching questions.
            { name: "Anatomy" },
            { name: "Audition" },
            { name: "Stress" },
            { name: "Ships" },
            { name: "Pollution" }
        ]

        //This function controls opening and closing a question button. It is activated once when the user seleects a question, and again when the user selects the "exit" button. 
        function toggleCardOpenClose(button) {
            if (button.showCard.value == false) {
                button.showCard.value = true
            } else {
                button.showCard.value = false
            }
        }

        const lowDiscomfortRow = [
            // The 200-point row. Each object has:
            // - button: unique key for Vue rendering (used in :key)
            // - points: label shown on the tile (currently a String)
            // - content: question placeholder (e.g., "question1") to link a click to a question in a future question bank
            {
                showCard: ref(false),
                button: "col1row1",
                points: "200",
                content: "question1",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col2row1",
                points: "200",
                content: "question2",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col3row1",
                points: "200",
                content: "question3",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col4row1",
                points: "200",
                content: "question4",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col5row1",
                points: "200",
                content: "question5",
                correctAnswer: null
            }
        ]
        const mediumDiscomfortRow = [
            // The 400-point row. Same schema as rowOneButtons.
            // Need to use item.content + item.points in click logic to open the correct question and score it once.
            {
                showCard: ref(false),
                button: "col1row2",
                points: "400",
                content: "question6",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col2row2",
                points: "400",
                content: "question7",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col3row2",
                points: "400",
                content: "question8",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col4row2",
                points: "400",
                content: "question9",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col5row2",
                points: "400",
                content: "question10",
                correctAnswer: null
            }
        ]
        const highDiscomfortRow = [
            // The 600-point row. Same schema as rowOneButtons.
            {
                showCard: ref(false),
                button: "col1row3",
                points: "600",
                content: "question11",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col2row3",
                points: "600",
                content: "question12",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col3row3",
                points: "600",
                content: "question13",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col4row3",
                points: "600",
                content: "question14",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col5row3",
                points: "600",
                content: "question15",
                correctAnswer: null
            }
        ]
        const extremeDiscomfortRow = [
            // The 800-point row. Same schema as rowOneButtons.
            {
                showCard: ref(false),
                button: "col1row4",
                points: "800",
                content: "question16",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col2row4",
                points: "800",
                content: "question17",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col3row4",
                points: "800",
                content: "question18",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col4row4",
                points: "800",
                content: "question19",
                correctAnswer: null
            },
            {
                showCard: ref(false),
                button: "col5row4",
                points: "800",
                content: "question20",
                correctAnswer: null
            }
        ]

        return {
            // Everything returned here becomes available to index.html for bindings (like {{scoreCount}}, v-for loops, etc).
            // When gameplay is implemented, we will also need to return additional states such as selectedAnswer, validateResults, and answeredQuestions
            // selectedAnswer: a string that can be equal to answerA, answerB, answerC, or answerD. It records the answer that the user selected for a particular question. 
            // validateResults: a function that checks if selectedAnswer = correctAnswer, and increases the user's score accordingly. 
            // answeredQuestions: an array that keeps track of which questions have already been answered and disables the corresponding buttons. 

            scoreCount,
            lowDiscomfortRow,
            mediumDiscomfortRow,
            highDiscomfortRow,
            extremeDiscomfortRow,
            categories,
            imageBlue,
            imageWhite,
            gameComplete,
            answeredQuestions,
            backgroundColour,
            restartGame,
            validateResult,
            toggleCardOpenClose
        }

    }
}

createApp(App).use(vuetify).mount('#app');
