fs = require('fs')

const text = fs.readFileSync('./day9/input.txt', 'utf-8')
let input = text.split('\n');

let lines = [];
for (let i=0;i<input.length;i++) {
    let line = input[i].split('').map(val => parseInt(val));
    lines.push(line);
}

let lowest = [];

const findLowest = (lines) => {
    let lowest = [];
    for (let x=0;x<lines.length;x++) {
        for (let y = 0; y < lines[x].length; y++) {
            let point = lines[x][y];
            let north = true;
            let east = true;
            let south = true;
            let west = true;
            if (x != 0) north = input[x-1][y] > point;
            if (y != lines[x].length - 1) east = lines[x][y+1] > point;
            if (x != lines.length - 1) south = lines[x+1][y] > point;
            if (y != 0) west = input[x][y-1] > point;
            if (north && east && south && west) {
                lowest.push(point+1);
            }
        }
    }
    return lowest;
}

lowest = findLowest(lines);

console.log('Total risk: ' + lowest.reduce((a,b) => a+b))