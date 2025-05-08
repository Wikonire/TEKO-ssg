var myGamePiece;
var myScore;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 240, 135);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    document.addEventListener("keydown", keyMove);
    document.addEventListener("keyup", stopMove);
    setInterval(updateGameArea, 20);
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function () {
        const ctx = myGameArea.context;
        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText("SCORE: 0", this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    myScore.update();
}

// Bewegungsfunktionen
function moveup() {
    myGamePiece.speedY = -1;
    myGamePiece.speedX = 0;
}
function movedown() {
    myGamePiece.speedY = 1;
    myGamePiece.speedX = 0;
}
function moveleft() {
    myGamePiece.speedX = -1;
    myGamePiece.speedY = 0;
}
function moveright() {
    myGamePiece.speedX = 1;
    myGamePiece.speedY = 0;
}
function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function keyMove(e) {
    switch (e.key) {
        case "ArrowUp":
        case "w":
            moveup();
            break;
        case "ArrowDown":
        case "s":
            movedown();
            break;
        case "ArrowLeft":
        case "a":
            moveleft();
            break;
        case "ArrowRight":
        case "d":
            moveright();
            break;
    }
}

