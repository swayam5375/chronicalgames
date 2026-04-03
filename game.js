/* GLOBAL */
body {
    margin: 0;
    background: #000;
    color: #fff;
    font-family: Arial;

    min-height: 100vh;
    display: flex;
    flex-direction: column;

    animation: bgChange 6s infinite alternate;
}

/* BG animation */
@keyframes bgChange {
    0% { background-color: #000; }
    25% { background-color: #0a0014; }
    50% { background-color: #001032; }
    75% { background-color: #001a20; }
    100% { background-color: #000; }
}

/* 🔥 HEADER CENTERED */
header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    padding: 20px;
    background: linear-gradient(90deg, #111, #222, #111);
    border-bottom: 2px solid #0ff;
    box-shadow: 0 0 20px #0ff;
    flex-wrap: wrap;
}

.logo {
    font-size: 30px;
    color: #0ff;
    text-shadow: 0 0 10px #0ff;
}

/* NAVIGATION */
nav a {
    margin: 0 15px;
    color: #0ff;
    text-decoration: none;
    font-weight: bold;
}

nav a:hover {
    text-shadow: 0 0 10px #0ff;
}

/* HERO SECTION */
.hero {
    text-align: center;
    padding: 100px 20px;
}

.btn {
    background: #0ff;
    color: #000;
    padding: 20px 35px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
}

.btn:hover {
    box-shadow: 0 0 20px #0ff;
}

/* GAME UI */
.typing-container {
    text-align: center;
    margin-top: 60px;
}

/* POPUP */
.endPopup {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    display: none;
    justify-content: center;
    align-items: center;
}

.popupBox {
    background: #111;
    padding: 25px;
    border-radius: 10px;
    border: 2px solid #0ff;
    text-shadow: 0 0 10px #0ff;
}

/* Exit */
.exitBtn {
    margin-top: 10px;
    background: red;
    padding: 10px 20px;
    border-radius: 8px;
}

/* FOOTER */
footer {
    text-align: center;
    padding: 15px;
    margin-top: auto;
    color: #0ff;
    text-shadow: 0 0 8px #0ff;
    font-weight: bold;
}

/* Difficulty Buttons */
.options button {
    padding: 18px 35px;
    font-size: 22px;
    border-radius: 10px;
    margin: 10px;
    background: #0ff;
    color: #000;
    font-weight: bold;
    cursor: pointer;
}

.options button:hover {
    box-shadow: 0 0 20px #0ff;
}

/* Word Display */
#word {
    font-size: 45px;
    margin-bottom: 25px;
    text-shadow: 0 0 12px #0ff;
}

#input {
    font-size: 28px;
    padding: 15px;
    width: 350px;
    max-width: 90%;
    background: #fff;
    color: #000;
    border-radius: 8px;
    border: 2px solid #0ff;
}

/* SCORE ANIMATION */
.score-zoom {
    animation: zoomBurst 0.25s ease;
}

@keyframes zoomBurst {
    0% { transform: scale(1); }
    40% { transform: scale(1.4); }
    100% { transform: scale(1); }
}

/* ===================================
       🤖 AI BOT UI (NEW ADDITION)
   =================================== */

.ai-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    display: none;
    justify-content: center;
    align-items: center;
}

.ai-box {
    width: 520px;
    max-width: 95%;
    height: 520px;
    background: #111;
    border: 2px solid #0ff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 25px #0ff;
}

.ai-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #0ff;
    font-weight: bold;
    border-bottom: 1px solid #333;
}

/* Chat area */
.chat-box {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    text-align: left;
    font-size: 15px;
    line-height: 1.5;
}

/* Chat bubbles spacing */
.chat-box div {
    margin: 6px 0;
}

/* Input area */
.chat-input {
    display: flex;
    gap: 8px;
    padding: 10px;
    border-top: 1px solid #333;
}

.chat-input input {
    flex: 1;
    padding: 10px;
    font-size: 15px;
    border-radius: 6px;
    border: none;
}

.chat-input button {
    padding: 10px 15px;
    background: #0ff;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    font-weight: bold;
}

/* ===================================
       📱 RESPONSIVE FIX
   =================================== */
@media (max-width: 600px) {

    header {
        flex-direction: column;
        gap: 10px;
        padding: 15px;
    }

    .logo {
        font-size: 26px;
    }

    nav a {
        font-size: 18px;
    }

    #word {
        font-size: 32px;
    }

    #input {
        width: 80%;
        font-size: 22px;
    }

    .options button {
        width: 85%;
        font-size: 20px;
        padding: 14px;
    }

    .popupBox {
        width: 85%;
        padding: 18px;
    }

    footer {
        font-size: 14px;
        padding: 10px;
    }

    .ai-box {
        height: 90%;
    }
}
