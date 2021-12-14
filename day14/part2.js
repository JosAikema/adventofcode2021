fs = require('fs')

const text = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

let [template, rest] = text.split('\n\n');

const instructions = rest.split('\n').reduce((list, item) => {
    list[item.split(' -> ')[0]] = item.split(' -> ')[1];
    return list;
}, {});



const counter = str => {
    let dict = {};
    for (let i=0;i<str.length-1;i++) {
        if (dict[str[i] + str[i+1]] === undefined) {
            dict[str[i] + str[i+1]] = 1;
        } else {
            dict[str[i] + str[i+1]] += 1;
        }
    }
    return dict;
};

let counterPerEach = str => {
    return str.split('').reduce((total, letter) => {
        total[letter] ? total[letter]++ : total[letter] = 1;
        return total;
    }, {});
};

let countPerEach = counterPerEach(template);

const process = (counts, instructions) => {
    let new_counts = {...counts};
    for (count in counts) {
        let new1 = count[0] + instructions[count];
        let new2 = instructions[count] + count[1];

        if (new_counts[new1] === undefined) {
            new_counts[new1] = counts[count];
        } else {
            new_counts[new1] += counts[count];
        }
        if (new_counts[new2] === undefined) {
            new_counts[new2] = counts[count];
        } else {
            new_counts[new2] += counts[count];
        }
        new_counts[count] = new_counts[count]-counts[count];
        if (new_counts[count] === 0) delete new_counts[count];
        if (countPerEach[instructions[count]] === undefined) {
            countPerEach[instructions[count]] = counts[count];
        } else {
            countPerEach[instructions[count]] = countPerEach[instructions[count]]+counts[count];
        }


    }
    return new_counts;
}

let counts = counter(template);

for (let s=0;s<40;s++) {
    counts = process(counts, instructions);
}

let keys   = Object.keys(countPerEach);
let lowest = Math.min.apply(null, keys.map(function(x) { return countPerEach[x]} ));
let highest = Math.max.apply(null, keys.map(function(x) { return countPerEach[x]} ));

console.log(highest - lowest);


