fs = require('fs')

const text = fs.readFileSync(__dirname + '/input.txt', 'utf-8');
let fileContent = text.split('\n');
let input = fileContent.map((line) => line.split("-"));

const connections = {};

for (let line of input) {
    if (connections[line[0]]) {
        connections[line[0]] = [...connections[line[0]], line[1]];
    } else {
        connections[line[0]] = [line[1]];
    }
    if (connections[line[1]]) {
        connections[line[1]] = [...connections[line[1]], line[0]];
    } else {
        connections[line[1]] = [line[0]];
    }

}

const getPath = (point, path, paths, small = true) => {
    let newPath = [...path.map(e => e), point];

    if (point === 'end') { paths.push(newPath); return; }

    connections[point].forEach(connection => {
        if(connection === connection.toUpperCase() || !newPath.includes(connection)){
            getPath(connection, newPath, paths, small);
        } else if (small && connection !== 'start' && connection !== 'end') {
            getPath(connection, newPath, paths, false);
        }
    }) }

let paths = [];

getPath('start', [], paths);

console.log(paths.length);

