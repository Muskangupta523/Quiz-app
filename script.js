const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the capital of Bihar?",
        answers: ["Gaya", "Patna", "sitapur", "Rome"],
        correctAnswer: "Patna"
    },
    {
        question: "Which is known as the Green Planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Earth"
    },

    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let hasAttempted = false;

function initializeQuiz() {
    showQuestion();
    const nextButton = document.getElementById("down-button");
    nextButton.addEventListener("click", nextQuestion);
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const quizDiv = document.querySelector('.quiz');
    const infoElement = document.getElementById("info");

    // Remove existing infoElement if it exists
    if (infoElement) {
        quizDiv.removeChild(infoElement);
    }

    // Create a new element to display score and question attempt information
    const newInfoElement = document.createElement("div");
    newInfoElement.id = "info";
    quizDiv.appendChild(newInfoElement);

    // Update the innerHTML of the newInfoElement
    newInfoElement.innerHTML = `Score: ${score}/${currentQuestionIndex + 1} | Question ${currentQuestionIndex + 1}/${quizData.length}`;

    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.className = "btn";
        answerButton.textContent = answer;
        answerButton.addEventListener("click", () => checkAnswer(index));

        answersElement.appendChild(answerButton);
    });

    const answerButtons = document.getElementsByClassName("btn");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = false;
    }

    attachAnswerButtonListeners();
}

function checkAnswer(selectedIndex) {
    if (hasAttempted) {
        return;
    }

    hasAttempted = true;

    const currentQuestion = quizData[currentQuestionIndex];
    const answerButtons = document.getElementsByClassName("btn");

    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    }

    if (currentQuestion.answers[selectedIndex] === currentQuestion.correctAnswer) {
        score++;
        answerButtons[selectedIndex].classList.add("correct"); // Add correct class
    } else {
        answerButtons[selectedIndex].classList.add("incorrect"); // Add incorrect class
        const correctIndex = currentQuestion.answers.indexOf(currentQuestion.correctAnswer);
        answerButtons[correctIndex].classList.add("correct"); // Add correct class to the correct answer
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
            hasAttempted = false;
        } else {
            alert("Quiz completed! Your score: " + score + "/" + quizData.length + "\nPlay again?");
            resetQuiz();
        }
    }, 1000);
}

function nextQuestion() {
    if (!hasAttempted) {
        alert("Please click an answer before moving to the next question.");
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        hasAttempted = false;
    } else {
        alert("Quiz completed! Your score: " + score + "/" + quizData.length + "\nPlay again?");
        resetQuiz();
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hasAttempted = false;

    const answerButtons = document.getElementsByClassName("btn");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = false;
        answerButtons[i].classList.remove("correct", "incorrect"); // Remove classes
    }

    showQuestion();
}

function attachAnswerButtonListeners() {
    const answerButtons = document.getElementsByClassName("btn");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener("click", () => checkAnswer(i));
    }
}

window.onload = initializeQuiz;
