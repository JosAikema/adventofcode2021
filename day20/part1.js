const fs = require('fs');

const lines = fs.readFileSync(__dirname + '/input.txt', 'utf-8').split('\n\n');

let alg = lines[0];

let image = lines[1].split('\n');



const neighbours = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];


const enhanceImage = (image) => {
    const newImage = [];
    for (let y = -1; y < image.length + 1; y++) {
        const line = [];
        for (let x = -1; x < image.length + 1; x++) {
            let str = '';
            neighbours.forEach(([dy, dx]) => {
                str += ((image[y + dy]?.[x + dx] ?? background) === '.') ? 0 : 1;
            })
            str = parseInt(str, 2);
            line.push(alg[str]);
        }
        newImage.push(line.join(''));
    }
    if (alg[0]=='#' && alg[alg.length-1]=='.') {
        if(background == '#') background = '.'
        else background = '#'
    }
    return newImage;
}


let background = '.'
let currentImage = image;
for (let i = 0; i < 50; i++) {
    currentImage = enhanceImage(currentImage, background);
}

let total = 0;
for (let i = 0; i < currentImage.length; i++) {
    let sumPerLine = currentImage[i].split('').map(p=> p === '.'?0:1).reduce((a,b) => a + b);
    total += sumPerLine;
}

console.log(total);
