let words = [
"galaxy","rhythm","quantum","neonlight","velocity","python","gaming","monitor",
"keyboard","reaction","tracking","hyperion","dominance","spectrum","digital",
"terminal","cyberwolf","flashback","overclock","settings","powerful","shooter",
"challenge","dominate","progress","infinite","accuracy","turbo","savage",
"phantom","network","virtual","systematic","frequency","eclipse","magnetic",
"electric","processor","gigabyte","warrior","guardian","element","oxygen",
"computer","software","hardware","interface","terminal","tracking","triple",
"maximum","variable","hexagon","ultimate","pressure","dynamic","hyper","matrix",
"gravity","magneto","turbozone","reactionx","firestorm","speedrun","typezone",
"alphamax","combuster","nightcore"
];

let difficulty = "easy";
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let timeLeft = 0;
let timer;

document.getElementById("highscore").innerText = highscore;

function setDifficulty(level) {
    difficulty = level;
    document.getElementById("difficultySelect").style.display = "none";
    document.getElementById("timeSelect").style.display = "block";
}

function startGame(seconds) {
    timeLeft = seconds;
    score = 0;

    document.getElementById("timeSelect").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    nextWord();
    startTimer();

    document.getElementById("input").focus();
}

function nextWord() {

    let filtered = words.filter(w => {
        if (difficulty === "easy") return w.length <= 6;
        if (difficulty === "medium") return w.length <= 8;
        if (difficulty === "hard") return w.length <= 10;
    });

    let random = filtered[Math.floor(Math.random() * filtered.length)];

    document.getElementById("word").innerText = random;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

document.getElementById("input").addEventListener("input", () => {
    let typed = document.getElementById("input").value;
    let current = document.getElementById("word").innerText;

    if (typed === current) {
        score++;
        document.getElementById("score").innerText = score;

        popup("+1 😎");
        document.getElementById("input").value = "";
        nextWord();
    }
});

function popup(text) {
    let box = document.getElementById("popup");
    box.innerText = text;
    setTimeout(() => box.innerText = "", 500);
}

function endGame() {
    popup("Game Over!");

    if (score > highscore) {
        localStorage.setItem("highscore", score);
    }

    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

function exitGame() {
    window.location.href = "games.html";
}
