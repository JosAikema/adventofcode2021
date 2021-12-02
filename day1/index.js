fs = require('fs')

const inputFile = fs.readFileSync('./day1/input.txt', 'utf-8');

const input = inputFile.split("\n").map((val) => parseInt(val));

let inc1 = 0, inc2 = 0

for (let i = 1; i < input.length; i++) {

    if (input[i] > input[i - 1]) {
        inc1++;
    }
    if (input[i] + input[i+1] + input[i+2] > input[i - 1] + input[i] + input[i+1]) {
        inc2++;
    }
}

console.log('Increases part 1: ' + inc1);
console.log('Increases part 2: ' + inc2);

