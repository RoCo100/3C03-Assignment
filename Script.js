const { createApp, ref } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

const App = {
    setup() {
        const scoreCount = ref(0); // Update this when a user answers a question correctly/incorrectly. scoreCount is updated using the validateResult() function. 

        const backgroundColour = ref("white"); // Sets the background for the main screen. The background colour is changed to green when the user finishes the game. 

        const imageScoreCard = "Score Whale.png";
        const imageQuestionCard = "Question Whale.png";
        // The 2 image filenames used to display stylized whales, on the score card and question cards respectively. 

        const correctSelection = ref(null); // A boolean that tracks if the user has selected the correct answer to a question; will be used to determine what message (correct/incorrect) is displayed after they select a multiple choice answer.

        const gameComplete = ref(false); // A boolean that controls when the game is done 
        const answeredQuestions = ref([]); // An array of all questions that have been answered and must subsequently have their buttons disabled 

        const navDrawerOpen = ref(false); // A boolean that controls whether the navigation drawer is open or closed. 
        const learnMoreOpen = ref(false); // A boolean that controls whether the Learn More button is activated 
        const tutorialOpen = ref(true); // A boolean that controls whether the Tutorial button is activated 


        // These three functions (openNavDrawer, toggleLearnMoreOpenClosed and toggleTutorialOpenClosed) operate identically to the toggleCardOpenClose function that we've used in in-class labs. They are each linked to an @click in the HTML file. 
        function openNavDrawer() { 
            if (navDrawerOpen.value == false) {
                navDrawerOpen.value = true;
            }
            else {
                navDrawerOpen.value = false;
            }
        }

        function toggleLearnMoreOpenClosed() { 
            if (learnMoreOpen.value == false) {
                learnMoreOpen.value = true;
            }
            else {
                learnMoreOpen.value = false;
            }
        }

        function toggleTutorialOpenClosed() {
            if (tutorialOpen.value == false) {
                tutorialOpen.value = true;
            }
            else {
                tutorialOpen.value = false;
            }
        }

        function checkGameComplete() { // This if...else determines when the game should end 
            if (answeredQuestions.value.length === 20) { //The game ends when all 20 questions have been answered
                gameComplete.value = true;
                backgroundColour.value = "#85C79A"; // Changes the background colour to green 
            } else { //The game continues as long as less than 20 questions have been answered 
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
        }

        // This function is connected to multiple-choice answers. It checks if the user has selected the correct answer.
        function validateResult(input, correct, buttonID, points) {
            if (input == correct) {
                scoreCount.value = scoreCount.value + Number(points);  // Increases the score count by the number of points associated with the question. (i.e., 200, 400, 600, or 800.)              
                correctSelection.value = true; //This boolean state (true) is linked to a <v-card-text> that informs the user they've selected the correct answer, along with an explanation of why it is correct.
            } else {
                correctSelection.value = false;  //This boolean state (false) is linked to a <v-card-text> that displays an "incorrect" message, along with an explanation of the correct answer. 
            }
                answeredQuestions.value.push(buttonID); // Adds the buttonID to the answeredQuestions array
                
        }


        const modules = [ //This array contains the information for the navigation drawer. May need to be updated if any groups change their module name. 
            { name: "Jeopardy: Whale Health!",
                url: "https://roco100.github.io/3C03-Assignment/"
            },
            { name: "Ocean Route Explorer",
                url: "https://ameliag116.github.io/Ocean-Route-Explorer/"
            },
            { name: "Temporal Tides",
                url: "https://nkkkkkkkkkkk.github.io/Temporal-Tides/"
            },
            { name: "Ocean Commotion",
                url: "https://madsb04.github.io/Ocean-Commotion-/"
            },
            { name: "Indigenous Perspectives in Reducing Whale Harm in Shipping Practices",
                url: "https://genevawhite.github.io/genevacoding/"
            },
            { name: "Whale Anatomy, Maritime Threats, and Traditional Ecological Knowledge",
                url: "https://safiya-fs.github.io/Whale-Anatomy-Module/"
            },
            { name: "Relationships Between Traditional and Western Ecological Knowledge in Whale Protection Practices",
                url: "https://alipanju12.github.io/Relationship-Between-Indigenous-Knowledge-Whale-Protection-and-Maritime-Commerce-/"
            }
        ]
        
        const categories = [ // These are the five category headers shown at the top of the Jeopardy board.  
            { name: "Anatomy" },
            { name: "Noise" },
            { name: "Stress" },
            { name: "Collisions" },
            { name: "Toxins" }
        ]

        // This function controls opening and closing a question button. It is activated once when the user selects a question, and again when the user selects the "exit" button. 
        function toggleCardOpenClose(button) {
            if (button.showCard.value == false) {
                button.showCard.value = true
                
            } else {
                button.showCard.value = false
                correctSelection.value = null; //This resets the "correctSelection" boolean to null in between questions. This way, the "correct" or "incorrect" message is not carried over from the previous question. 
                checkGameComplete(); // Check if the game is complete each time the player presses the "Exit" button
            }
        }

        function isAnswered(buttonID) {
            // This function checks if a question has already been answered by seeing if its buttonID is in the answeredQuestions array. If it is, then the question button gets disabled. 
            return answeredQuestions.value.includes(buttonID);
        }

        function getTileColor(buttonID) {
            // This function checks if a question has already been answered by seeing if its buttonID is in the answeredQuestions array. If it is, then the question tile turns light blue. 
            if (answeredQuestions.value.includes(buttonID)) {
                return "#4c8cccff"; // This is the colour that the tile turns when a question has been answered.
            } else {
                return "#4E8D9C"; // This is the original tile colour.
            }
            }

        // The arrays are categorized in rows, based on "uncomfortability level". This means that the questions are grouped together based on how much they challenge anthropocentrism and cause discomfort in the human user. 
        const lowDiscomfortRow = [
            // The 200-point row. Each object has:
            // - button: unique key for Vue rendering (used in :key)
            // - points: label, such as 200, 400, 600, or 800, that is displayed on the question tile  
            // - answerA, answerB, etc.: the multiple choice answer options 
            // - correctAnswer: the correct multiple choice option, equal to one of answerA, answerB, answerC, or answerD.
            // - content: question that the user attempts to answer
            // - explanation: an explanation of the correct answer  
            // The questions of this level seek to establish whales as independent beings with sophisticated capacities, physical abilities and anatomical structures. These questions do not yet tie their existence in relation to human activity and are more scientific than political in nature. 
            {
                showCard: ref(false),
                button: "col1row1",
                points: "200",
                content: "Weighing nearly 900 kg in a blue whale, this four-chambered organ circulates nutrients across an ocean-sized body, sustaining life.",
                correctAnswer: "Heart",
                answerA: "Heart",
                answerB: "Liver",
                answerC: "Blowhole sac",
                answerD: "Baleen chamber",
                explanation: 'Whales have a heart that weighs around 900 kg. It sustains oxygen and nutrient circulation across an enormous body adapted for deep diving and long migration <a href="https://www.bbcearth.com/news/the-anatomy-of-a-whale" target="_blank">(Connor, n.d.).</a>'
                // Connor, S. (n.d.). The anatomy of a whale. BBC Earth. https://www.bbcearth.com/news/the-anatomy-of-a-whale
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
                explanation: 'Auditory masking occurs when background noise overlaps spectrally or temporally with whale communication signals, interfering with signal detection and recognition <a href="https://doi.org/10.1016/j.watbs.2023.100141" target="_blank">(Guan & Brookens, 2023).</a>'
                // Guan, Y. & Brookens, T. (2023). An overview of research efforts to understand the effects of underwater sound on cetaceans. Water Biology and Security, 2(2), 100141. https://doi.org/10.1016/j.watbs.2023.100141
            },
            {
                showCard: ref(false),
                button: "col3row1",
                points: "200",
                content: "As background noise intensifies, whales often increase this vocal trait to maintain social bonds across distance.",
                    // Human activity is not yet explicitly defined as the focus remains on whales for the questions of this level. 
                correctAnswer: "Call amplitude",
                answerA: "Fluke width",
                answerB: "Silence duration",
                answerC: "Call amplitude",
                answerD: "Dive depth",
                explanation: 'Whales increase the loudness (amplitude) of their calls to communicate with other whales across long distances and loud background noises <a href="https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf" target="_blank">(Washington State Academy of Sciences, 2020).</a>'
                // Washington State Academy of Sciences. (2020). Summary of key research findings about underwater noise and vessel disturbance. https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf
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
                explanation: 'Whales use their fluke, or tail, to propel themselves with powerful, vertical strokes. The fluke accounts for a significant portion of their total body muscle mass. If the fluke were damaged, whales could not swim, forage, migrate, or escape as efficiently, making it far more difficult for them to survive <a href="https://oceantoday.noaa.gov/whaleanatomy/" target="_blank">(National Oceanic and Atmospheric Administration, n.d.).</a>'
                // National Oceanic and Atmospheric Administration. (n.d.). Whale anatomy. https://oceantoday.noaa.gov/whaleanatomy/
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
                explanation: 'Many whales, including baleen whales, have multi-chambered stomachs capable of mechanically and chemically processing thousands of kilograms of prey per day. Their ability to properly digest and metabolize food is central to their movement and survival <a href="https://www.bbcearth.com/news/the-anatomy-of-a-whale" target="_blank">(Connor, n.d.).</a>'
                // Connor, S. (n.d.). The anatomy of a whale. BBC Earth. https://www.bbcearth.com/news/the-anatomy-of-a-whale
            }
        ]
        const mediumDiscomfortRow = [
            // The 400-point row.  
            // Questions of subsequent levels will continue building upon the concepts and learning objectives of previous levels.
            // The questions of this level begin to connect human industrial, tourism, and shipping activity and its detrimental consequences on whale health. The questions begin to solely refer to humans as Homo sapiens in an effort to combat anthropocentrism, reminding the user that humans, too, are only a species.
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
                explanation: 'Baleen whales have two blowholes connected directly to their lungs. As they surface to breathe, they can exchange up to 80–90% of their oxygen in a single breath, far more efficiently than <i>Homo sapiens</i> <a href="https://www.bbcearth.com/news/the-anatomy-of-a-whale" target="_blank">(Connor, n.d.).</a>'
                // Connor, S. (n.d.). The anatomy of a whale. BBC Earth. https://www.bbcearth.com/news/the-anatomy-of-a-whale
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
                explanation: 'Temporary threshold shift (TTS) is a temporary elevation in hearing threshold following loud sound exposure. Whales may recover their hearing with time, but may still experience neural damage <a href="https://doi.org/10.1007/978-1-4939-8574-6_10" target="_blank">(Erbe et al., 2018).</a>'
                // Erbe, C., Dunlop, R. A., & Dolman, S. J. (2018). Effects of noise on marine mammals. In H. Slabbekoorn, R. J. Dooling, A. N. Popper, & R. R. Fay (Eds.), Effects of anthropogenic noise on animals (pp. 277–309). Springer. https://doi.org/10.1007/978-1-4939-8574-6_10
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
                explanation: 'Fitness describes the ability to reproduce and survive. Whales experiencing chronic stress from persistent noise face impaired reproductive success, immune function, and long-term survival <a href="https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf" target="_blank">(Washington State Academy of Sciences, 2020).</a>'
                // Washington State Academy of Sciences. (2020). Summary of key research findings about underwater noise and vessel disturbance. https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf
            },
            {
                showCard: ref(false),
                button: "col4row2",
                points: "400",
                content: "Busy shipping lanes pose a danger to whales undergoing this essential behaviour.",
                correctAnswer: "Migrating",
                answerA: "Migrating",
                answerB: "Socializing",
                answerC: "Mating",
                answerD: "Surfacing",
                explanation: 'Shipping lanes often overlap with long-distance migratory routes, increasing the risk of collision between whale beings and the ships of <i>Homo sapiens</i> <a href="https://baleinesendirect.org/en/discover/whales-future/threats/" target="_blank">(Group for Research and Education on Marine Mammals, n.d.).</a>'
                // Group for Research and Education on Marine Mammals (n.d.). Threats to whales. https://baleinesendirect.org/en/discover/whales-future/threats/
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
                explanation: 'Polychlorinated biphenyls (PCBs) are organic pollutants that accumulate in blubber and disrupt immune and reproductive systems. They are difficult for whales to metabolize and disrupt their internal processes <a href="https://baleinesendirect.org/en/discover/whales-future/threats/" target="_blank">(Group for Research and Education on Marine Mammals, n.d.;</a> <a href="https://baleinesendirect.org/en/discover/whales-future/threats/" target="_blank">Whale and Dolphin Conservation, n.d.).</a>'
                // Group for Research and Education on Marine Mammals (n.d.). Threats to whales. https://baleinesendirect.org/en/discover/whales-future/threats/
                // Whale and Dolphin Conservation. (n.d.). Their biggest threats. https://hval.whales.org/en/meet-the-whales/their-biggest-threats
            }
        ]
        const highDiscomfortRow = [
            // The 600-point row.  
            // The questions of this level reinforce a causal relation between Homo sapiens activity and its detrimental consequences on whale health. The consequences listed are more adverse and specific in comparison to those from previous levels. 
            // Harmful chemicals, ships or other materials associated with Homo sapiens activity are directly attributed to Homo sapiens activity and even described with the "Homo sapiens" adjective modifier.  
            // The explicit wording of these questions and explanations seeks to emphasize the insidious harms of anthropocentrism on whale beings. 
            {
                showCard: ref(false),
                button: "col1row3",
                points: "600",
                content: "This thick, energy-rich tissue both sustains whales during migration and stores the toxic byproducts of industrial <i>Homo sapiens</i> activity.",
                correctAnswer: "Blubber",
                answerA: "Cartilage",
                answerB: "Blubber",
                answerC: "Muscle sheath",
                answerD: "Keratin plates",
                explanation: 'Blubber is a thick, fibrous, energy-rich tissue that insulates whales and stores energy. It also accumulates fat-soluble toxins introduced by industrial <i>Homo sapiens</i> activity <a href="https://oceantoday.noaa.gov/whaleanatomy/" target="_blank">(National Oceanic and Atmospheric Administration, n.d.;</a> <a href="https://baleinesendirect.org/en/discover/whales-future/threats/" target="_blank">Whale and Dolphin Conservation, n.d.).</a>'
                // National Oceanic and Atmospheric Administration. (n.d.). Whale anatomy. https://oceantoday.noaa.gov/whaleanatomy/
                // Whale and Dolphin Conservation. (n.d.). Their biggest threats. https://hval.whales.org/en/meet-the-whales/their-biggest-threats
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
                explanation: 'Permanent threshold shift (PTS) occurs when hearing thresholds remain permanently elevated due to irreversible damage to the sensory hair cells or neural pathways of whales <a href="https://doi.org/10.1007/978-1-4939-8574-6_10" target="_blank">(Erbe et al., 2018).</a>'
                // Erbe, C., Dunlop, R. A., & Dolman, S. J. (2018). Effects of noise on marine mammals. In H. Slabbekoorn, R. J. Dooling, A. N. Popper, & R. R. Fay (Eds.), Effects of anthropogenic noise on animals (pp. 277–309). Springer. https://doi.org/10.1007/978-1-4939-8574-6_10
            },
            {
                showCard: ref(false),
                button: "col3row3",
                points: "600",
                content: "Exposure to persistent noise from <i>Homo sapiens</i> in the surrounding environment elevates this hormone in whales.",
                correctAnswer: "Cortisol",
                answerA: "Melatonin",
                answerB: "Cholecystokinin",
                answerC: "Insulin",
                answerD: "Cortisol",
                explanation: 'Loud, <i>Homo sapiens</i> noise has been linked to increased cortisol levels, revealing a strong, physiological stress response in whales <a href="https://doi.org/10.1016/j.watbs.2023.100141" target="_blank">(Guan & Brookens, 2023).</a>'
                // Guan, Y. & Brookens, T. (2023). An overview of research efforts to understand the effects of underwater sound on cetaceans. Water Biology and Security, 2(2), 100141. https://doi.org/10.1016/j.watbs.2023.100141
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
                explanation: 'Propeller strikes from small <i>Homo sapiens</i> ships can result in deep lacerations and even fatal injuries in whales <a href="https://hval.whales.org/en/meet-the-whales/their-biggest-threats" target="_blank">(Whale and Dolphin Conservation, n.d.).</a>'
                // Whale and Dolphin Conservation. (n.d.). Their biggest threats. https://hval.whales.org/en/meet-the-whales/their-biggest-threats
            },
            {
                showCard: ref(false),
                button: "col5row3",
                points: "600",
                content: "Beluga whales living in the St. Lawrence Estuary carry toxin levels up to four times higher than their Arctic relatives, contributing to unusually high rates of this disease.",
                correctAnswer: "Infections and cancer",
                answerA: "Cardiomyopathy",
                answerB: "Bone density loss",
                answerC: "Infections and cancer",
                answerD: "Thermal stress disorder",
                explanation: 'St. Lawrence belugas are heavily contaminated with industrial pollutants such as heavy metals. These toxins impair immune function and are associated with elevated cancer rates and increased vulnerability to infection. St. Lawrence belugas cannot even migrate to escape chronic exposure to <i>Homo sapiens</i> pollutants <a href="https://baleinesendirect.org/en/discover/whales-future/threats/" target="_blank">(Group for Research and Education on Marine Mammals, n.d.).</a>'
                // Group for Research and Education on Marine Mammals (n.d.). Threats to whales. https://baleinesendirect.org/en/discover/whales-future/threats/
            }
        ]
        const extremeDiscomfortRow = [
            // The 800-point row. 
            // The questions of this level describe Homo sapiens activity as life-changing, or even fatal, to whale beings. They are designed to induce the highest level of uncomfortability in Homo sapiens users as the users are forced to internalize themselves as a source of whale fatalities. 
            // The questions reframe whale health not as an isolated environmental tragedy but as a consequence of widespread and harmful anthropocentrism. 
            {
                showCard: ref(false),
                button: "col1row4",
                points: "800",
                content: "These microscopic inner-ear structures allow whales to perceive distant family members across hundreds of kilometers and are permanently destroyed by intense sounds of <i>Homo sapiens</i> ships.",
                correctAnswer: "Sensory hair cells",
                answerA: "Sensory hair cells",
                answerB: "Tubercles",
                answerC: "Gill filaments",
                answerD: "Spiral valves",
                explanation: 'These tiny structures in the cochlea convert sound vibrations into neural signals. Intense <i>Homo sapiens</i> sound can permanently destroy them, leading to irreversible hearing loss and impeding whales from properly navigating the world <a href="https://doi.org/10.1007/978-1-4939-8574-6_10" target="_blank">(Erbe et al., 2018).</a>'
                // Erbe, C., Dunlop, R. A., & Dolman, S. J. (2018). Effects of noise on marine mammals. In H. Slabbekoorn, R. J. Dooling, A. N. Popper, & R. R. Fay (Eds.), Effects of anthropogenic noise on animals (pp. 277–309). Springer. https://doi.org/10.1007/978-1-4939-8574-6_10
            },
            {
                showCard: ref(false),
                button: "col2row4",
                points: "800",
                content: "When deep-diving beaked whales hear naval sonars from <i>Homo sapiens</i> ships, they rapidly ascend to the surface, leading to this condition involving gas bubbles in organs and tissues.",
                correctAnswer: "Gas-bubble disease",
                answerA: "Thermal shock",
                answerB: "Hypoxic seizure",
                answerC: "Blubber rupture",
                answerD: "Gas-bubble disease",
                explanation: 'Rapid surfacing due to sonar exposure has been linked to tissue damage in deep-diving beaked whales. Gas-bubble disease is also known as decompression sickness <a href="https://doi.org/10.1016/j.watbs.2023.100141" target="_blank">(Guan & Brookens, 2023).</a>'
                // Guan, Y. & Brookens, T. (2023). An overview of research efforts to understand the effects of underwater sound on cetaceans. Water Biology and Security, 2(2), 100141. https://doi.org/10.1016/j.watbs.2023.100141
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
                explanation: 'Whales are more hesitant to seek food when they are surrounded by dangerous ship vessels. Reduced feeding lowers energy intake, impairing their capacity to reproduce and survive <a href="https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf" target="_blank">(Washington State Academy of Sciences, 2020).</a>'
                // Washington State Academy of Sciences. (2020). Summary of key research findings about underwater noise and vessel disturbance. https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf
            },
            {
                showCard: ref(false),
                button: "col4row4",
                points: "800",
                content: "One population of North Atlantic whales has declined to roughly 366 individuals, making every <i>Homo sapiens</i> ship collision devastating to their survival.",
                correctAnswer: "North Atlantic right whales",
                answerA: "Blue whales",
                answerB: "Beluga whales",
                answerC: "Sperm whales",
                answerD: "North Atlantic right whales",
                explanation: 'This family of whales has declined to roughly 366 individuals. With such low numbers, each death significantly impacts the survival of this community of whales <a href="http://wwfwhales.org/news-stories/whales-on-the-move" target="_blank">(Johnson, n.d.).</a>'
                // Technically, this particular "family of whales" can be referred to as a "species," but we intentionally adapted the wording to resist any assumed homo sapiens superiority and facilitate empathetic engagement between the homo sapiens user and the dire circumstances faced by whale beings.
                // Johnson, C. (n.d.). Whales on the move - mapping threats and solutions for our ocean giants. World Wildlife Fund. http://wwfwhales.org/news-stories/whales-on-the-move
            },
            {
                showCard: ref(false),
                button: "col5row4",
                points: "800",
                content: "Firstborn, developing whales often die within their first year of life because toxins from <i>Homo sapiens</i> activity are transferred through this substance from their mother.",
                correctAnswer: "Milk",
                answerA: "Blubber",
                answerB: "Milk",
                answerC: "Amniotic fluid",
                answerD: "Seawater",
                explanation: 'Fat-soluble toxins stored in blubber are transferred to calves through maternal milk. This is the reason why many firstborn whales do not survive their first year of life <a href="https://hval.whales.org/en/meet-the-whales/their-biggest-threats" target="_blank">(Whale and Dolphin Conservation, n.d.).</a>'
                // Whale and Dolphin Conservation. (n.d.). Their biggest threats. https://hval.whales.org/en/meet-the-whales/their-biggest-threats
            }
        ]

        return {
            // Everything returned here becomes available to index.html for bindings (like {{scoreCount}}, v-for loops, etc).

            scoreCount,
            lowDiscomfortRow,
            mediumDiscomfortRow,
            highDiscomfortRow,
            extremeDiscomfortRow,
            categories,
            imageScoreCard,
            imageQuestionCard,
            gameComplete,
            answeredQuestions,
            backgroundColour,
            restartGame,
            validateResult,
            correctSelection,
            toggleCardOpenClose,
            isAnswered,
            getTileColor,
            openNavDrawer,
            navDrawerOpen,
            modules,
            learnMoreOpen,
            toggleLearnMoreOpenClosed,
            tutorialOpen,
            toggleTutorialOpenClosed
            
        }
    }
}


createApp(App).use(vuetify).mount('#app');
