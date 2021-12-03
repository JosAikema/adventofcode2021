fs = require('fs')

const inputFile = fs.readFileSync('./day3/input.txt', 'utf-8');

const input = inputFile.split("\n");

let oxygen = input;

const getRating = (data, type) => {
    for (let i = 0; i < data[0].length; i++) {
        if (data.length == 1) return data;
        let c0 = 0, c1 = 0;

        for (let j = 0; j < data.length; j++) {
            if (data[j][i] == "1") c1++; else c0++;

        }

        // if (c1 > c0 || c1 == c0) {
        if (c1 >= c0) {
            if (type == 1) {
                data = data.filter((item) => item[i] == "1");
            } else {
                data = data.filter((item) => item[i] == "0");
            }
        } else {
            if (type == 1) {
                data = data.filter((item) => item[i] == "0");
            } else {
                data = data.filter((item) => item[i] == "1");
            }
        }
    }
    return data;

}



let generator_rating = parseInt(getRating(input,1), 2);
let scrubber_rating = parseInt(getRating(input,0), 2);

console.log(generator_rating * scrubber_rating);

