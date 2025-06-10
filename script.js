const pregunta_escrita = [
    {
        question: "Pregunta",
        answer: "Respuesta",
        answer2: "respuesta"
    },
  ];

const template = [
    {
        question: "Pregunta",
        answers: ["Respuesta", "respuesta", "otra respuesta"]
    },
];

const make_plural_1 = [
    {
        question: "das Ei",
        answers: ["das Eier", "Eier"]
    },
];


const food_g_e = [
    {
        question: "das Abendessen",
        answers: ["dinner", "the dinner"]
    },
    {
        question: "das Brot",
        answers: ["bread", "the bread"]
    },
    {
        question: "die Butter",
        answers: ["butter", "the butter"]
    },
    {
        question: "das Ei",
        answers: ["egg", "the egg"]
    },
    {
        question: "das Eigelb",
        answers: ["yolk", "the yolk"]
    },
    {
        question: "das Eiweiß",
        answers: ["egg white", "the egg white"]
    },
    {
        question: "das Essen",
        answers: ["food", "the food"]
    },
    {
        question: "das Fett",
        answers: ["fat", "the fat"]
    },
    {
        question: "fettarm",
        answers: ["low-fat", "low fat"]
    },
    {
        question: "gammeln",
        answers: ["to spoil"]
    },
        {
        question: "gekocht",
        answers: ["boiled"]
    },
    {
        question: "der Käse",
        answers: ["cheese"]
    },
    {
        question: "lecker",
        answers: ["tasty", "mouthwatering"]
    },    
    {
        question: "die Meeresfrüchte",
        answers: ["seafood", "the seafood"]
    },
    {
        question: "das Mehl",
        answers: ["flour", "the flour"]
    },
    {
        question: "das Mittagessen",
        answers: ["lunch", "the lunch"]
    },
    {
        question: "süß",
        answers: ["sweet", "sugary"]
    },
    {
        question: "vegan",
        answers: ["vegan"]
    },
    {
        question: "verfault",
        answers: ["rotten"]
    },
];



// ... (other arrays remain unchanged)

let questions = [];
let wrongQuestions = [];
let currentQuestion = 0;
let score = 0;
let topic;
let originalTopic; // To store the original topic array

function openSelect() {
    optionMenu = document.getElementById('select_topic');
    optionMenu.style.display = 'flex';
    select_button = document.getElementsByClassName('open-select')[0];
    select_button.style.display = 'none';
}

function closeSelect() {
    optionMenu = document.getElementById('select_topic');
    optionMenu.style.display = 'none';
    select_button = document.getElementsByClassName('open-select')[0];
    select_button.style.display = 'block';
}

function theme_is(chosen) {
    topic = chosen;
    shuffle(topic);
    originalTopic = [...chosen]; // Create a copy of the original topic
    currentQuestion = 0;
    score = 0;

    closeSelect();

    loadQuestion();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    // Limit to 10 questions per round
    if (currentQuestion === 0) {
        questions = originalTopic.slice(0, Math.min(10, originalTopic.length));
        shuffle(questions);
    }

    const headingone = document.getElementsByTagName('h1')[0];
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const resultElement = document.getElementById("result");
    
    headingone.style.display = 'none';

    if (currentQuestion < questions.length) {
        const currentQuestionData = questions[currentQuestion];

        questionElement.textContent = currentQuestionData.question;
        resultElement.textContent = "";

        optionsContainer.innerHTML = "";

        if (currentQuestionData.options) {
            // Display multiple choice options
            currentQuestionData.options.forEach((option, index) => {
                const button = document.createElement("button");
                button.textContent = option;
                button.className = "option";
                button.addEventListener("click", () => checkAnswer(option, currentQuestionData.answers));
                optionsContainer.appendChild(button);
            });
        } else {
            // Display input field for free-text input
            const input = document.createElement("input");
            input.type = "text";
            input.autofocus = true;

            input.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submitButton.click();
                }
            });

            const submitButton = document.createElement("button");
            submitButton.textContent = "Send";
            submitButton.addEventListener("click", () => checkInputAnswer(input.value, currentQuestionData.answers));
            optionsContainer.appendChild(input);
            optionsContainer.appendChild(submitButton);
        }
    } else {
        // Display final score or redirect to another exercise
        questionElement.textContent = "Test completado!";
        optionsContainer.innerHTML = "";
        resultElement.innerHTML = "Score: " + score + " out of " + questions.length + '.<br> <br> Total: ' + parseInt(score * 10 / questions.length) + ' sobre 10.';

        // Add a button to review incorrect questions
        const reviewButton = document.createElement("button");
        reviewButton.textContent = "Review mistakes";
        optionsContainer.appendChild(reviewButton);
        reviewButton.addEventListener("click", () => theme_is(wrongQuestions));

        // Add a button to start a new round
        const newRoundButton = document.createElement("button");
        newRoundButton.textContent = "New round";
        optionsContainer.appendChild(newRoundButton);
        newRoundButton.addEventListener("click", () => theme_is(originalTopic));
    }
}

function checkInputAnswer(inputValue, correctAnswers) {
    const resultElement = document.getElementById("result");

    if (correctAnswers.some(answer => inputValue.toLowerCase() === answer.toLowerCase())) {
        score++;
        resultElement.textContent = "Yasss!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Oups, some possible answers: " + correctAnswers.join(", ");
        resultElement.style.color = "red";

        // Add the current question to the list of incorrect questions
        wrongQuestions.push(questions[currentQuestion]);
        wrongQuestions.push(questions[currentQuestion]);
    }

    currentQuestion++;

    // After a brief delay, load the next question
    setTimeout(() => {
        loadQuestion();
    }, 2000);
}

function checkAnswer(selectedOption, correctAnswers) {
    const resultElement = document.getElementById("result");

    if (correctAnswers.includes(selectedOption)) {
        score++;
        resultElement.textContent = "Correcto!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Oups, las respuestas correctas son: " + correctAnswers.join(", ");
        resultElement.style.color = "red";

        // Add the current question to the list of incorrect questions
        wrongQuestions.push(questions[currentQuestion]);
    }

    currentQuestion++;

    // After a brief delay, load the next question
    setTimeout(() => {
        loadQuestion();
    }, 2000);
}
