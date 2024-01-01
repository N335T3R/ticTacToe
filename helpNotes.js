keys = ["012", "036", "048", "147", "246", "258", "345", "678"];
myArray = [7, 8, 6];
let proof = [];

function test(myArray, keys) {
    let testString;

    myArray.sort(function(a, b){return a-b});
    testString = myArray.join("");
    console.log(testString);

    for (let i = 0; i < keys.length; i++) {
        TF = keys[i] == testString;
        proof.push(TF);
    }

    console.log(proof);
}
test();