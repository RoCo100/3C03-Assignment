const { createApp, ref } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

const App = {
    setup() {
        const scoreCount = ref(0);
        const imageBlue = "whale.png";
        const imageWhite = "imageNoBackground.png";

        const categories = [
            { name: "Anatomy" },
            { name: "Audition" },
            { name: "Stress" },
            { name: "Ships"},
            { name: "Pollution" }
        ]
        const rowOneButtons = [
            { button: "col1row1",
                points: "200",
                content: "question1" 
            },
            { button: "col2row1",
                points: "200",
                content: "question2"
            },
            { button: "col3row1",
                points: "200",
                content: "question3"
            },
            { button: "col4row1",
                points: "200",
                content: "question4"
            },
            { button: "col5row1",
                points: "200",
                content: "question5"
            }
        ]
        const rowTwoButtons = [
            { button: "col1row2",
                points: "400",
                content: "question6" 
            },
            { button: "col2row2",
                points: "400",
                content: "question7"
            },
            { button: "col3row2",
                points: "400",
                content: "question8"
            },
            { button: "col4row2",
                points: "400",
                content: "question9"
            },
            { button: "col5row2",
                points: "400",
                content: "question10"
            }
        ]
        const rowThreeButtons = [
            { button: "col1row3",
                points: "600",
                content: "question11"
            },
            { button: "col2row3",
                points: "600",
                content: "question12"
            },
            { button: "col3row3",
                points: "600",
                content: "question13"
            },
            { button: "col4row3",
                points: "600",
                content: "question14"
            },
            { button: "col5row3",
                points: "600",
                content: "question15"
            }
        ]
        const rowFourButtons = [
            { button: "col1row4",
                points: "800",
                content: "question16"
            },
            { button: "col2row4",
                points: "800",
                content: "question17"
            },
            { button: "col3row4",
                points: "800",
                content: "question18"
            },
            { button: "col4row4",
                points: "800",
                content: "question19"
            },
            { button: "col5row4",
                points: "800",
                content: "question20"
            }
        ]

    return {
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