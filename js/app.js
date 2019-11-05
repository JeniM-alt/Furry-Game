var Furry = function () {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};

var Coin = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);

};


var Game = function () {
    var self = this;
    this.board = document.querySelectorAll("#board>div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    };


    this.startGame = setInterval(function () {
        self.moveFurry()
    }, 250);

    this.moveFurry = function () {
        this.hideVisibleFurry();
        var direction = this.furry.direction;
        if (direction === "right") {
            this.furry.x += 1;
        } else if (direction === "left") {
            this.furry.x -= 1;
        } else if (direction === "up") {
            this.furry.y -= 1;
        } else if (direction === "down") {
            this.furry.y += 1;
        }
        this.gameOver();
        this.showFurry();

        this.checkCoinCollision();

        document.addEventListener("keydown", function () {
            self.turnFurry(event);
        });

    };
    this.hideVisibleFurry = function () {
        var doubledFurry = document.querySelector(".furry");
        if (doubledFurry) {
            doubledFurry.classList.remove("furry");
        }

    };
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };
    this.checkCoinCollision = function () {
        if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin");
            this.score++;
            var scoreCounter = document.querySelector("#score strong");
            scoreCounter.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }

    };
    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.startGame);
            this.hideVisibleFurry();
            var over = document.getElementById("over");
            board.style.display = "none";
            over.style.display = "block";
            var button = over.querySelector("button");
            button.addEventListener("click", function () {
                location.reload();
            })


        }
    }

};


var startButton = document.querySelector("#start-btn");

startButton.addEventListener("click", function() {
    document.querySelector("#welcome").classList.add("invisible");
    document.querySelector("#score").classList.remove("invisible");
    document.querySelector("#board").classList.remove("invisible");
    var gameNew = new Game();
    gameNew.showFurry();
    gameNew.showCoin();
    gameNew.startGame;

});


