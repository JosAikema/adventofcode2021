fs = require('fs')

const text = fs.readFileSync('./day10/input.txt', 'utf-8')
let input = text.split('\n');

const points = { ')': 3, '(' : 1, ']' : 57, '[': 2, '}': 1197, '{' : 3, '>': 25137, '<' :  4};

const findWrongTag = (line) => {
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

const completeLine = (line) => {
    let startTags = [];
    for (let i=0;i<line.length;i++) {
        switch (line[i]) {
            case '(':
            case '{':
            case '[':
            case '<':
                startTags.push(line[i]);
                break;
            case ')':
            case '}':
            case ']':
            case '>':
                startTags.pop()
                break;
        }
    }

    return startTags.reverse();
}

const calculateScore = (tags) => {
    let score = 0;
    for (let i=0;i<tags.length;i++) {
        score *= 5;
        score += points[tags[i]];
    }
    return score;
}

let lines = input
let scores = [];



lines.forEach((line) => {
    if (findWrongTag(line) === '') {
        let missingTags = completeLine(line);
        scores.push(calculateScore(missingTags))
    }
})

console.log(scores.sort((a,b) => a-b)[Math.floor(scores.length/2)]);
