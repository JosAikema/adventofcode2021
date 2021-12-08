fs = require('fs')

const text = fs.readFileSync('./day8/input.txt', 'utf-8')
let input = text.split('\n');

let digitsArray = [];
let outputArray = [];

for (let i=0;i<input.length;i++) {
 let [first, second] = input[i].split(' | ');
 let digits = first.split(' ');
 let outputs = second.split(' ');
 digitsArray.push(...digits);
 outputArray.push(...outputs);
}


let cntOne = outputArray.filter(digit => digit.length === 2);
let cntFour = outputArray.filter(digit => digit.length === 4);
let cntSeven = outputArray.filter(digit => digit.length === 3);
let cntEight = outputArray.filter(digit => digit.length === 7);

console.log('Total: ' + (cntOne.length + cntFour.length + cntSeven.length +cntEight.length))




