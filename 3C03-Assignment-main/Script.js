
const { createApp, ref, computed } = Vue; //computer value makes Vue re-calculate whenever the reactive thing it depends on change
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

        const answeredQuestions = ref([]); // An array of all questions that have been answered and must subsequently get disabled 


        const gameComplete = computed (() => {
            return answeredQuestions.value.length === 20;
        }); // the computed returns true only when the length is 20
       

        // This function is activated when the player presses a "Play Again" button. 
        function restartGame() {
            answeredQuestions.value = [];
            scoreCount.value = 0;
            backgroundColour.value = "white"; // Changes the background colour 
        }

        // This function is connected to multiple-choice answers. It checks if the user has selected the correct answer.
        function validateResult(input, correct, points) {
            if (input == correct) {
                scoreCount.value = scoreCount.value + Number(points);
                answeredQuestions.value.push(points); // Add the points to the answered questions array
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
        
        const questions = ref([
            {id: "anatomy200",  //unique key
                category: 0,   //which column
                row: 1,         //which row (200, 400, 600, 800)
                question:"...", 
                answers: ["A","B","C","D"], 
                correct:2       // 0=A, 1=B, 2=C, 3=D
            },

        ]);
        /*

        const csvText = '' //the coloumns are: id, category, row, question, answerA, answerB, answerC, answerD, correct
            //copy and past the csv text into later




        function generateBoard(){
                // This function generates the board of buttons. It is activated when the game starts and after they click "Play Again".
                const board = [];
                for (let row = 1; row <= rowOneButtons; row++){
                    const rowArray = [];

                    for (let col = 1; col <= columns; col++){
                        const questionNumber = (row - 1) * columns + col;

                        rowArray.push({ //adds an object to the row array for each button. The object has:
                            points: row * 200, //the point value of the question, which is determined by the row number (e.g., row 1 = 200 points, row 2 = 400 points, etc.)
                            content: `question${questionNumber}`, //the question placeholder (e.g., "question1") to link a click to a question in a future question bank
                            button: `col${col}row${row}`, //a unique key for Vue rendering (used in :key). This is determined by the column and row number (e.g., "col1row1" for the first button, "col2row1" for the second button, etc.)
                            correctAnswer: null //a placeholder for the correct answer, which will be filled in when the question bank is implemented. This will be used in the validateResult function to check if the user's answer is correct
                        });
                    }
                    board.push(rowArray); //adds the row array to the board array
                }
                return board; //returns the complete board array, which is an array of arrays (rows) containing objects (buttons)
        }




*/

        const rowOneButtons = [
            // The 200-point row. Each object has:
            // - button: unique key for Vue rendering (used in :key)
            // - points: label shown on the tile (currently a String)
            // - content: question placeholder (e.g., "question1") to link a click to a question in a future question bank
            {
                button: "col1row1",
                points: "200",
                content: "question1",
                //Additional string values: answerA, answerB, answerC, answerD. These will be accompanied by a correctAnswer variable that is equal to one of the answer options.
                //The answer that is recorded from html using the @click will execute a validateResults function that records the user actions,
                //and compare the user selected option to see if it is the same as the correctAnswer variable.
                //If correct, we will add points to a points-counter variable that is displayed in the menu.
                //Else, we will ask the user to "choose again" and leave the score as-is.
                correctAnswer: null
            },
            {
                button: "col2row1",
                points: "200",
                content: "question2",
                correctAnswer: null
            },
            {
                button: "col3row1",
                points: "200",
                content: "question3",
                correctAnswer: null
            },
            {
                button: "col4row1",
                points: "200",
                content: "question4",
                correctAnswer: null
            },
            {
                button: "col5row1",
                points: "200",
                content: "question5",
                correctAnswer: null
            }
        ]
        const rowTwoButtons = [
            // The 400-point row. Same schema as rowOneButtons.
            // Need to use item.content + item.points in click logic to open the correct question and score it once.
            {
                button: "col1row2",
                points: "400",
                content: "question6",
                correctAnswer: null
            },
            {
                button: "col2row2",
                points: "400",
                content: "question7",
                correctAnswer: null
            },
            {
                button: "col3row2",
                points: "400",
                content: "question8",
                correctAnswer: null
            },
            {
                button: "col4row2",
                points: "400",
                content: "question9",
                correctAnswer: null
            },
            {
                button: "col5row2",
                points: "400",
                content: "question10",
                correctAnswer: null
            }
        ]
        const rowThreeButtons = [
            // The 600-point row. Same schema as rowOneButtons.
            {
                button: "col1row3",
                points: "600",
                content: "question11",
                correctAnswer: null
            },
            {
                button: "col2row3",
                points: "600",
                content: "question12",
                correctAnswer: null
            },
            {
                button: "col3row3",
                points: "600",
                content: "question13",
                correctAnswer: null
            },
            {
                button: "col4row3",
                points: "600",
                content: "question14",
                correctAnswer: null
            },
            {
                button: "col5row3",
                points: "600",
                content: "question15",
                correctAnswer: null
            }
        ]
        const rowFourButtons = [
            // The 800-point row. Same schema as rowOneButtons.
            {
                button: "col1row4",
                points: "800",
                content: "question16",
                correctAnswer: null
            },
            {
                button: "col2row4",
                points: "800",
                content: "question17",
                correctAnswer: null
            },
            {
                button: "col3row4",
                points: "800",
                content: "question18",
                correctAnswer: null
            },
            {
                button: "col4row4",
                points: "800",
                content: "question19",
                correctAnswer: null
            },
            {
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
            rowOneButtons,
            rowTwoButtons,
            rowThreeButtons,
            rowFourButtons,
            categories,
            imageBlue,
            imageWhite,
            gameComplete,
            answeredQuestions,
            backgroundColour,
            restartGame,
            validateResult
        }

    }
}

createApp(App).use(vuetify).mount('#app');
