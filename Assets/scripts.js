var score = 0;
var timeLeft = 60;
var timer; 

const startButton = document.getElementById("start-btn")
const questionBoxElement = document.getElementById("questions")
const scoreElement = document.getElementById("score");
scoreElement.textContent = `Score: ${score}`;
const finalScoreElement = document.createElement("p");
scoreElement.appendChild(finalScoreElement);

var questionEl = document.getElementById("question")
var answerEl = document.getElementById("answer-btns")
var randomQuestion, currentQuestion

startButton.addEventListener("click", startQuiz)



const timerElement = document.getElementById("timer");

function updateTime() {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft === 0) {
        endQuiz();
    }
    if (answerIsWrong) {
        if (timeLeft >= 10) {
            subtractTime(10);
        } else {
            timeLeft = 0;
            endQuiz();
        }
    }
}

function startQuiz(){
    score = 0; 
    timeLeft = 60; 
    timer = setInterval(updateTime, 1000);
    startButton.classList.add("hide")
    randomQuestion = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionBoxElement.classList.remove("hide")
    nextQuestion()
}

function nextQuestion(){
    reset()
    showQuestion(randomQuestion[currentQuestion])
}

function showQuestion(question){
    questionEl.innerText = `Question ${currentQuestion + 1}: ${question.question}`;
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener("click", getAnswer)
        answerEl.appendChild(button)
    })
}

function reset(){
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild);
    }
    scoreElement.textContent = `Score: ${score}`;
}

function getAnswer(j) {
    var getButton = j.target;
    var correct = getButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < randomQuestion.length) {
            nextQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct")
    } else {
        element.classList.add("Wrong")
    }
}

function endQuiz() {
    clearInterval(timer);
    reset();
    questionBoxElement.classList.add("hide");
    const initials = prompt("Enter your initials:");
    finalScoreElement.textContent = `Final Score: ${score} (${initials})`;
    startButton.classList.remove("hide");
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        question: "How do you create an array in Javascript?",
        answers: [
            {text: "Using ()", correct: false },
            {text: "Using []", correct: true },
            {text: "Using {}", correct: false },
            {text: "Using ''", correct: false },
        ]
    },
    {
        question: "What data type does Javascript support?",
        answers: [
            {text: "Null", correct: false },
            {text: "Boolean", correct: false },
            {text: "String", correct: false },
            {text: "All of the above", correct: true },
        ]
    },
    {
        question: "Is Javascript a case sensitive language?",
        answers: [
            {text: "True", correct: true },
            {text: "False", correct: false },
        ]
    }

];
