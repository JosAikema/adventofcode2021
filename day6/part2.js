fs = require('fs')

const text = fs.readFileSync('./day6/input.txt', 'utf-8')
let input = text.split(',').map((val) => parseInt(val));

let fishesDict = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6: 0, 7:0, 8: 0}

//Initialize dictionary with input
for (let i = 0; i<input.length; i++) {
    fishesDict[input[i]]++
}

//Loop trough days and set new dictionary values based on old values
for (let d=0; d < 256; d++ ) {
    //First calculate newborns
    let grow = fishesDict[0];

    for (let i=0;i<9;i++) {
        if (i !== 8) {
            fishesDict[i] = fishesDict[i+1];
        }
    }

    fishesDict[8] = grow;
    fishesDict[6] = fishesDict[6] + grow;

}

//Sum all values
console.log(Object.values(fishesDict).reduce((a , b) => a + b));