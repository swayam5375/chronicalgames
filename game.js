/* ------------------ SOUND FILES ------------------ */
let soundCorrect = new Audio("sounds/correct.wav");
let soundClick = new Audio("sounds/click.wav");
let soundTimeOver = new Audio("sounds/timeover.wav");

/* ------------------ WORD LIST ------------------ */
let words = [
"galaxy","future","coding","gaming","matrix","shadow","neon","energy",
"command","rocket","fusion","cyber","titan","random","system","python",
"keyboard","monitor","program","attack","hunter","dragon","cosmic","planet",
"charge","spark","vector","pixel","shader","speed","rapid","blast","switch",
"battle","savage","storm","electric","thunder","warrior","phantom","ghost",
"cyberpunk","ultimate","damnation","keyboard","reflex","powerful","mission"
];

/* ------------------ GAME VARIABLES ------------------ */
let difficulty = "easy";
let score = 0;
let timeLeft = 0;
let timer;
let high = localStorage.getItem("highscore") || 0;

document.getElementById("highscore").innerText = high;

/* ------------------ DIFFICULTY SELECT ------------------ */
function setDifficulty(level) {
    soundClick.play();                // 🔊 click
    difficulty = level;

    document.getElementById("difficultySelect").style.display = "none";
    document.getElementById("timeSelect").style.display = "block";
}

/* ------------------ TIME SELECT + START GAME ------------------ */
function startGame(t) {
    soundClick.play();                // 🔊 click

    timeLeft = t;
    score = 0;

    document.getElementById("score").innerText = 0;
    document.getElementById("time").innerText = t;

    document.getElementById("timeSelect").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    newWord();
    timer = setInterval(updateTime, 1000);

    document.getElementById("input").addEventListener("input", checkWord);
}

/* ------------------ NEW WORD ------------------ */
function newWord() {

    let filtered = words.filter(w => {
        if (difficulty === "easy") return w.length <= 6;
        if (difficulty === "medium") return w.length <= 8;
        return w.length <= 10;
    });

    let random = filtered[Math.floor(Math.random() * filtered.length)];

    let wordBox = document.getElementById("word");
    wordBox.innerText = random;

    // 🔥 ZOOM animation on every new word
    wordBox.style.transform = "scale(1.3)";
    wordBox.style.transition = "0.15s";
    setTimeout(() => {
        wordBox.style.transform = "scale(1)";
    }, 150);
}

/* ------------------ CHECK TYPED WORD ------------------ */
function checkWord() {
    let typed = document.getElementById("input").value;
    let target = document.getElementById("word").innerText;

    if (typed === target) {
        soundCorrect.play();             // 🔊 tik sound
        
        score++;
        document.getElementById("score").innerText = score;
        document.getElementById("input").value = "";

        newWord();

        if (score > high) {
            high = score;
            localStorage.setItem("highscore", high);
            document.getElementById("highscore").innerText = high;
        }
    }
}

/* ------------------ TIMER ------------------ */
function updateTime() {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
}

/* ------------------ GAME OVER / POPUP ------------------ */
function endGame() {
    soundTimeOver.play();         // 🔊 time over buzzer

    document.getElementById("finalScore").innerText = score;
    document.getElementById("finalHigh").innerText = high;

    document.getElementById("popup").style.display = "flex";
}

/* ------------------ RESTART ------------------ */
function restartGame() {
    soundClick.play();
    location.reload();
}
