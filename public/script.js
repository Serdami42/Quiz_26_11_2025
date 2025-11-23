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

startBtn.onclick = () => {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.slice(0, 3).forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn", `answer${i+1}`);

    // Text in span packen
    const btnText = document.createElement("span");
    btnText.textContent = ans;
    btn.appendChild(btnText);

    btn.onclick = () => checkAnswer(i, btn);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(i, btn) {
  if (i === questions[current].correct) score++;

  [...answersEl.children].forEach((b, index) => {
    b.disabled = true;
    if (index === questions[current].correct) {
      b.classList.add("correct");
    } else if (index === i) {
      b.classList.add("wrong");
    }
  });

  // automatische nächste Frage nach 1,5 Sekunden
  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  quizContainer.innerHTML = `<h2>Fertig! Punkte: ${score}/${questions.length}</h2>`;
}
