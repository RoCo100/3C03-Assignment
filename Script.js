
const { createApp, ref } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

const App = {
    setup() {
        const scoreCount = ref(0);
        // Update this when a user answers a question correctly/incorrectly (requires click handlers + question logic).
        // Add a function validateResult to check if the choice made is the correctAnswer string value in each array of the row of buttons. 
        
        const imageBlue = "whale.png";
        const imageWhite = "imageNoBackground.png";
        // The 2 image filenames used. Need to keep these assets available in the same folder so the html can render it consistently.

        const categories = [
            // These are category headers shown at the top of the board. Need to align the question bank so each column/category has matching questions.
            { name: "Anatomy" },
            { name: "Audition" },
            { name: "Stress" },
            { name: "Ships" },
            { name: "Pollution" }
        ]
        const rowOneButtons = [
            // The 200-point row. Each object has:
            // - button: unique key for Vue rendering (used in :key)
            // - points: label shown on the tile (currently a String)
            // - content: question placeholder (e.g., "question1") to link a click to a question in a future question bank
            {
                button: "col1row1",
                points: "200",
                content: "question1"
                //Additional string values: answerA, answerB, answerC, answerD. These will be accompanied by a correctAnswer variable that is equal to one of the answer options.
                //The answer that is recorded from html using the @click will execute a validateResults function that records the user actions,
                //and compare the user selected option to see if it is the same as the correctAnswer variable.
                //If correct, we will add points to a points-counter variable that is displayed in the menu.
                //Else, we will ask the user to "choose again" and leave the score as-is.
            },
            {
                button: "col2row1",
                points: "200",
                content: "question2"
            },
            {
                button: "col3row1",
                points: "200",
                content: "question3"
            },
            {
                button: "col4row1",
                points: "200",
                content: "question4"
            },
            {
                button: "col5row1",
                points: "200",
                content: "question5"
            }
        ]
        const rowTwoButtons = [
            // The 400-point row. Same schema as rowOneButtons.
            // Need to use item.content + item.points in click logic to open the correct question and score it once.
            {
                button: "col1row2",
                points: "400",
                content: "question6"
            },
            {
                button: "col2row2",
                points: "400",
                content: "question7"
            },
            {
                button: "col3row2",
                points: "400",
                content: "question8"
            },
            {
                button: "col4row2",
                points: "400",
                content: "question9"
            },
            {
                button: "col5row2",
                points: "400",
                content: "question10"
            }
        ]
        const rowThreeButtons = [
            // The 600-point row. Same schema as rowOneButtons.
            {
                button: "col1row3",
                points: "600",
                content: "question11"
            },
            {
                button: "col2row3",
                points: "600",
                content: "question12"
            },
            {
                button: "col3row3",
                points: "600",
                content: "question13"
            },
            {
                button: "col4row3",
                points: "600",
                content: "question14"
            },
            {
                button: "col5row3",
                points: "600",
                content: "question15"
            }
        ]
        const rowFourButtons = [
            // The 800-point row. Same schema as rowOneButtons.
            {
                button: "col1row4",
                points: "800",
                content: "question16"
            },
            {
                button: "col2row4",
                points: "800",
                content: "question17"
            },
            {
                button: "col3row4",
                points: "800",
                content: "question18"
            },
            {
                button: "col4row4",
                points: "800",
                content: "question19"
            },
            {
                button: "col5row4",
                points: "800",
                content: "question20"
            }
        ]

        return {
            // Everything returned here becomes available to index.html for bindings (like {{scoreCount}}, v-for loops, etc).
            // When gameplay is implemented, we will also need to return additional states such as selectedAnswer, validateResults, and answeredQuestionsId 
            // selectedAnswer: a string that can be equal to answerA, answerB, answerC, or answerD. It records the answer that the user selected for a particular question. 
            // validateResults: a function that checks if selectedAnswer = correctAnswer, and increases the user's score accordingly. 
            // answeredQuestionsId: an array that keeps track of which questions have already been answered and disables the corresponding buttons. 

            scoreCount,
            rowOneButtons,
            rowTwoButtons,
            rowThreeButtons,
            rowFourButtons,
            categories,
            imageBlue,
            imageWhite
        }

    }
}

createApp(App).use(vuetify).mount('#app');
