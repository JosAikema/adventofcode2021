fs = require('fs')

const text = fs.readFileSync(__dirname + '/input.txt', 'utf-8');
let fileContent = text.split('\n');

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

let dots = []
let folds = [];
let dotsReady = false;
let maxX = 0;
let maxY = 0;
for (let i=0;i<fileContent.length;i++) {

    if (fileContent[i] === '') {
        dotsReady = true;
    } else {
        if (dotsReady) {
            folds.push(fileContent[i].split(' ')[2].split('='))
        } else {
            maxX = Math.max(maxX, parseInt(fileContent[i].split(',')[0]));
            maxY = Math.max(maxY, parseInt(fileContent[i].split(',')[1]));
            dots.push(fileContent[i].split(',').map((val) => parseInt(val)));
        }
    }
}



console.log(dots);
console.log(folds);

let paper = create2DArray(maxX+1, maxY+1, 0);
console.log(paper);

for (let i=0;i<dots.length;i++) {
   console.log(dots[i]);
   let x = dots[i][0];
   let y = dots[i][1];
   console.log('x:' + x + ',y:' + y);
   paper[y][x] = 1
}


const fold = (idx) => {
    if (folds[idx][0] === 'y') {
        for (let y = 0; y < folds[idx][1]; y++) {
                for (let x = 0; x < paper[y].length; x++) {
                    paper[y][x] = paper[y][x] | paper[2 * folds[idx][1] - y]?.[x];
                }
            }
            paper.length = folds[idx][1];

    } else {
        for (let y = 0; y < paper.length; y++) {
                for (let x = 0; x < folds[idx][1]; x++) {
                    paper[y][x] = paper[y][x] | paper[y][2 * folds[idx][1] - x];
                }
                paper[y].length = folds[idx][1];
            }
    }
}


fold(0);
let sum = 0
for (let i=0;i<paper.length;i++) {
    for (let j=0;j<paper[0].length;j++) {
        sum += paper[i][j];
    }
}
console.log(sum);

