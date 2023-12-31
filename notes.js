let x;
let y;
let z;
let n;

let nar = [];
let results = [];
let multiResults = [];

let x0 = [];
let calcs0 = [];
let x1 = [];
let x2 = [];
let calcs2 = [];
let x3 = [];
let x6 = [];

switch(x) {
    case x = 0:
        nar = [1, 3, 4];

        for (let i = 0; i < nar.length; i++) {
            calcs0.push(x);
            y = nar[i] + x;
            calcs0.push(y);
            z = y * 2;
            calcs0.push(z);    

            x0.push(calcs0);

            for (let j = calcs0.lengths; j > 0; j = calcs0.length) {
                calcs0.shift();
            } 
        }

        multiResults.push(x0);
        break;
    case x = 1:
        n = 3;

        x1.push(x);
        y = n + x;
        x1.push(y);
        z = y + n;
        x1.push(z);

        results.push(x1);
        break;
    case x = 2:
        nar = [2, 3];

        for (let i = 0; i < n.length; i++) {
            calcs2.push(x);
            y = nar[i] + x;
            calcs2.push(y);
            z = y + nar[i];
            calcs2.push(z);

            x2.push(calcs2);
            for (let j = calcs2.lengths; j > 0; j = calcs2.length) {
                calcs2.shift();
            } 
        }

        multiResults.push(x2);
        break;
    case x = 3:
        n = 1;

        x3.push(x);
        y = nar[i] + x;
        x3.push(y);
        z = y * n;
        x3.push(z);

        results.push(x3);
        break;
    case x = 6:
        n = 1;

        x6.push(x);
        y = n + x;
        x6.push(y);
        z = n + y;
        x6.push(z);

        results.push(x6);
        break;
}

console.log(results);
console.log(multiResults);