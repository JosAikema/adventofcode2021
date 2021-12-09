fs = require('fs')

const text = fs.readFileSync('./day9/input.txt', 'utf-8')
let input = text.split('\n');

let lines = [];
for (let i=0;i<input.length;i++) {
    let line = input[i].split('').map(val => parseInt(val));
    lines.push(line);
}

const findLowest = (lines) => {
    let lowest = [];
    for (let x=0;x<lines.length;x++) {
        for (let y = 0; y < lines[x].length; y++) {
            let point = lines[x][y];
            let north = true;
            let east = true;
            let south = true;
            let west = true;
            if (x != 0) north = input[x-1][y] > point;
            if (y != lines[x].length - 1) east = lines[x][y+1] > point;
            if (x != lines.length - 1) south = lines[x+1][y] > point;
            if (y != 0) west = input[x][y-1] > point;
            if (north && east && south && west) {
                lowest.push({x,y});
            }
        }
    }
    return lowest;
}

const findBasin = (point, matrix) => {

    let alreadyChecked = [];

    function findNeighbours(point, matrix) {

        let x = point[0];
        let y = point[1];

        if (alreadyChecked.filter(item => item[0] ===x && item[1] === y).length > 0) return 0;
        if ((x < 0) || (y < 0) || (x > matrix.length-1) || (y > matrix[0].length-1)) return 0;
        if (matrix[x][y] === 9) return 0;
        alreadyChecked.push([x,y]);

        let neighboursNorth = findNeighbours([x-1,y], matrix);
        let neighboursEast = findNeighbours([x,y+1], matrix);
        let neighboursSouth = findNeighbours([x+1,y], matrix);
        let neighboursWest = findNeighbours([x,y-1], matrix)

        return 1 + neighboursNorth + neighboursEast + neighboursSouth + neighboursWest;
    }

    return findNeighbours([point.x, point.y], matrix);

}

let basins = [];
let lowest = findLowest(lines);

for (let i=0;i<lowest.length;i++) {
    basins.push(findBasin(lowest[i]), lines);
}

let total = basins
    .sort((a,b) => b - a)
    .slice(0,3)
    .reduce((a,b) => a * b);

console.log('Total: ' + total);
