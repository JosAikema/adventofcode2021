fs = require('fs')

const text = fs.readFileSync('./day8/input.txt', 'utf-8')
let input = text.split('\n');


const searchFor = (str1, str2) => {
 let found = 0;
 for (let j=0;j<str2.length;j++) {
  if (str1.includes(str2[j])) {
   found++
  }
 }
 return found;
}


const parseInput = (digits) => {
 // console.log(digits)
 let dict = [];

 let one = digits.filter(digit => digit.length === 2)[0];
 let three = '';
 let four = digits.filter(digit => digit.length === 4)[0]
 let six = '';
 let seven = digits.filter(digit => digit.length === 3)[0];
 let eight = digits.filter(digit => digit.length === 7)[0];

 let lengthFives = digits.filter(digit => digit.length === 5);
 for (let i=0;i<lengthFives.length;i++) {
  let found = searchFor(lengthFives[i], seven)

  if (found === 3) {
   dict[lengthFives[i]] = 3
   three = lengthFives[i];
   lengthFives.splice(i,1);
   break;
  }
 }

 //Search for the 6
 let lengthSix = digits.filter(digit => digit.length === 6);

 for (let i=0;i<lengthSix.length;i++) {
  let foundFor6 = searchFor(lengthSix[i], one)

  if (foundFor6 !== 2) {
   dict[lengthSix[i]] = 6
   six = lengthSix[i];
   lengthSix.splice(i,1);
   break;
  }
 }

 //Search for 9
 for (let i=0;i<lengthSix.length;i++) {
  let foundFor9 = searchFor(lengthSix[i], three)

  if (foundFor9 === 5) {
   dict[lengthSix[i]] = 9
   lengthSix.splice(i,1);
   dict[lengthSix[0]] = 0
   break;
  }
 }

 //Search for 5
 for (let i=0;i<lengthFives.length;i++) {
  let found = searchFor(six, lengthFives[i]);

  if (found === 5) {
   dict[lengthFives[i]] = 5;
   lengthFives.splice(i,1);
   dict[lengthFives[0]] = 2;
   break;
  }
 }
 dict[one] = 1;
 dict[four] = 4;
 dict[seven] = 7;
 dict[eight] = 8;

 return dict;

}

let outputArray = [];

for (let i=0;i<input.length;i++) {
 let parts = input[i].split(' | ');
 let first = parts[0];
 let second = parts[1];
 let digits = first.split(' ').map(item => item.split('').sort().join(''));
 let outputs = second.split(' ').map(item => item.split('').sort().join(''));
 let dict = parseInput(digits);

 let output = '';

 for (let j=0;j<outputs.length;j++) {
  output = output + dict[outputs[j]]
 }

 outputArray.push(parseInt(output));

}



console.log(outputArray.reduce((a,b) => a+b));
// let cntOne = outputArray.filter(digit => digit.length === 2);
// let cntFour = outputArray.filter(digit => digit.length === 4);
// let cntSeven = outputArray.filter(digit => digit.length === 3);
// let cntEight = outputArray.filter(digit => digit.length === 7);
//
// console.log('1: ' + cntOne);
// console.log('4: ' + cntFour);
// console.log('7: ' + cntSeven);
// console.log('8: ' + cntEight);
//
// console.log('1: ' + cntOne.length);
// console.log('4: ' + cntFour.length);
// console.log('7: ' + cntSeven.length);
// console.log('8: ' + cntEight.length);
//
// console.log('Total: ' + (cntOne.length + cntFour.length + cntSeven.length +cntEight.length))




