fs = require('fs')

const text = fs.readFileSync('./day10/input.txt', 'utf-8')
let input = text.split('\n');

const points = { ')': 3, ']' : 57, '}': 1197, '>': 25137 };

const parseLine = (line) => {
    let startTags = [];
    let wrongEndTag = '';
    for (let i=0;i<line.length;i++) {
        if (wrongEndTag === "") {
            switch (line[i]) {
                case '(':
                case '{':
                case '[':
                case '<':
                    startTags.push(line[i]);
                    break;
                case ')':
                    if (startTags[startTags.length - 1] === '(') {
                        startTags.pop()
                    } else {
                        wrongEndTag = line[i];
                    }
                    break;
                case '}':
                    if (startTags[startTags.length - 1] === '{') startTags.pop(); else wrongEndTag = line[i];
                    ;
                    break;
                case ']':
                    if (startTags[startTags.length - 1] === '[') startTags.pop(); else wrongEndTag = line[i];
                    ;
                    break;
                case '>':
                    if (startTags[startTags.length - 1] === '<') startTags.pop(); else wrongEndTag = line[i];
                    ;
                    break;
            }
        }
    }
    return wrongEndTag;
}


let lines = input
let errors = [];

lines.forEach((line) => {
    error = parseLine(line);
    if (error !== '') {
        errors.push(points[error])
    }
})

console.log(errors.reduce((a,b) => a+b));
