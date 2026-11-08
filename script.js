
// =====================================
// AW101-611 CSAR EDUCATIONAL SYSTEM
// JAVASCRIPT
// =====================================

const menuButtons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".page");

// MENU NAVIGATION

menuButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active menu
        menuButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate selected menu
        button.classList.add("active");

        // Hide all pages
        pages.forEach(page => {
            page.classList.remove("active");
        });

        // Show selected page
        const section = button.dataset.section;

        const selectedPage = document.getElementById(section);

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

    });

});

// CURRENT SYSTEM STATUS

console.log("AW101-611 CSAR Educational System");
console.log("System initialized successfully.");
console.log("Navigation ready.");


// AW101 TRAINING QUIZ

const quizQuestions = [
    {
        question: "How many independent hydraulic systems are identified in the reference?",
        answers: ["2 systems", "3 systems", "4 systems"],
        correct: 1
    },
    {
        question: "How many main fuel tanks are identified?",
        answers: ["2 tanks", "3 tanks", "5 tanks"],
        correct: 1
    },
    {
        question: "How many blades does the main rotor have?",
        answers: ["4 blades", "5 blades", "6 blades"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionTitle = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("quiz-options");
const feedback = document.getElementById("quiz-feedback");
const nextButton = document.getElementById("next-question");
const scoreDisplay = document.getElementById("quiz-score");
const progressBar = document.getElementById("quiz-progress-bar");
const resultArea = document.getElementById("quiz-result");
const questionArea = document.getElementById("quiz-question-area");

function loadQuestion() {
    const question = quizQuestions[currentQuestion];

    answered = false;

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1} / ${quizQuestions.length}`;

    questionTitle.textContent = question.question;

    feedback.textContent = "";
    nextButton.disabled = true;

    progressBar.style.width =
        `${(currentQuestion / quizQuestions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const question = quizQuestions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".quiz-option");

    buttons.forEach(button => button.disabled = true);

    if (selectedIndex === question.correct) {
        score++;
        selectedButton.classList.add("correct");
        feedback.textContent = "Correct answer! Excellent work.";
    } else {
        selectedButton.classList.add("wrong");
        buttons[question.correct].classList.add("correct");
        feedback.textContent = "Not quite! The correct answer is highlighted.";
    }

    scoreDisplay.textContent = score;
    nextButton.disabled = false;
}

function showResults() {
    questionArea.hidden = true;
    resultArea.hidden = false;

    progressBar.style.width = "100%";

    document.getElementById("final-score").textContent =
        `Your score: ${score} / ${quizQuestions.length}`;

    const previousBest = Number(
        localStorage.getItem("aw101BestScore") || 0
    );

    if (score > previousBest) {
        localStorage.setItem("aw101BestScore", score);
    }

    updateBestScore();
}

function updateBestScore() {
    const best = Number(
        localStorage.getItem("aw101BestScore") || 0
    );

    document.getElementById("best-score").textContent =
        `BEST: ${best} / ${quizQuestions.length}`;

       updateBestScore(); 
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

document.getElementById("restart-quiz").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    scoreDisplay.textContent = "0";

    resultArea.hidden = true;
    questionArea.hidden = false;

    loadQuestion();
});

loadQuestion();


/* DASHBOARD NAVIGATION */

document.querySelectorAll("[data-section]").forEach(button => {

    button.addEventListener("click", () => {

        const section = button.dataset.section;

        // Find the matching sidebar button
        const menuButton = document.querySelector(
            `.menu-btn[data-section="${section}"]`
        );

        if (menuButton) {
            menuButton.click();
        }

    });

});

/* AW101 DIGITAL CLOCK */

function updateDigitalClock() {

    const now = new Date();

    const clock = document.getElementById("digital-clock");
    const date = document.getElementById("digital-date");

    if (!clock || !date) return;

    clock.textContent = now.toLocaleTimeString("en-GB");

    date.textContent = now.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

updateDigitalClock();

setInterval(updateDigitalClock, 1000);