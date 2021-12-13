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

const findPath = (point, path, paths) => {
    let newPath = [...path.map(e => e), point];

    if (point === 'end') {
        paths.push(newPath); return;
    }

    connections[point].forEach(connection => {
        if (connection === connection.toUpperCase() || !newPath.includes(connection)) {
            findPath(connection, newPath, paths);
        }
    })
}

let paths = [];
findPath('start', [], paths);
console.log(paths.length);


