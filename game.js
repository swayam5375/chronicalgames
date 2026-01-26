/* =========================
   FINAL game.js (FULL UPDATED)
   - Case insensitive typing
   - 100 words (4 / 7 / 10 letters)
   - No-repeat per game run
   - Separate highscores for easy/medium/hard
   - Sounds: correct / click / timeover (WAV)
   - Zoom score animation
   - End popup (Restart / Exit)
   ========================= */

/* ---------- SOUNDS ---------- */
const soundCorrect = new Audio("sounds/correct.wav");
const soundClick = new Audio("sounds/click.wav");
const soundTimeOver = new Audio("sounds/timeover.wav");

/* ---------- GAME STATE ---------- */
let score = 0;
let timeLeft = 0;
let timer = null;
let currentDifficulty = "";
let usedWords = [];
let inputListenerAttached = false;

/* ---------- HIGHSCORES ---------- */
let high_easy = parseInt(localStorage.getItem("highscore_easy")) || 0;
let high_medium = parseInt(localStorage.getItem("highscore_medium")) || 0;
let high_hard = parseInt(localStorage.getItem("highscore_hard")) || 0;

/* ---------- WORD LISTS ---------- */
const words_easy = [
 "time","game","code","fast","play","jump","hero","love","king","moon",
 "star","fire","wind","ball","rock","wolf","bird","rain","snow","road",
 "blue","dark","door","ring","ship","team","song","leaf","tree","gold"
];

const words_medium = [
 "monitor","charger","builder","captain","mission","playing","science","fantasy","digital","restart",
 "display","battery","process","network","control","execute","student","android","graphic","console",
 "physics","grammar","balance","history","message","imagine","journey","victory","college","pointer",
 "chapter","context","crystal","journeyx","packets"
];

const words_hard = [
 "keyboarder","monitoring","processing","university","programmer","developers","animationx","controllerz","spacecraft","foundation",
 "generation","technology","conversion","javascript","computation","prediction","connection","visionaryy","electricall","observation",
 "dedication","motivation","transistor","reflective","energytics","dictionary","adrenaline","refreshing","conclusion","adventurex",
 "impression","background","presentation","distribution","thermonuke"
];

/* ---------- DOM SHORTCUTS ---------- */
const elWord = () => document.getElementById("word");
const elInput = () => document.getElementById("input");
const elScore = () => document.getElementById("score");
const elHigh = () => document.getElementById("highscore");
const elTime = () => document.getElementById("time");
const elDifficultySelect = () => document.getElementById("difficultySelect");
const elTimeSelect = () => document.getElementById("timeSelect");
const elGameArea = () => document.getElementById("gameArea");
const elPopup = () => document.getElementById("popup");
const elFinalScore = () => document.getElementById("finalScore");
const elFinalHigh = () => document.getElementById("finalHigh");

/* ---------- INIT HIGHSCORE ---------- */
function showInitialHigh() {
    if (elHigh()) elHigh().innerText = high_easy;
}
showInitialHigh();

/* ---------- LIST BASED ON DIFFICULTY ---------- */
function getListForDifficulty(dif) {
    if (dif === "easy") return words_easy.slice();
    if (dif === "medium") return words_medium.slice();
    return words_hard.slice();
}

/* ---------- NO-REPEAT WORD GENERATOR ---------- */
function pickRandomNoRepeat(dif) {
    let list = getListForDifficulty(dif);
    let available = list.filter(w => !usedWords.includes(w));

    if (available.length === 0) {
        usedWords = usedWords.filter(w => !list.includes(w));
        available = list.slice();
    }

    const idx = Math.floor(Math.random() * available.length);
    const chosen = available[idx];

    usedWords.push(chosen);
    return chosen;
}

/* ---------- SET DIFFICULTY ---------- */
function setDifficulty(dif) {
    soundClick.play();
    currentDifficulty = dif;

    if (dif === "easy") elHigh().innerText = high_easy;
    else if (dif === "medium") elHigh().innerText = high_medium;
    else elHigh().innerText = high_hard;

    elDifficultySelect().style.display = "none";
    elTimeSelect().style.display = "block";
}

/* ---------- START GAME ---------- */
function startGame(seconds) {
    soundClick.play();

    score = 0;
    timeLeft = seconds;
    usedWords = [];

    elScore().innerText = score;
    elTime().innerText = timeLeft;

    elTimeSelect().style.display = "none";
    elGameArea().style.display = "block";

    if (!inputListenerAttached) {
        inputListenerAttached = true;
        elInput().addEventListener("input", handleInput);
    }

    showNextWord();
    startTimer();
}

/* ---------- SHOW NEXT WORD ---------- */
function showNextWord() {
    const word = pickRandomNoRepeat(currentDifficulty);
    elWord().innerText = word;

    elWord().style.transform = "scale(1.15)";
    elWord().style.transition = "150ms";
    setTimeout(() => elWord().style.transform = "scale(1)", 150);
}

/* ---------- INPUT HANDLER (CASE-INSENSITIVE) ---------- */
function handleInput(e) {
    const typed = e.target.value.trim().toLowerCase();
    const target = elWord().innerText.toLowerCase();

    if (typed === target) {
        soundCorrect.play();
        score++;
        elScore().innerText = score;

        elScore().classList.remove("score-zoom");
        void elScore().offsetWidth;
        elScore().classList.add("score-zoom");

        e.target.value = "";

        if (currentDifficulty === "easy") {
            if (score > high_easy) {
                high_easy = score;
                localStorage.setItem("highscore_easy", high_easy);
                elHigh().innerText = high_easy;
            }
        } else if (currentDifficulty === "medium") {
            if (score > high_medium) {
                high_medium = score;
                localStorage.setItem("highscore_medium", high_medium);
                elHigh().innerText = high_medium;
            }
        } else {
            if (score > high_hard) {
                high_hard = score;
                localStorage.setItem("highscore_hard", high_hard);
                elHigh().innerText = high_hard;
            }
        }

        showNextWord();
    }
}

const resetBtn = document.getElementById("resetBtn");

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (confirm("Reset all scores?")) {
      localStorage.clear();
      location.reload();
    }
  });
}


/* ---------- TIMER ---------- */
function startTimer() {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        elTime().innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            onTimeOver();
        }
    }, 1000);
}

/* ---------- TIME OVER ---------- */
function onTimeOver() {
    soundTimeOver.play();

    const hs = currentDifficulty === "easy" ? high_easy :
               currentDifficulty === "medium" ? high_medium :
               high_hard;

    elFinalScore().innerText = score;
    elFinalHigh().innerText = hs;

    elPopup().style.display = "flex";
    elInput().disabled = true;
}

/* ---------- RESTART ---------- */
function restartGame() {
    soundClick.play();
    location.reload();
}

/* ---------- EXIT ---------- */
function exitGame() {
    soundClick.play();
    window.location.href = "index.html";
}

/* ---------- END ---------- */


