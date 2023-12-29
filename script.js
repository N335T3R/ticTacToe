const body = document.querySelector("body");


var board = {
    boardSpace: document.querySelector(".boardSpace"),
    squares: [],
    rows: [],
    makeSquares: function() {
        for (let i = 0; i < 9; i++) {
            var div = document.createElement('div');

            if (i == 0 || i % 2 == 0) {
                div.classList.add('lSqr');
            } else {
                div.classList.add('dSqr');
            }

            this.squares.push(div);
        }
    },
    makeRows: function() {
        var c = document.createElement('div');
        var b = document.createElement('div');
        var a = document.createElement('div');

        c.classList.add('row');
        this.boardSpace.appendChild(c);
        b.classList.add('row');
        this.boardSpace.appendChild(b);
        a.classList.add('row');
        this.boardSpace.appendChild(a);


        for (let i = 0; i < this.squares.length; i++) {
            if (i < 3) {
                a.appendChild(this.squares[i]);
            } else if (i == 3 || i < 6) {
                b.appendChild(this.squares[i]);
            } else {
                c.appendChild(this.squares[i]);
            }
        }

        this.rows.push(c, b, a);
    },
    generate: function() {
        this.makeSquares();
        this.makeRows();
    }
};

var players = {
    pieces: {
        p1: [],
        p2: [],
    },
    playerSpace: document.querySelector(".playerSpace"),
    players: {
        p1: {
            name: "",
            value: "X"
        },
        p2: {
            name: "",
            value: "O"
        }
    },
    buildPlayerSpace: function() {
        //Places PlaySpaces & sets player names
        var playSpace1 = document.createElement("div");
        var playSpace2 = document.createElement("div");

        var p1h1 = playSpace1.appendChild(document.createElement("h1"));
        var p2h2 = playSpace2.appendChild(document.createElement("h1"));
        p1h1.textContent = this.players.p1.name;
        p2h2.textContent = this.players.p2.name;

        playSpace1.classList.add("playerDiv", "p1Div");
        playSpace2.classList.add("playerDiv", "p2Div");

        this.playerSpace.appendChild(playSpace1);
        this.playerSpace.appendChild(playSpace2);


        //places Markers
        p1MSpace = document.createElement("div");
        p1MSpace.classList.add("markerSpace");
        playSpace1.appendChild(p1MSpace);
        p2MSpace = document.createElement("div");
        p2MSpace.classList.add("markerSpace");
        playSpace2.appendChild(p2MSpace);

        for (i = 0; i < 12; i++) {
            if (i < 6) {
                var marker = document.createElement("div");
                marker.classList.add("marker", "p1Marker");
                marker.textContent = this.players.p1.value;
                this.pieces.p1.push(marker);
            } else {
                var marker = document.createElement("div");
                marker.classList.add("marker", "p2Marker");
                marker.textContent = this.players.p2.value;
                this.pieces.p2.push(marker);
            }
        }

        this.pieces.p1.forEach((piece) => {
            p1MSpace.appendChild(piece);
        });
        this.pieces.p2.forEach((piece) => {
            p2MSpace.appendChild(piece);
        })
    },
    generate: function() {
        this.players.p1.name = prompt("Player1 Name: ", "Name...");
        this.players.p2.name = prompt("Player2 Name: ", "Name...");

        this.buildPlayerSpace();
    }
};


var referee = {
    counter: 0,
    selectSqr: 0,
    refTalk: document.querySelector(".refTalk"),
    prompts: {
        p1Turn: {
            message: "Player 1: Use the arrow keys to move. Press 'ENTER' to select."
        }, p2Turn: {
            message: "Player 2: Use the arrow keys to move. Press 'ENTER' to select."
        }, p1Confirm: {
            message: "Player 1: Press 'ENTER' to confirm or 'BKSPC' to deselect."
        }, p2Confirm: {
            message: "Player 2: Press 'ENTER' to confirm or 'BKSPC' to deselect."
        }, p1Win: {
            message: "Player 1 wins! Congratulations!"
        }, p2Win: {
            message: "Player 2 wins! Congratulations!"
        }
    },
    takeTurn: function() {
        this.counter++;
        this.selectSqr = 0;
        
        if (this.counter % 2 !== 0) {
            this.refTalk.textContent = this.prompts.p1Turn.message;
        } else {
            this.refTalk.textContent = this.prompts.p2Turn.message;
        }

        board.squares[this.selectSqr].classList.add('selectSqr');

        this.changeSqr();
    },
    changeSqr: function() {
        window.addEventListener('keydown', (e) => {
            var key = e.key;
            console.log(key);

            if (this.counter % 2 !== 0) {
                this.refTalk.textContent = this.prompts.p1Turn.message;
            } else {
                this.refTalk.textContent = this.prompts.p2Turn.message;
            }

            switch(key) {
                case "ArrowUp":
                    if (this.selectSqr !== 6 && this.selectSqr !== 7 && this.selectSqr !== 8){
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr + 3;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    } else if (this.selectSqr == 6 || this.selectSqr == 7 || this.selectSqr == 8) {
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr - 6;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    }
                    break;
                case "ArrowRight":
                    if (this.selectSqr !== 2 && this.selectSqr !== 5 && this.selectSqr !== 8){
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr + 1;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    } else if (this.selectSqr == 2 || this.selectSqr == 5 || this.selectSqr == 8) {
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr - 2;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    }
                    break;
                case "ArrowDown":
                    if (this.selectSqr !== 0 && this.selectSqr !== 1 && this.selectSqr !== 2){
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr - 3;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    } else if (this.selectSqr == 0 || this.selectSqr == 1 || this.selectSqr == 2) {
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr + 6;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    }
                    break;
                case "ArrowLeft":
                    if (this.selectSqr !== 0 && this.selectSqr !== 3 && this.selectSqr !== 6){
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr - 1;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    } else if (this.selectSqr == 0 || this.selectSqr == 3 || this.selectSqr == 6) {
                        board.squares[this.selectSqr].classList.remove("selectSqr");
                        this.selectSqr = this.selectSqr + 2;
                        board.squares[this.selectSqr].classList.add("selectSqr");
                    }
                    break;
                case "Enter":
                    this.confirmSqr();
                    break;
            }
        });
    },
    confirmSqr: function() {
        if (this.counter % 2 !== 0) this.refTalk.textContent = this.prompts.p1Confirm.message;
        else this.refTalk.textContent = this.prompts.p2Confirm.message;
    

        window.addEventListener("keydown", (e) => {
            var key = e.key;

            switch(key) {
                case "Enter":
                    if (this.counter % 2 !== 0) {
                        p = document.createElement("p");
                        p.textContent = players.players.p1.value;

                        p.classList.add("pp");
                        board.squares[this.selectSqr].classList.add("p1Sqr");
                        board.squares[this.selectSqr].appendChild(p);
                    } else {
                        p = document.createElement("p");
                        p.textContent = players.players.p2.value;

                        p.classList.add("pp");
                        board.squares[this.selectSqr].classList.add("p2Sqr");
                        board.squares[this.selectSqr].appendChild(p);
                    }
                    this.takeTurn();
                    break;
                case "Backspace":
                    this.changeSqr();
                    break;
            }
        });
    }
};





function gameGen() {
    var refSpace = document.querySelector(".ref");
    refSpace.classList.add("refSpace");

    board.generate();
    players.generate();

    referee.takeTurn();
}

document.addEventListener(onload, gameGen());