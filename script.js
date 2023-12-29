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
    refTalk: document.querySelector(".refTalk"),
    
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


function gameGen() {
    var refSpace = document.querySelector(".ref");
    refSpace.classList.add("refSpace");

    board.generate();
    players.generate();
}

document.addEventListener(onload, gameGen());