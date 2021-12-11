fs = require('fs')



const parseInput = (input) => {
    let matrix = [];

    for (let i=0;i<input.length;i++) {
        let line = input[i].split('').map((val) => parseInt(val));
        matrix.push(line);
    }
    return matrix;
}


const process = (matrix, y, x, alreadyFlashed) =>  {
    if (y >= 0 && y < matrix[0].length && x >= 0 && x < matrix.length) {
        if (matrix[y][x] === 9) {
            matrix[y][x] = 0;
            alreadyFlashed[y][x] = true;
            for (let yy = y - 1; yy <= y + 1; yy++) {
                for (let xx = x - 1; xx <= x + 1; xx++) {
                    process(matrix, yy, xx, alreadyFlashed);
                }
            }
            flashes++;
        } else if (!alreadyFlashed[y][x]) {
            matrix[y][x]++;
        }
    }
}


const step = (matrix) => {

    const alreadyFlashed = {};
    for (let i = 0; i < matrix.length; i++) {
        alreadyFlashed[i] = {};
    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            process(matrix, y, x, alreadyFlashed);
        }
    }
}


const text = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
let input = text.split('\n');
let matrix = parseInput(input);

let flashes = 0;
for (let s = 0; s < 100; s++) {
    step(matrix);
}

console.log(flashes);
