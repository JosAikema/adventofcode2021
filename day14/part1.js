fs = require('fs')

const text = fs.readFileSync(__dirname + '/input_demo.txt', 'utf-8');
let fileContent = text.split('\n');

let templateReady = false
let instructions = {}
let template = []
for (let i=0;i<fileContent.length;i++) {

    if (fileContent[i] === '') {
        templateReady = true;
    } else {
        if (templateReady) {
            //,
            instructions[fileContent[i].split(' -> ')[0]] = fileContent[i].split(' -> ')[1]
        } else {
            template = fileContent[i];
        }
    }
}

console.log(template)
console.log(instructions)

let counter = str => {
    return str.split('').reduce((total, letter) => {
        total[letter] ? total[letter]++ : total[letter] = 1;
        return total;
    }, {});
};

const process = (template, instructions) => {
    let new_template = template[0];
    for (let i=0;i<template.length-1;i++) {
        let str = template[i] + template[i+1]
        // console.log(str);
        let new_str = instructions[str] + template[i+1];
        // console.log(new_str);
        new_template += new_str;
        // console.log('New template: ' + new_template);
    }
    return new_template;
}

for (let s=0;s<10;s++) {
    template = process(template, instructions);
}

console.log(template);

console.log(counter(template));

let keys   = Object.keys(counter(template));

console.log(keys);
let lowest = Math.min.apply(null, keys.map(function(x) { return counter(template)[x]} ));
let highest = Math.max.apply(null, keys.map(function(x) { return counter(template)[x]} ));

console.log(highest - lowest);


