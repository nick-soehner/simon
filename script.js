// setup buttons
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const score = document.getElementById("score");
const start = document.getElementById("start");

// variables
let order = [];
let playerOrder = [];
let flash;
let turn;
let correct;
let compTurn;
let intervalId;
let noise = true;
let on = false;
let win;

// flash

// eventlisteners
start.addEventListener("click", (event) => {
    if (score.innerHTML == "") {
        on = true;
        start.style.backgroundColor = "#00ff44";
        play();
    } else {
        score.innerHTML = "";
        on = false;
        start.style.backgroundColor = "red";
        clearColor();
        clearInterval(intervalId);
    }
});

green.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

red.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

yellow.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

blue.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

// logic

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    score.innerHTML = 1;
    correct = true;

    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

const one = () => {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    green.style.backgroundColor = "#40ff5c";
};

const two = () => {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    red.style.backgroundColor = "#ff3853";
};

const three = () => {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    yellow.style.backgroundColor = "#fffa69";
};

const four = () => {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    blue.style.backgroundColor = "#6973ff";
};

const clearColor = () => {
    green.style.backgroundColor = "green";
    red.style.backgroundColor = "red";
    yellow.style.backgroundColor = "yellow";
    blue.style.backgroundColor = "blue";
};

const flashColor = () => {
    green.style.backgroundColor = "#40ff5c";
    red.style.backgroundColor = "#ff3853";
    yellow.style.backgroundColor = "#fffa69";
    blue.style.backgroundColor = "#6973ff";
};

const check = () => {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
        correct = false;
    }

    if (playerOrder.length == 20 && correct) {
        winGame();
    }

    if (correct == false) {
        flashColor();
        score.innerHTML = "NO!";
        setTimeout(() => {
            play();
        }, 1000);

        noise = false;
    }
    if (turn == playerOrder.length && correct && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        setTimeout(setScore, 500);
        intervalId = setInterval(gameTurn, 800);
    }
};

const winGame = () => {
    flashColor();
    score.innerHTML = "WIN!";
    on = false;
    win = true;
    setTimeout(play, 3000);
};

const setScore = () => {
    score.innerHTML = turn;
};
