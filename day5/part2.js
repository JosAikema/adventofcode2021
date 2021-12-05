



const create2DArray = (width, height, initialValue = null) => {
    let array = new Array(height);
    for (let y = 0; y < height; y++) {
        array[y] = new Array(width);
        for (let x = 0; x < width; x++) {
            let value = initialValue;
            if (typeof initialValue === 'function') value = initialValue(x, y);
            if (Array.isArray(initialValue)) value = [...initialValue];
            array[y][x] = value;
        }
    }
    return array;
}

const parseInput = (input) => {
    let lines = []
    let max_x = 0;
    let max_y = 0;
    for (let i=0; i<input.length;i++) {
        let parts = input[i].split(' -> ');
        let c1 = parts[0].split(',');
        let c1_x = parseInt(c1[0]);
        let c1_y = parseInt(c1[1]);
        let c2 = parts[1].split(',');
        let c2_x = parseInt(c2[0]);
        let c2_y = parseInt(c2[1]);
        max_x = Math.max(max_x,c1_x, c2_x);
        max_y = Math.max(max_y,c1_y, c2_y);
        lines.push([parts[0].split(',').map(val => parseInt(val)), parts[1].split(',').map(val => parseInt(val))]);
    }
    return {lines, max_x, max_y};
}

const processLines = (field) => {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i][0][0] === lines[i][1][0]) {
            let x1 = Math.min(lines[i][0][0], lines[i][1][0]);
            let y1 = Math.min(lines[i][0][1], lines[i][1][1]);
            let x2 = Math.max(lines[i][0][0], lines[i][1][0]);
            let y2 = Math.max(lines[i][0][1], lines[i][1][1]);
            // console.log(lines[i]);
            for (let y = y1; y <= y2; y++) {
                //console.log('incr ' + x2 + ',' + y);
                field[y][x1]++;
            }
        } else if (lines[i][0][1] == lines[i][1][1]) {
            let x1 = Math.min(lines[i][0][0], lines[i][1][0]);
            let y1 = Math.min(lines[i][0][1], lines[i][1][1]);
            let x2 = Math.max(lines[i][0][0], lines[i][1][0]);
            let y2 = Math.max(lines[i][0][1], lines[i][1][1]);
            for (let x = x1; x <= x2; x++) {
                field[y1][x]++;

            }
        } else {
            let x1 = lines[i][0][0];
            let y1 = lines[i][0][1];
            let x2 = lines[i][1][0];
            let y2 = lines[i][1][1];
            let x = x1;
            let y = y1;
            let cnt = Math.abs(x1 - x2);
            for (let i = 0; i <= cnt; i++) {
                field[y][x]++;
                x = x1 > x2 ? x - 1 : x + 1;
                y = y1 > y2 ? y - 1 : y + 1;
            }
        }
    }
}

const countMultiple = (field) => {
    let incrGreater = 0;
    for (let i=0;i<field.length;i++) {

        for (let j=0; j< field[i].length; j++) {

            if (field[i][j] > 1) {
                incrGreater++;
            }
        }
    }
    return incrGreater;
}

fs = require('fs')
const text = fs.readFileSync('./day5/input.txt', 'utf-8')
let input = text.split('\n');
let {lines, max_x, max_y} = parseInput(input);

field = create2DArray(max_x+1,max_y+1, 0);

processLines(field, lines);

console.log('Count greater: ' + countMultiple(field));