fs = require('fs')

const inputFile = fs.readFileSync('./day3/input.txt', 'utf-8');

const input = inputFile.split("\n");

const test = input.map (line => {
    line
})

let lengte = input.length
console.log('Length : ' + lengte)
const first = input.map((line) => line[0]).join('')

let values = []
for (let a=0; a < input[0].length; a++) {
    values.push(input.map((line) => line[a]).join(''))
}

console.log(values);

let gamma = '', epsilon = ''
for (let j=0; j < values.length; j++) {
    let sum = 0
    for (let i=0;i<values[j].length;i++) {
        sum += parseInt(values[j][i]);
    }
    if (sum > lengte/2) {
        gamma += '1'
        epsilon += '0'
    } else {
        gamma += '0'
        epsilon += '1'
    }
}


console.log(gamma);
console.log(epsilon);

console.log(parseInt(gamma, 2));
console.log(parseInt(epsilon, 2));

console.log('Result: ' + parseInt(gamma, 2) * parseInt(epsilon, 2))
