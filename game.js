let words = [
"galaxy","future","coding","gaming","matrix","shadow","neon","energy",
"command","rocket","fusion","cyber","titan","random","system","python",
"keyboard","monitor","program","attack","hunter","dragon","cosmic","planet",
"charge","spark","vector","pixel","shader","speed","rapid","blast","switch",
"battle","savage","storm","electric","thunder","warrior","phantom","ghost",
"cyberpunk","ultimate","damnation","keyboard","reflex","powerful","mission"
];

let difficulty = "easy";
let score = 0;
let timeLeft = 0;
let timer;
let high = localStorage.getItem("highscore") || 0;

document.getElementById("highscore").innerText = high;

/* 🔊 SOUND EFFECTS */
const correctSound = new Audio("sounds/correct.mp3");
const timeSound = new Audio("sounds/timeover.mp3");
const clickSound = new Audio("sounds/click.mp3");

/* Make all buttons play click sound */
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => clickSound.play());
});


function setDifficulty(level) {
    difficulty = level;
    document.getElementById("difficultySelect").style.display = "none";
    document.getElementById("timeSelect").style.display = "block";
}

function startGame(t) {
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

function newWord() {
    let filtered = words.filter(w => {
        if (difficulty === "easy") return w.length <= 6;
        if (difficulty === "medium") return w.length <= 8;
        return w.length <= 10;
    });

    document.getElementById("word").innerText = 
        filtered[Math.floor(Math.random() * filtered.length)];
}

function checkWord() {
    let typed = document.getElementById("input").value;
    let target = document.getElementById("word").innerText;

    if (typed === target) {
        score++;
        document.getElementById("score").innerText = score;

        /* ⭐ SCORE ZOOM BURST ANIMATION */
        let s = document.getElementById("score");
        s.classList.remove("score-zoom");
        void s.offsetWidth;          // Re-trigger animation
        s.classList.add("score-zoom");

        /* PLAY CORRECT SOUND */
        correctSound.play();

        document.getElementById("input").value = "";
        newWord();

        if (score > high) {
            high = score;
            localStorage.setItem("highscore", high);
            document.getElementById("highscore").innerText = high;
        }
    }
}

function updateTime() {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
}

function endGame() {

    /* 🔊 TIME OVER SOUND */
    timeSound.play();

    document.getElementById("finalScore").innerText = score;
    document.getElementById("finalHigh").innerText = high;

    document.getElementById("popup").style.display = "flex";
}

function restartGame() {
    location.reload();
}
