fs = require('fs')

const inputFile = fs.readFileSync('./day2/input.txt', 'utf-8');

const input = inputFile.split("\n").map(val => val.split(' '));

let x = 0, aim = 0, depth = 0;

for (let i = 0; i < input.length; i++) {
    let command = input[i][0];
    let value = parseInt(input[i][1])

    switch (command) {
        case 'down':
            aim += value;
            break;
        case 'up':
            aim -= value;
            break;
        case 'forward':
            depth += aim * value;
            x += value;

    }
}

console.log('x: ' + x);
console.log('depth: ' + depth);
console.log('output: ' + x * depth);



