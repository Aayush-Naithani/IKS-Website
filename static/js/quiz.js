/* =====================================================
   IKS QUIZ
===================================================== */


let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;


/* Elements */

const quizIntro =
    document.getElementById("quizIntro");

const quizBox =
    document.getElementById("quizBox");

const quizResult =
    document.getElementById("quizResult");

const startQuiz =
    document.getElementById("startQuiz");

const restartQuiz =
    document.getElementById("restartQuiz");

const questionText =
    document.getElementById("questionText");

const quizOptions =
    document.getElementById("quizOptions");

const nextQuestion =
    document.getElementById("nextQuestion");

const questionNumber =
    document.getElementById("questionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const progressFill =
    document.getElementById("progressFill");

const finalScore =
    document.getElementById("finalScore");

const scoreMessage =
    document.getElementById("scoreMessage");


/* =====================================================
   START QUIZ
===================================================== */

startQuiz.addEventListener("click", function () {

    currentQuestion = 0;

    score = 0;

    quizIntro.style.display = "none";

    quizResult.style.display = "none";

    quizBox.style.display = "block";

    loadQuestion();

});


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

    selectedAnswer = null;

    nextQuestion.disabled = true;


    const question =
        quizData[currentQuestion];


    questionNumber.textContent =
        `Question ${currentQuestion + 1}`;


    totalQuestions.textContent =
        `/ ${quizData.length}`;


    questionText.textContent =
        question.question;


    quizOptions.innerHTML = "";


    /* Progress */

    const progress =
        ((currentQuestion + 1) /
        quizData.length) * 100;


    progressFill.style.width =
        `${progress}%`;


    /* Create options */

    question.options.forEach(
        function (option, index) {


            const button =
                document.createElement("button");


            button.classList.add(
                "quiz-option"
            );


            button.textContent =
                option;


            button.dataset.index =
                index;


            button.addEventListener(
                "click",
                function () {

                    selectAnswer(
                        index,
                        button
                    );

                }
            );


            quizOptions.appendChild(button);

        }
    );

}


/* =====================================================
   SELECT ANSWER
===================================================== */

function selectAnswer(
    selectedIndex,
    selectedButton
) {

    selectedAnswer = selectedIndex;


    /* Remove previous selection */

    const options =
        document.querySelectorAll(
            ".quiz-option"
        );


    options.forEach(
        function (button) {

            button.classList.remove(
                "selected"
            );

        }
    );


    selectedButton.classList.add(
        "selected"
    );


    nextQuestion.disabled = false;

}


/* =====================================================
   NEXT QUESTION
===================================================== */

nextQuestion.addEventListener(
    "click",
    function () {


        const correctAnswer =
            quizData[currentQuestion].answer;


        if (
            selectedAnswer === correctAnswer
        ) {

            score++;

        }


        currentQuestion++;


        if (
            currentQuestion <
            quizData.length
        ) {

            loadQuestion();

        } else {

            showResult();

        }

    }
);


/* =====================================================
   SHOW RESULT
===================================================== */

function showResult() {

    quizBox.style.display = "none";

    quizResult.style.display = "block";


    finalScore.textContent =
        `${score} / ${quizData.length}`;


    const percentage =
        (score / quizData.length) * 100;


    if (percentage === 100) {

        scoreMessage.textContent =
            "Excellent! You have a strong understanding of IKS.";

    }

    else if (percentage >= 70) {

        scoreMessage.textContent =
            "Great job! You have a good understanding of IKS.";

    }

    else if (percentage >= 40) {

        scoreMessage.textContent =
            "Good start! Explore more and try the quiz again.";

    }

    else {

        scoreMessage.textContent =
            "Keep learning! Explore the IKS sections and try again.";

    }

}


/* =====================================================
   RESTART
===================================================== */

restartQuiz.addEventListener(
    "click",
    function () {

        currentQuestion = 0;

        score = 0;

        quizResult.style.display = "none";

        quizBox.style.display = "block";

        loadQuestion();

    }
);