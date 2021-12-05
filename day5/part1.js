fs = require('fs')

const text = fs.readFileSync('./day5/input.txt', 'utf-8')
let input = text.split('\n');

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
    //lines.push({c1_x,c1_y,c2_x,c2_y});
}

console.log('Max X: ' + max_x);
console.log('Max Y: ' + max_y);


field = create2DArray(max_x+1,max_y+1, 0);

//console.log(lines);

//console.log(field);

let countTwo = 0;

for (let i=0; i<lines.length;i++) {
    let x1 = Math.min(lines[i][0][0], lines[i][1][0]);
    let y1 = Math.min(lines[i][0][1], lines[i][1][1]);
    let x2 = Math.max(lines[i][0][0], lines[i][1][0]);
    let y2 = Math.max(lines[i][0][1], lines[i][1][1]);
    if (x1 === x2 )  {
        console.log('Process vert rule (' + lines[i] +')')
        // console.log(lines[i]);
        for (let y=y1;y<=y2;y++) {
            //console.log('incr ' + x2 + ',' + y);
            field[y][x1] ++;
            if (field[y][x1] === 2) {
                countTwo++;
            }
        }
    } else if (y1 == y2) {
        console.log('Process hor rule (' + lines[i] +')')
        for (let x=x1;x<=x2;x++) {
            field[y1][x]++;
            //console.log('incr ' + x + ',' + y1);
            if (field[y1][x] === 2) {
                countTwo++;
            }
        }
    } else {
        console.log('Skip diagonal (' + lines[i] +')')
    }
}

// const updateField = (field, instruction) => {
//     let x1 = instruction[0][0];
//     let y1 = instruction[0][1];
//     let x2 = instruction[1][0];
//     let y2 = instruction[1][1];
//     console.log('x1: ' + x1);
//     console.log('y1: ' + y1);
//     console.log('x2: ' + x2);
//     console.log('y2: ' + y2);
//
//     if (y1 == y2) {
//         for (let x = x1; x <= x2; x++) {
//             console.log(x,y2);
//             console.log('regel')
//             console.log(field[x][9]);
//             field[x][y1]++
//         }
//     }
// }

// updateField(field, lines[0]);

//console.log(field);
console.log('Count two: ' + countTwo)