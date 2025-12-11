// ===================== GLOBALS =====================
let score = 0;
let timeLeft = 0;
let timer;
let currentDifficulty = "";

// Highscores — separate for each difficulty
let highscore_easy = parseInt(localStorage.getItem("highscore_easy")) || 0;
let highscore_medium = parseInt(localStorage.getItem("highscore_medium")) || 0;
let highscore_hard = parseInt(localStorage.getItem("highscore_hard")) || 0;

// ===================== SOUND SETUP =====================
const soundCorrect = new Audio("sounds/correct.wav");
const soundClick = new Audio("sounds/click.wav");
const soundTimeOver = new Audio("sounds/timeover.wav");

// ===================== WORD FILTER LOGIC =====================
function generateWordList(difficulty) {
    const words = [
        "time","game","code","fast","jump","play","hero","love","math","king",
        "speed","laptop","charger","python","monitor","science","random","reactjs",
        "keyboard","developer","computers","chocolate","university","interface"
    ];

    if (difficulty === "easy") {
        return words.filter(w => w.length === 4);
    } else if (difficulty === "medium") {
        return words.filter(w => w.length === 7);
    } else {
        return words.filter(w => w.length === 10);
    }
}

// ===================== ON DIFFICULTY SELECT =====================
function setDifficulty(dif) {
    soundClick.play();
    currentDifficulty = dif;

    if (dif === "easy") {
        document.getElementById("highscore").innerText = highscore_easy;
    } else if (dif === "medium") {
        document.getElementById("highscore").innerText = highscore_medium;
    } else {
        document.getElementById("highscore").innerText = highscore_hard;
    }

    document.getElementById("difficultySelect").style.display = "none";
    document.getElementById("timeSelect").style.display = "block";
}

// ===================== START GAME =====================
function startGame(seconds) {
    soundClick.play();

    timeLeft = seconds;
    score = 0;

    document.getElementById("time").innerText = timeLeft;
    document.getElementById("score").innerText = score;

    document.getElementById("timeSelect").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    newWord();
    startTimer();
}

// ===================== GENERATE NEW WORD =====================
function newWord() {
    const list = generateWordList(currentDifficulty);
    const randomWord = list[Math.floor(Math.random() * list.length)];

    const wordElement = document.getElementById("word");
    wordElement.innerText = randomWord;

    wordElement.style.transform = "scale(1.2)";
    setTimeout(() => { wordElement.style.transform = "scale(1)"; }, 150);
}

// ===================== TIMER =====================
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

// ===================== INPUT CHECK =====================
document.getElementById("input").addEventListener("input", function() {
    const typed = this.value.trim();
    const word = document.getElementById("word").innerText;

    if (typed === word) {
        soundCorrect.play();
        score++;
        document.getElementById("score").innerText = score;
        this.value = "";

        updateHighscore();
        newWord();
    }
});

// ===================== HIGHSCORE UPDATE =====================
function updateHighscore() {
    if (currentDifficulty === "easy") {
        if (score > highscore_easy) {
            highscore_easy = score;
            localStorage.setItem("highscore_easy", highscore_easy);
        }
        document.getElementById("highscore").innerText = highscore_easy;
    }

    else if (currentDifficulty === "medium") {
        if (score > highscore_medium) {
            highscore_medium = score;
            localStorage.setItem("highscore_medium", highscore_medium);
        }
        document.getElementById("highscore").innerText = highscore_medium;
    }

    else {
        if (score > highscore_hard) {
            highscore_hard = score;
            localStorage.setItem("highscore_hard", highscore_hard);
        }
        document.getElementById("highscore").innerText = highscore_hard;
    }
}

// ===================== END GAME (POPUP) =====================
function endGame() {
    soundTimeOver.play();

    let highScoreDisplay =
        currentDifficulty === "easy" ? highscore_easy :
        currentDifficulty === "medium" ? highscore_medium :
        highscore_hard;

    document.getElementById("gameArea").innerHTML = `
        <h2>⏳ Time Over!</h2>
        <p>Your Score: <b>${score}</b></p>
        <p>Highest Score: <b>${highScoreDisplay}</b></p><br>
        
        <button onclick="location.reload()">🔁 Restart</button><br><br>
        <button onclick="window.location.href='index.html'">🏠 Exit to Home</button>
    `;
}
