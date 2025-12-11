let words = {
    easy: ["cat", "dog", "sun", "ball", "tree", "milk", "fish"],
    medium: ["planet", "yellow", "orange", "mobile", "school", "garden"],
    hard: ["javascript", "chronical", "algorithm", "computer", "frequency"]
};

let currentDifficulty = "easy";
let score = 0;
let highscore = localStorage.getItem("fast_highscore") || 0;
document.getElementById("highscore").innerText = highscore;
let timeLeft = 0;
let timer;
let currentWord = "";

function setDifficulty(level) {
    currentDifficulty = level;
    document.getElementById("difficultySelect").style.display = "none";
    document.getElementById("timeSelect").style.display = "block";
}

function startGame(seconds) {
    timeLeft = seconds;
    score = 0;

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = timeLeft;

    document.getElementById("timeSelect").style.display = "none";
    document.getElementById("gameArea").style.display = "block";

    nextWord();

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    document.getElementById("input").addEventListener("input", checkInput);
}

function nextWord() {
    let list = words[currentDifficulty];
    currentWord = list[Math.floor(Math.random() * list.length)];
    document.getElementById("word").innerText = currentWord;
    document.getElementById("input").value = "";
}

function checkInput() {
    let typed = document.getElementById("input").value;

    if (typed === currentWord) {
        score++;
        document.getElementById("score").innerText = score;

        showPopup("+1");
        nextWord();
    }
}

function endGame() {
    alert("⏳ Time's Up!\nYour Score: " + score);

    if (score > highscore) {
        highscore = score;
        localStorage.setItem("fast_highscore", highscore);
        document.getElementById("highscore").innerText = highscore;
        alert("🏆 NEW HIGH SCORE!");
    }

    location.reload();
}

function showPopup(text) {
    let popup = document.getElementById("popup");
    popup.innerText = text;
    popup.classList.add("popup");
    setTimeout(() => {
        popup.classList.remove("popup");
        popup.innerText = "";
    }, 500);
}
