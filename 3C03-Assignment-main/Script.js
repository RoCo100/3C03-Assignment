// Critical Lens: Countless ecological crises, including threats to whale health, are attributed to anthropocentrism. Drawing upon Katherine Hayles’ integrated cognitive framework (ICF), we contest anthropocentrism by “humanizing” whales as independent actors in relation to humans. Hayles also argues that “cognitive assemblages,” or decision-making collectives of humans, nonhumans, and computational media, determine the choices that humans make (2025). Humans are actually not as self-determining as anthropocentrism would like them to believe (Hayles, 2025). Their assumptions are formed and mediated by computational media (Hayles, 2025). As a game that has been traditionally framed as the intellectual pursuit of objective truths, Jeopardy is an example of a cognitive assemblage that impacts human decision-making. By playing our Jeopardy game on whale health, human users confront their “dehumanization” and simultaneous “humanization” of whales, re-learning cognition as something that is possessed by all species. The language of our Jeopardy questions will solely refer to humans by their species name, *homo sapiens*, and explore “humane” aspects of whale health, migration, habitats, families, and communities. Additionally, instead of rewarding players with more points for selecting more difficult questions, we will reward players for choosing to confront increasingly uncomfortable topics of anthropocentric shipping, pollution, and extractive practices, and their impacts on whale health. By employing Jeopardy’s epistemic authority and the anti-anthropocentric ICF, our Jeopardy module reframes whale health not as an isolated environmental tragedy but as a consequence of widespread and harmful anthropocentrism.
// Reference: Hayles, N. K. (2025). Bacteria to AI: Human futures with our nonhuman symbionts. University of Chicago Press. ProQuest Ebook Central. http://ebookcentral.proquest.com/lib/mcmu/detail.action?docID=31887642


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
            { name: "The Whale Body" },
            { name: "Noise Disturbances" },
            { name: "Stress & Survival" },
            { name: "Physical Collisions" },
            { name: "Chemical Harms" }
        ]

        // This function controls opening and closing a question button. It is activated once when the user seleects a question, and again when the user selects the "exit" button. 
        function toggleCardOpenClose(button) {
            if (button.showCard.value == false) {
                button.showCard.value = true
                checkGameComplete(); // Check if the game each time the player presses the "exit" button
            } else {
                button.showCard.value = false
                correctSelection.value = null; //This resets the "correctSelection" boolean to null in between questions. This way, the "correct" or "incorrect" message is not carried over from the previous question. 
                
            }
        }

        // The arrays are categorized in rows, based on "uncomfortability level". This means that the questions are grouped together based on how much they challenge anthropocentrism and cause discomfort in the human user. 
        // Instead of rewarding players with more points for selecting more difficult questions, unlike typical Jeopardy questions, we will reward players for choosing to confront increasingly uncomfortable topics of anthropocentric shipping, pollution, and extractive practices, and their impacts on whale health. 
        const lowDiscomfortRow = [
            // The 200-point row. Each object has:
            // - button: unique key for Vue rendering (used in :key)
            // - points: label shown on the tile (currently a String)
            // - content: question which invokes the lowest level of uncomfortability
            // The questions of this level seek to establish whales as independent beings with sophisticated capacities, physical abilities and anatomical structures. These questions does not yet tie their existence in relation to human activity and are more so scientific than political in nature. 
            {
                showCard: ref(false),
                button: "col1row1",
                points: "200",
                content: "Weighing nearly 900 kg in a blue whale, this four-chambered organ circulates nutrients across an ocean-sized body, sustaining life.",
                correctAnswer: "Heart",
                answerA: "Liver",
                answerB: "Heart",
                answerC: "Blowhole sac",
                answerD: "Baleen chamber",
                explanation: "Whales have a heart that weighs around 900 kg. It sustains oxygen and nutrient circulation across an enormous body adapted for deep diving and long migration."
            },
            {
                showCard: ref(false),
                button: "col2row1",
                points: "200",
                content: "This phenomenon occurs when noises in the environment overlap spectrally and temporally with whale calls, preventing a whale mother from locating her baby.",
                    // The scientific term for a developing baby is a "calf," yet, here, they are referred to as a "baby" for the intended purpose of familiarizing the user with whale beings and their meaningful capacity to sustain familial connections.
                correctAnswer: "Auditory masking",
                answerA: "Echo distortion",
                answerB: "Auditory masking",
                answerC: "Acoustic drift",
                answerD: "Frequency collapse",
                explanation: "Auditory masking occurs when background noise overlaps spectrally or temporally with whale communication signals, interfering with signal detection and recognition."
            },
            {
                showCard: ref(false),
                button: "col3row1",
                points: "200",
                content: "As background noise intensifies, whales often increase this vocal trait to maintain social bonds across distance.",
                    // Human activity is not yet explicitly defined as the focus remains on whales for the questions of this level. 
                correctAnswer: "Call amplitude",
                answerA: "Call amplitude",
                answerB: "Silence duration",
                answerC: "Fluke width",
                answerD: "Dive depth",
                explanation: "Whales increase the loudness (amplitude) of their calls to communicate with other whales across long distances and loud background noises."

            },
            {
                showCard: ref(false),
                button: "col4row1",
                points: "200",
                content: "This powerful, horizontally flattened structure, driven by massive muscles in the peduncle, propels whales and enables them to dive deep.",
                correctAnswer: "Fluke",
                answerA: "Dorsal fin",
                answerB: "Pectoral flipper",
                answerC: "Fluke",
                answerD: "Blowhole",
                explanation: "Whales use their fluke, or tail, to propel themselves with powerful, vertical strokes. The fluke accounts for a significant portion of their total body muscle mass. If the fluke were damaged, whales could not swim, forage, migrate, or escape as efficiently, making it far more difficult for them to survive."
            },
            {
                showCard: ref(false),
                button: "col5row1",
                points: "200",
                content: "Many large whales have multiple compartments in this digestive organ, allowing them to efficiently process massive quantities of krill or fish every day.",
                correctAnswer: "Stomach",
                answerA: "Liver",
                answerB: "Gallbladder",
                answerC: "Pancreas",
                answerD: "Stomach",
                explanation: "Many whales, including baleen whales, have multi-chambered stomachs capable of mechanically and chemically processing thousands of kilograms of prey per day. Whales' ability to properly digest and metabolize food is central to their movement and survival."
            }
        ]
        const mediumDiscomfortRow = [
            // The 400-point row. Same schema as rowOneButtons.
            // Need to use item.content + item.points in click logic to open the correct question and score it once.
            // Questions of subsequent levels will continue building upon the concepts and learning objectives of previous levels.
            // The questions of this level begin to connect human industrial, tourism, and shipping activity and its detrimental consequences on whale health. The questions begin to solely refer to humans as homo sapiens in an effort to combat anthropocentrism, reminding the user that humans, too, are only a species.  
            // In our Logic Implementation, we will italicize "homo sapiens" to emphasize the scientific nature of species labelling and resist dominant discourse valuing humans above other species. 
            {
                showCard: ref(false),
                button: "col1row2",
                points: "400",
                content: "Through these paired openings, a baleen whale consciously surfaces to exchange up to 90% of their oxygen in a single breath before returning to depth.",
                correctAnswer: "Blowholes",
                answerA: "Gill slits",
                answerB: "Frontal pores",
                answerC: "Nasal vents",
                answerD: "Blowholes",
                explanation: "Baleen whales have two blowholes connected directly to their lungs. As they surface to breathe, they can exchange up to 80–90% of their oxygen in a single breath, far more efficiently than homo sapiens."
            },
            {
                showCard: ref(false),
                button: "col2row2",
                points: "400",
                content: "Loud shipping noises can cause this to occur to a whale’s hearing threshold.",
                correctAnswer: "Temporary Threshold Shift",
                answerA: "Auditory paralysis",
                answerB: "Auditory silencing",
                answerC: "Permanent Threshold Shift",
                answerD: "Temporary Threshold Shift",
                explanation: "Temporary threshold shift (TTS) is a temporary elevation in hearing threshold following loud sound exposure. Whales may recover their hearing with time, but may still experience neural damage."
            },
            {
                showCard: ref(false),
                button: "col3row2",
                points: "400",
                content: "Chronic low-frequency ship noise has been linked to this long-term health consequence in whales.",
                correctAnswer: "Reduced fitness",
                answerA: "Improved immunity",
                answerB: "Reduced fitness",
                answerC: "Increased fertility",
                answerD: "Extended lifespan",
                explanation: "Fitness describes the ability to reproduce and survive. Whales experiencing chronic stress from persistent noise face impaired reproductive success, immune function, and long-term survival."
            },
            {
                showCard: ref(false),
                button: "col4row2",
                points: "400",
                content: "Whales exposed to busy shipping lanes often reduce this essential survival behaviour.",
                correctAnswer: "Migrating",
                answerA: "Socializing",
                answerB: "Migrating",
                answerC: "Mating",
                answerD: "Surfacing",
                explanation: "Shipping lanes often overlap with long-distance migratory routes, increasing the risk of collision between whale beings and the homo sapiens' ships."
            },
            {
                showCard: ref(false),
                button: "col5row2",
                points: "400",
                content: "These industrial compounds accumulate in whale blubber, weakening immune systems and disrupting reproductive processes across generations.",
                correctAnswer: "Polychlorinated biphenyls",
                answerA: "Polychlorinated biphenyls",
                answerB: "Chlorophyll",
                answerC: "Nitrates",
                answerD: "Calcium carbonate",
                explanation: "Polychlorinated biphenyls (PCBs) are organic pollutants that accumulate in blubber and disrupt immune and reproductive systems. They are difficult for whales to metabolize and disrupt their internal processes."
            }
        ]
        const highDiscomfortRow = [
            // The 600-point row. Same schema as rowOneButtons.
            // The questions of this level reinforce a causal relation between homo sapiens activity and its detrimental consequences on whale health. The consequences listed are more adverse and specific in comparison to the those from previous levels. 
            // Harmful chemicals, ships or other materials associated with homo sapiens activity are directly attributed to homo sapiens activity and even described with the "homo sapiens" adjective modifier.  
            // The explicit wording of these questions and explanations seek to emphasize the insidious harms of anthropocentrism on whale beings. 
            {
                showCard: ref(false),
                button: "col1row3",
                points: "600",
                content: "This thick, energy-rich tissue both sustains whales during migration and stores the toxic byproducts of industrial homo sapiens activity.",
                correctAnswer: "Blubber",
                answerA: "Cartilage",
                answerB: "Blubber",
                answerC: "Muscle sheath",
                answerD: "Keratin plates",
                explanation: "Blubber is a thick, fibrous, energy-rich tissue that insulates whales and stores energy. It also accumulates fat-soluble toxins introduced by industrial homo sapiens activity."
            },
            {
                showCard: ref(false),
                button: "col2row3",
                points: "600",
                content: "When the hearing threshold remains permanently elevated, this irreversible injury occurs to whales, reducing their sensitivity to vital navigational and social cues.",
                correctAnswer: "Permanent Threshold Shift",
                answerA: "Permanent Threshold Shift",
                answerB: "Temporary Threshold Shift",
                answerC: "Auditory paralysis",
                answerD: "Auditory silencing",
                explanation: "Permanent threshold shift (PTS) occurs when hearing thresholds remain permanently elevated due to irreversible damage to whales' sensory hair cells or neural pathways."
            },
            {
                showCard: ref(false),
                button: "col3row3",
                points: "600",
                content: "Exposure to persistent noise from homo sapiens in the surrounding environment elevates this hormone in whales.",
                correctAnswer: "Cortisol",
                answerA: "Melatonin",
                answerB: "Cholecystokinin",
                answerC: "Insulin",
                answerD: "Cortisol",
                explanation: "Loud, homo sapiens noise has been linked to increased cortisol levels, revealing a strong, physiological stress response in whales."
            },
            {
                showCard: ref(false),
                button: "col4row3",
                points: "600",
                content: "Even smaller recreational boats can severely injure whales when this rotating mechanical structure strikes their bodies.",
                correctAnswer: "Propeller",
                answerA: "Anchor",
                answerB: "Propeller",
                answerC: "Rudder",
                answerD: "Hull fin",
                explanation: "Propeller strikes from small homo sapiens ships can result in deep lacerations and even fatal injuries in whales."
            },
            {
                showCard: ref(false),
                button: "col5row3",
                points: "600",
                content: "Beluga whales living in the St. Lawrence Estuary carry toxin levels up to four times higher than their Arctic relatives, contributing to unusually high rates of this disease.",
                correctAnswer: "Infections and cancer",
                answerA: "Cardiomyopathy",
                answerB: "Infections and cancer",
                answerC: "Bone density loss",
                answerD: "Thermal stress disorder",
                explanation: "St. Lawrence belugas are heavily contaminated with industrial pollutants such as heavy metals. These toxins impair immune function and are associated with elevated cancer rates and increased vulnerability to infection. St. Lawrence belugas cannot even migrate to escape chronic exposure to homo sapiens pollutants."
            }
        ]
        const extremeDiscomfortRow = [
            // The 800-point row. Same schema as rowOneButtons.
            // The questions of this level describe homo sapiens activity as life-changing, or even fatal, to whale beings. They are designed to induce the highest level of uncomfortability in homo sapiens users as the users are forced to internalize themselves as a source of whale fatalities. 
            // The questions reframe whale health not as an isolated environmental tragedy but as a consequence of widespread and harmful anthropocentrism. 
            {
                showCard: ref(false),
                button: "col1row4",
                points: "800",
                content: "These microscopic inner-ear structures allow whales to perceive distant family members across hundreds of kilometers and are permanently destroyed by intense sounds of homo sapiens ships.",
                correctAnswer: "Sensory hair cells",
                answerA: "Tubercles",
                answerB: "Sensory hair cells",
                answerC: "Gill filaments",
                answerD: "Spiral valves",
                explanation: "These tiny structures in the cochlea convert sound vibrations into neural signals. Intense homo sapiens sound can permanently destroy them, leading to irreversible hearing loss and impeding whales from properly navigating the world."
            },
            {
                showCard: ref(false),
                button: "col2row4",
                points: "800",
                content: "When deep-diving beaked whales hear naval sonars from homo sapiens ships, they rapidly ascend to the surface, leading to this condition involving gas bubbles in organs and tissues.",
                correctAnswer: "Gas-bubble disease",
                answerA: "Thermal shock",
                answerB: "Hypoxic seizure",
                answerC: "Gas-bubble disease",
                answerD: "Blubber rupture",
                explanation: "Rapid surfacing due to sonar exposure has been linked to tissue damage in deep-diving beaked whales. Gas-bubble disease is also known as decompression sickness."
            },
            {
                showCard: ref(false),
                button: "col3row4",
                points: "800",
                content: "When surrounded by more than three whale-watching vessels, whales frequently abandon this essential behavior, sacrificing nourishment to escape collisions.",
                correctAnswer: "Foraging",
                answerA: "Breathing",
                answerB: "Foraging",
                answerC: "Sleeping",
                answerD: "Surfacing",
                explanation: "Whales are more hesitant to seek food when they are surrounded by dangerous ship vessels. Reduced feeding lowers energy intake, impairing whales' reproduction and survival."
            },
            {
                showCard: ref(false),
                button: "col4row4",
                points: "800",
                content: "One population of North Atlantic whales has declined to roughly 366 individuals, making every ship collision devastating to their survival.",
                correctAnswer: "North Atlantic right whales",
                answerA: "Blue whales",
                answerB: "North Atlantic right whales",
                answerC: "Sperm whales",
                answerD: "Beluga whales",
                explanation: "This family of whales has declined to roughly 366 individuals. With such low numbers, each death significantly impacts the survival of this community of whales."
                    // Technically, this particular "family of whales" can be referred to as a "species," but we intentionally adapted the wording to resist any assumed homo sapiens superiority and facilitate empathetic engagement between the homo sapiens user and the dire circumstances faced by whale beings.
            },
            {
                showCard: ref(false),
                button: "col5row4",
                points: "800",
                content: "Firstborn, developing whales often die within their first year of life because toxins from homo sapiens activity are transferred through this substance from their mother.",
                correctAnswer: "Milk",
                answerA: "Blubber",
                answerB: "Milk",
                answerC: "Amniotic fluid",
                answerD: "Seawater",
                explanation: "Fat-soluble toxins stored in blubber are transferred to calves through maternal milk, often contributing to high first-year mortality."
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
