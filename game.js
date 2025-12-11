
const words = [
"speed", "gaming", "chronical", "rgb", "keyboard", "power", "flash",
"hyper", "coding", "swayam", "beast", "focus"
];
let score = 0;
let time = 30;
let currentWord = "";


const wordDisplay = document.getElementById("word");
inp = document.getElementById("input");


function newWord() {
currentWord = words[Math.floor(Math.random() * words.length)];
wordDisplay.textContent = currentWord;
}
newWord();


inp.addEventListener("input", () => {
if (inp.value === currentWord) {
score++;
document.getElementById("score").textContent = `Score: ${score}`;
inp.value = "";
newWord();
}
});


setInterval(() => {
if (time > 0) {
time--;
document.getElementById("time").textContent = `Time: ${time}`;
}
}, 1000);

