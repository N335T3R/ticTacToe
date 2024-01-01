const body = document.querySelector("body");
const squares = [];
let e = MouseEvent;
function spyMouse(e) {
    console.log(squares.indexOf(e.target));
}



// function spyKey() {
//     window.addEventListener("keydown", (e) => {
//         console.log(e);
//     });
// }
// spyKey();

var users = {
    players: [],
    generate: function() {
        var p1Name = prompt("Player 1 | Name:", "Name...");
        var p2Name = prompt("Player 2 | Name:", "Name...");

        var p1 = {
            name: p1Name,
            value: "X",
            captures: []
        };
        var p2 = {
            name: p2Name,
            value: "O",
            captures: []
        };

        this.players.push(p1);
        this.players.push(p2);

        console.log(this.players);
    }
};

var referee = {
    playerSelection: "",
    p1Captures: [],
    p2Captures: [],
    positions: {
        0: {
            captured: 0
        },
        1: {
            captured: 0
        },
        2: {
            captured: 0
        },
        3: {
            captured: 0
        },
        4: {
            captured: 0
        },
        5: {
            captured: 0
        },
        6: {
            captured: 0
        },
        7: {
            captured: 0
        },
        8: {
            captured: 0
        }
    },
    counter: 0,
    winKeys: ["012", "036", "048", "147", "246", "258", "345", "678"],
    defKeys: [],
    evalCount: 0,
    currentPlayer: "",
    primes: [0, 1, 2, 3, 6],
    defendant: "",
    winState: 0,
    a1: [0, 1, 2],
    a2: [0, 3, 6],
    a3: [0, 4, 8],
    a4: [1, 4, 7],
    a5: [2, 4, 6],
    a6: [2, 4, 6],
    a7: [2, 5, 8],
    a8: [6, 7, 8],
    turnInit: function() {
        this.counter++;

        this.trackTurn();
        board.trackMark();

        console.log(board.marker);
        console.log(this.currentPlayer); 

        this.listen();
    },
    listen: function() {
        this.playerSelection = "";

        console.log(this.currentPlayer + ", it is your turn. Select a space to capture.");
        console.log("Click a space to select.");

        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener("mouseover", spyMouse);
        }

        squares.forEach(() => {
            addEventListener("click", function trackClick(e) {
                //stops event from firing > once
                e.stopImmediatePropagation();
                console.log(referee.playerSelection);

                if (referee.positions[squares.indexOf(e.target)].captured > 0) {
                        console.log("You cannot capture a captured space. Try again.");
                    } else {
                        this.removeEventListener("mouseover", referee.listen);
                        this.removeEventListener("click", referee.listen);
                        referee.playerSelection = squares.indexOf(e.target);
        
                        referee.confirmSelection();
                    }
            }, { once: true });
        });
    },
    confirmSelection: function() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener("mouseover", spyMouse);
        }
        
        console.log(this.currentPlayer + ", are you sure you want to capture this space?");
        console.log("Press 'ENTER' for accept.");
        console.log("Press 'backspace' to deselect this space.");
        console.log(this.playerSelection);

        window.addEventListener("keydown", (e) => {
            var key = e.key;

            switch(key) {
                case "Backspace":
                    this.listen();
                    break;
                case "Enter":
                    this.logCapture();
                    break;
            }
        }, { once: true });

    },
    logCapture: function() {
        console.log("You have captured this space!");
        console.log(this.playerSelection);


        console.log(this.positions);

        if (this.counter % 2 !== 0) {
            users.players[0].captures.push(this.playerSelection);
            this.p1Captures.push(this.playerSelection);
        } else {
            users.players[1].captures.push(this.playerSelection);
            this.p2Captures.push(this.playerSelection);
        }
        console.log(users.players);

        this.evaluate();
    },
    evaluate: function() {
        var defCaptures = [];
        var defPrimes = [];
        var proofs = [];

        if (this.evalCount !== 1) {
            this.defendant = users.players[0];
            defCaptures = [...this.p1Captures];
        }
        else {
            this.defendant = users.players[1];
            defCaptures = [...this.p2Captures];
        }

        console.log(this.defendant);
        console.log(defCaptures);
        

        // populates defPrimes[]
        for (let i = 0; i < this.primes.length; i++) {
            for (let j = 0; j < defCaptures.length; j++) {
                let confirmPrime;

                if (this.primes[i] == defCaptures[j]) {
                    confirmPrime = defCaptures[j];
                    defPrimes.push(confirmPrime);
                }
            }
        }
        console.log(defPrimes);

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // !!!!!!!EVERYTHING UP TO THIS POINT WORKS!!!!!!!
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        for (let i = 0; i < this.winKeys.length; i++) {
            let winArray = [];
            let key = this.winKeys[i];
            let results = [];

            winArray.push(parseInt(key.slice(0, 1)));
            winArray.push(parseInt(key.slice(1, 2)));
            winArray.push(parseInt(key.slice(2, 3)));

            for (let j = 0; j < winArray.length; j++) {
                results.push(defCaptures.includes(winArray[j]));
                console.log(winArray[j]);
            }

            if (results.includes('false') == false) {
                this.winState = 1;}
            else {
                this.winState = 0;}

            console.log(defCaptures);
            console.log(results);
            console.log(winArray);
                console.log(this.winState);
            proofs.push(results);
        }

        if (this.winState == 1) {
            this.delcareWin();
        } else if (this.evalCount <= 1 && this.winState !== 1) {
            this.evalCount++;
            this.evaluate();
        } else if (this.evalCount > 1 && this.winState !== 1) {
            this.turnInit();
        }
    },
    trackTurn: function() {
        if (this.counter % 2 !== 0) this.currentPlayer = users.players[0].name;
        else this.currentPlayer = users.players[1].name;
    },
    delcareWin: function() {
        console.log(this.defendant + " has won! Congratulations!");
    }
};

var board = {
    pos: 0,
    tokens: ["X", "O"],
    marker: "",
    boardSpace: document.getElementById("boardSpace"),
    rows: [],
    makeSquares: function() {
        for (let i = 0; i < 9; i++) {
            var div = document.createElement('div');
            div.classList.add("sqr");
            squares.push(div);
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


        for (let i = 0; i < squares.length; i++) {
            if (i < 3) {
                a.appendChild(squares[i]);
            } else if (i == 3 || i < 6) {
                b.appendChild(squares[i]);
            } else {
                c.appendChild(squares[i]);
            }
        }

        this.rows.push(c, b, a);
    },
    trackMark: function() {
        if (referee.counter % 2 !== 0) this.marker = this.tokens[0];
        else this.marker = this.tokens[1];
    },
    generate: function() {
        this.makeSquares();
        this.makeRows();
    }
};


function gameGen() {
    board.generate();
    users.generate();
    referee.turnInit();
}
gameGen();