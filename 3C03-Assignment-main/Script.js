
const { createApp, ref } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

const App = {
    setup() {
        const scoreCount = ref(0);
        // Update this when a user answers a question correctly/incorrectly. scoreCount is updated using the validateResult function. 

        const backgroundColour = ref("white");
        // Sets the background for the main screen

        const imageBlue = "whale.png";
        const imageWhite = "imageNoBackground.png";
        // The 2 image filenames used. Need to keep these assets available in the same folder so the html can render it consistently.

        const correctSelection = ref(null); // A boolean that tracks if the user has selected the correct answer to a question; will be used to determine what message (correct/incorrect) is displayed after they select a multiple choice answer.

        const gameComplete = ref(false); // A boolean that controls when the game is done 
        const answeredQuestions = ref([]); // An array of all questions that have been answered and must subsequently get disabled 

        function checkGameComplete() {
            // This if...else determines when the game should end (when all 20 questions have been answered)
            if (answeredQuestions.value.length === 20) {
                gameComplete.value = true;
                backgroundColour.value = "#BBEDFF"; // Changes the background colour 
            } else {
                gameComplete.value = false;
            }

        }

        // This function is activated when the player presses a "Play Again" button. 
        function restartGame() {
            correctSelection.value = null; // Resets the state of the correctSelection boolean. 
            answeredQuestions.value = []; // Resets the answeredQuestions array to be empty. 
            scoreCount.value = 0; // Resets score count to zero. 
            gameComplete.value = false; // Resets the gameComplete boolean to be false. 
            backgroundColour.value = "white"; // Changes the background colour 
            

            /* consider deleting since now restarting game after exit button is clicked
            // Reset all showCard values to make sure that the last question selected before the game ended is not still active. 
            for (button of lowDiscomfortRow) {
                button.showCard.value = false; 
            }
            for (button of mediumDiscomfortRow) {
                button.showCard.value = false; 
            }
            for (button of highDiscomfortRow) {
                button.showCard.value = false; 
            }
            for (button of extremeDiscomfortRow) {
                button.showCard.value = false; 
            }*/
        }

        // This function is connected to multiple-choice answers. It checks if the user has selected the correct answer.
        function validateResult(input, correct, buttonID, points) {
            if (input == correct) {
                scoreCount.value = scoreCount.value + Number(points);  // Increases the score count by the number of points associated with the question. (i.e., 200, 400, 600, or 800.)              
                correctSelection.value = true; //This boolean is linked to a <v-card-text> that informs the user they've selected the correct answer.
            } else {
                correctSelection.value = false;  //This boolean is linked to a <v-card-text> that displays an "incorrect" message, along with an explanation of the correct answer. 
            }
                answeredQuestions.value.push(buttonID); // Add the buttonID to the answered questions array
                
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
                checkGameComplete(); // Check if the game each time the player presses the "exit" button
            } else {
                button.showCard.value = false
                correctSelection.value = null; //This resets the "correctSelection" boolean to null in between questions. This way, the "correct" or "incorrect" message is not carried over from the previous question. 
                
            }
        }

        //The arrays are categorized in rows, based on "uncomfortability level". This means that the questions are grouped together based on how much they challenge anthropocentrism and cause discomfort in the human user. 
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
                correctAnswer: "11a",
                answerA: "11a",
                answerB: "11b",
                answerC: "11c",
                answerD: "11d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col2row1",
                points: "200",
                content: "question2",
                correctAnswer: "12b",
                answerA: "12a",
                answerB: "12b",
                answerC: "12c",
                answerD: "12d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col3row1",
                points: "200",
                content: "question3",
                correctAnswer: "13c",
                answerA: "13a",
                answerB: "13b",
                answerC: "13c",
                answerD: "13d",
                explanation: "That is incorrect..."

            },
            {
                showCard: ref(false),
                button: "col4row1",
                points: "200",
                content: "question4",
                correctAnswer: "14d",
                answerA: "14a",
                answerB: "14b",
                answerC: "14c",
                answerD: "14d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col5row1",
                points: "200",
                content: "question5",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
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
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col2row2",
                points: "400",
                content: "question7",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col3row2",
                points: "400",
                content: "question8",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col4row2",
                points: "400",
                content: "question9",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col5row2",
                points: "400",
                content: "question10",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            }
        ]
        const highDiscomfortRow = [
            // The 600-point row. Same schema as rowOneButtons.
            {
                showCard: ref(false),
                button: "col1row3",
                points: "600",
                content: "question11",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col2row3",
                points: "600",
                content: "question12",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col3row3",
                points: "600",
                content: "question13",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col4row3",
                points: "600",
                content: "question14",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col5row3",
                points: "600",
                content: "question15",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            }
        ]
        const extremeDiscomfortRow = [
            // The 800-point row. Same schema as rowOneButtons.
            {
                showCard: ref(false),
                button: "col1row4",
                points: "800",
                content: "question16",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col2row4",
                points: "800",
                content: "question17",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col3row4",
                points: "800",
                content: "question18",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col4row4",
                points: "800",
                content: "question19",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
            },
            {
                showCard: ref(false),
                button: "col5row4",
                points: "800",
                content: "question20",
                correctAnswer: "15d",
                answerA: "15a",
                answerB: "15b",
                answerC: "15c",
                answerD: "15d",
                explanation: "That is incorrect..."
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
            correctSelection,
            toggleCardOpenClose
        }

    }
}

createApp(App).use(vuetify).mount('#app');
