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


var referee = {
};


var players = {
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
        var a = document.createElement("div");
        var b = document.createElement("div");

        var p1h1 = a.appendChild(document.createElement("h1"));
        var p2h2 = b.appendChild(document.createElement("h1"));
        p1h1.textContent = this.players.p1.name;
        p2h2.textContent = this.players.p2.name;

        a.classList.add(".playerDiv", "p1Div");
        b.classList.add("playerDiv", "p2Div");

        this.playerSpace.appendChild(a);
        this.playerSpace.appendChild(b);
    },
    generate: function() {
        this.players.p1.name = prompt("Player1 Name: ", "Name...");
        this.players.p2.name = prompt("Player2 Name: ", "Name...");

        console.log(this.players);
        this.buildPlayerSpace();
    }
};


function gameGen() {
    board.generate();
    players.generate();
}

document.addEventListener(onload, gameGen());