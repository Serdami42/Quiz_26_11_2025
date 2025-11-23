const questions = [
  {
    question: "Wie viele Kontinente gibt es?",
    answers: ["5", "6", "7"],
    correct: 2
  },
  {
    question: "Was ist die Hauptstadt von Frankreich?",
    answers: ["Berlin", "Paris", "Madrid"],
    correct: 1
  }
];

let current = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("startBtn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

startBtn.onclick = () => {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;

  answersEl.innerHTML = "";

  // Layout: maximal 3 Antworten (1 oben, 2 unten)
  q.answers.slice(0, 3).forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.classList.add("answer-btn", `answer${i+1}`);
    btn.onclick = () => checkAnswer(i, btn);
    answersEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function checkAnswer(i, btn) {
  if (i === questions[current].correct) score++;

  nextBtn.style.display = "block";

  [...answersEl.children].forEach((b, index) => {
    b.disabled = true;
    if (index === questions[current].correct) b.classList.add("correct");
    else if (index === i) b.classList.add("wrong");
  });
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.innerHTML = `<h2>Fertig! Punkte: ${score}/${questions.length}</h2>`;
}
