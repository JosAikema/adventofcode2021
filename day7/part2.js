fs = require('fs')

const text = fs.readFileSync('./day7/input.txt', 'utf-8')
let input = text.split(',').map((val) => parseInt(val));;

const calculateFuel = (n) => {
    return (n * (n+1)) / 2;
}

const createArray = (width, height, initialValue = null) => {
    let array = new Array(height);
    for (let y = 0; y < height; y++) {
        array[y] = new Array(width);
        for (let x = 0; x < width; x++) {
            let value = initialValue;
            if (typeof initialValue === 'function') value = initialValue(x, y);
            if (Array.isArray(initialValue)) value = [...initialValue];
            array[y][x] = calculateFuel(Math.abs(input[x] - y));
        }
    }
    return array;
}

const max =  Math.max(...input)

const matrix = createArray(input.length,max+1);

let least = matrix[0].reduce((a,b) => a+b);
for (let i=1;i <= max;i++) {
    let sum = matrix[i].reduce((a,b) => a+b);
    least = Math.min(least, sum);
}

console.log('Least fuel: '+least);