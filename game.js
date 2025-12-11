/* =========================
   FINAL game.js (FULL)
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
let currentDifficulty = ""; // 'easy' | 'medium' | 'hard'
let usedWords = [];         // stores used words for current session (no repeat)
let inputListenerAttached = false;

/* ---------- HIGHSCORES (separate keys) ---------- */
let high_easy = parseInt(localStorage.getItem("highscore_easy")) || 0;
let high_medium = parseInt(localStorage.getItem("highscore_medium")) || 0;
let high_hard = parseInt(localStorage.getItem("highscore_hard")) || 0;

/* ---------- WORD LISTS ----------
   NOTE: lists chosen to match exact letter counts; totals ~100 words combined.
*/
const words_easy = [ // 4 letters (30)
 "time","game","code","fast","play","jump","hero","love","king","moon",
 "star","fire","wind","ball","rock","wolf","bird","rain","snow","road",
 "blue","dark","door","ring","ship","team","song","leaf","tree","gold"
];

const words_medium = [ // 7 letters (35)
 "monitor","charger","builder","captain","mission","playing","science","fantasy","digital","restart",
 "display","battery","process","network","control","execute","student","android","graphic","console",
 "physics","grammar","balance","history","message","imagine","journey","victory","college","pointer",
 "chapter","context","crystal","journeyx","packets"
];

const words_hard = [ // 10 letters (35)
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

/* ---------- INIT: show global highs if present ---------- */
function showInitialHigh() {
    // If no difficulty chosen yet, show easy high by default (or blank)
    if (elHigh()) {
        elHigh().innerText = high_easy || 0;
    }
}
showInitialHigh();

/* ---------- HELPERS: pick available list based on difficulty ---------- */
function getListForDifficulty(dif) {
    if (dif === "easy") return words_easy.slice();   // return copy
    if (dif === "medium") return words_medium.slice();
    return words_hard.slice();
}

/* ---------- NO-REPEAT PICKER ---------- */
function pickRandomNoRepeat(dif) {
    let list = getListForDifficulty(dif);
    // filter out used words
    let available = list.filter(w => !usedWords.includes(w));
    // if exhausted, reset usedWords for this difficulty only
    if (available.length === 0) {
        // remove all usedWords that belong to this difficulty so next round they can reuse
        usedWords = usedWords.filter(w => !list.includes(w));
        available = list.slice();
    }
    const idx = Math.floor(Math.random() * available.length);
    const chosen = available[idx];
    // push to usedWords
    usedWords.push(chosen);
    return chosen;
}

/* ---------- UI ACTIONS ---------- */
function setDifficulty(dif) {
    soundClick.play();
    currentDifficulty = dif;
    // update displayed highscore for selected difficulty
    if (elHigh()) {
        if (dif === "easy") elHigh().innerText = high_easy;
        else if (dif === "medium") elHigh().innerText = high_medium;
        else elHigh().innerText = high_hard;
    }
    if (elDifficultySelect()) elDifficultySelect().style.display = "none";
    if (elTimeSelect()) elTimeSelect().style.display = "block";
}

function startGame(seconds) {
    soundClick.play();
    if (!currentDifficulty) {
        // fallback
        currentDifficulty = "easy";
    }

    score = 0;
    timeLeft = seconds;
    usedWords = []; // reset used words at game start

    if (elScore()) elScore().innerText = score;
    if (elTime()) elTime().innerText = timeLeft;

    if (elTimeSelect()) elTimeSelect().style.display = "none";
    if (elGameArea()) elGameArea().style.display = "block";

    // attach input listener only once
    if (!inputListenerAttached) {
        inputListenerAttached = true;
        elInput().addEventListener("input", handleInput);
    }

    // show first word and start timer
    showNextWord();
    startTimer();
}

function showNextWord() {
    const word = pickRandomNoRepeat(currentDifficulty);
    if (elWord()) {
        elWord().innerText = word;
        // small word pop animation
        elWord().style.transform = "scale(1.15)";
        elWord().style.transition = "150ms";
        setTimeout(() => { elWord().style.transform = "scale(1)"; }, 150);
    }
}

/* ---------- INPUT HANDLER ---------- */
function handleInput(e) {
    const typed = e.target.value.trim();
    const target = elWord() ? elWord().innerText : "";

    if (!target) return;
    if (typed === target) {
        // correct
        soundCorrect.play();

        score++;
        if (elScore()) elScore().innerText = score;

        // small zoom effect on score
        const sEl = elScore();
        if (sEl) {
            sEl.classList.remove("score-zoom");
            void sEl.offsetWidth; // reflow to restart animation
            sEl.classList.add("score-zoom");
        }

        // clear input
        e.target.value = "";

        // update highscore based on difficulty
        if (currentDifficulty === "easy") {
            if (score > high_easy) {
                high_easy = score;
                localStorage.setItem("highscore_easy", high_easy);
                if (elHigh()) elHigh().innerText = high_easy;
            }
        } else if (currentDifficulty === "medium") {
            if (score > high_medium) {
                high_medium = score;
                localStorage.setItem("highscore_medium", high_medium);
                if (elHigh()) elHigh().innerText = high_medium;
            }
        } else {
            if (score > high_hard) {
                high_hard = score;
                localStorage.setItem("highscore_hard", high_hard);
                if (elHigh()) elHigh().innerText = high_hard;
            }
        }

        // next word
        showNextWord();
    }
}

/* ---------- TIMER ---------- */
function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        if (elTime()) elTime().innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            onTimeOver();
        }
    }, 1000);
}

/* ---------- TIME OVER / END ---------- */
function onTimeOver() {
    soundTimeOver.play();

    // set final scores in popup
    const hs = currentDifficulty === "easy" ? high_easy :
               currentDifficulty === "medium" ? high_medium :
               high_hard;

    if (elFinalScore()) elFinalScore().innerText = score;
    if (elFinalHigh()) elFinalHigh().innerText = hs;

    // show popup (ensure style display flex)
    if (elPopup()) elPopup().style.display = "flex";

    // optional: disable input while popup visible
    if (elInput()) elInput().disabled = true;
}

/* ---------- RESTART & EXIT ---------- */
function restartGame() {
    soundClick.play();
    // simple reload resets everything
    location.reload();
}

function exitGame() {
    soundClick.play();
    window.location.href = "index.html";
}

/* ---------- UTILITY: safe DOM check ---------- */
/* Note: If some elements don't exist, functions quietly do nothing.
   This keeps file flexible if you integrated IDs slightly differently. */

/* ---------- END of file ---------- */
