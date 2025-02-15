let currentLevel = 1;
let score = 0;
let timer;
let timeLeft = 30;
let questionsAnswered = 0;
let correctAnswers = 0;

const levelDisplay = document.getElementById('level-display');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const questionDisplay = document.getElementById('question-display');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-answer');
const feedbackDisplay = document.getElementById('feedback-display');
const startButton = document.getElementById('start-game');

// Start the game
startButton.addEventListener('click', startGame);

function startGame() {
  currentLevel = 1;
  score = 0;
  timeLeft = 30;
  questionsAnswered = 0;
  correctAnswers = 0;
  updateDisplay();
  generateQuestion();
  startTimer();
  startButton.style.display = 'none';
}

// Generate a random math question based on the level
function generateQuestion() {
  let question = '';
  let correctAnswer = 0;

  if (currentLevel === 1) {
    // Level 1: Simple algebra
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    question = `Solve for x: ${a}x + ${b} = ${a * 2 + b}`;
    correctAnswer = 2;
  } else if (currentLevel === 2) {
    // Level 2: Polynomials
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    question = `Solve for x: x^2 - ${a + b}x + ${a * b} = 0`;
    correctAnswer = a; // One of the roots
  } else if (currentLevel === 3) {
    // Level 3: Calculus
    const a = Math.floor(Math.random() * 5) + 1;
    question = `Find the derivative of f(x) = ${a}x^2 + ${a * 2}x`;
    correctAnswer = `${2 * a}x + ${a * 2}`;
  }

  questionDisplay.textContent = question;
  return correctAnswer;
}

// Check the player's answer
submitButton.addEventListener('click', () => {
  const playerAnswer = answerInput.value.trim();
  const correctAnswer = generateQuestion();

  if (playerAnswer == correctAnswer) {
    score += 10;
    correctAnswers++;
    feedbackDisplay.textContent = 'Correct! +10 points.';
  } else {
    score -= 5;
    feedbackDisplay.textContent = `Incorrect! The correct answer is ${correctAnswer}.`;
  }

  questionsAnswered++;
  updateDisplay();

  if (questionsAnswered === 5) {
    levelUp();
  } else {
    generateQuestion();
  }

  answerInput.value = '';
});

// Update the display with current level, score, and timer
function updateDisplay() {
  levelDisplay.textContent = `Level: ${currentLevel}`;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;
}

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Level up the player
function levelUp() {
  if (currentLevel < 4) {
    currentLevel++;
    timeLeft = 30 - (currentLevel - 1) * 10; // Decrease timer
    questionsAnswered = 0;
    updateDisplay();
    generateQuestion();
  } else {
    endGame();
  }
}

// End the game
function endGame() {
  clearInterval(timer);
  feedbackDisplay.textContent = `Game Over! Final Score: ${score}`;
  startButton.style.display = 'block';
}