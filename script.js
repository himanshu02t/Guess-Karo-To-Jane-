const words = [
  { word: "apple", hint: "A common red or green fruit." },
  { word: "banana", hint: "A long yellow fruit." },
  { word: "cherry", hint: "A small red fruit, often used on cakes." },
  { word: "dragon", hint: "A mythical fire-breathing creature." },
  { word: "eagle", hint: "A strong bird of prey with sharp eyesight." },
  { word: "flower", hint: "Colorful part of a plant, often used as gifts." }
];

let selectedWord = "";
let selectedHint = "";
let correctLetters = [];
let wrongLetters = [];
let maxAttempts = 6;
let remainingAttempts = 6;
let timerInterval;
let timeLeft = 60;

const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersDiv = document.getElementById("wrongLetters");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const triesLeft = document.getElementById("triesLeft");
const difficultySelect = document.getElementById("difficulty");
const hintBtn = document.getElementById("hintBtn");
const hint = document.getElementById("hint");
const timer = document.getElementById("timer");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

function setDifficulty(level) {
  if (level === "easy") maxAttempts = 8;
  else if (level === "medium") maxAttempts = 6;
  else maxAttempts = 4;
  remainingAttempts = maxAttempts;
  triesLeft.textContent = remainingAttempts;
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;
  timer.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      message.textContent = `⏰ Time's up! The word was: ${selectedWord}`;
      wordDisplay.textContent = selectedWord;
      loseSound.play();
    }
  }, 1000);
}

difficultySelect.addEventListener("change", () => {
  setDifficulty(difficultySelect.value);
  startGame();
});

function startGame() {
  const chosen = words[Math.floor(Math.random() * words.length)];
  selectedWord = chosen.word;
  selectedHint = chosen.hint;
  correctLetters = [];
  wrongLetters = [];
  hint.textContent = "";
  setDifficulty(difficultySelect.value);
  message.textContent = "";
  updateWordDisplay();
  updateWrongLetters();
  startTimer();
}

function updateWordDisplay() {
  wordDisplay.innerHTML = selectedWord
    .split("")
    .map((letter) => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");

  if (!wordDisplay.innerHTML.includes("_")) {
    message.textContent = "🎉 Congratulations! You guessed the word!";
    winSound.play();
    clearInterval(timerInterval);
  }
}

function updateWrongLetters() {
  wrongLettersDiv.textContent = `Wrong letters: ${wrongLetters.join(", ")}`;
  triesLeft.textContent = maxAttempts - wrongLetters.length;

  if (wrongLetters.length >= maxAttempts) {
    message.textContent = `💀 You lost! The word was: ${selectedWord}`;
    wordDisplay.textContent = selectedWord;
    loseSound.play();
    clearInterval(timerInterval);
  }
}

hintBtn.addEventListener("click", () => {
  hint.textContent = `Hint: ${selectedHint}`;
});

window.addEventListener("keydown", (e) => {
  const letter = e.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        updateWordDisplay();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      }
    }
  }
});

restartBtn.addEventListener("click", startGame);

setDifficulty("medium");
startGame();