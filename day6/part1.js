fs = require('fs')

const text = fs.readFileSync('./day6/input_demo.txt', 'utf-8')
let input = text.split(',').map((val) => parseInt(val));

let numberFishes = 5;

const processDays = (fishes, days) => {
    for (let i=1;i<=days;i++) {
        let grow = [];
        for (j=0; j< fishes.length; j++) {
            if (fishes[j] === 0) {
                fishes[j] = 6;
                grow.push(8);
            } else {
                fishes[j]--;
            }

        }
        fishes.push(...grow);
    }
    return fishes;
}

input = processDays(input, 80);

console.log('Number: ' + input.length)
