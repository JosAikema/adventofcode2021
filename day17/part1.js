const fs = require('fs');

const text = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const [x_range,y_range] = text.split(': ')[1].split(', ');

let [x_min, x_max] = x_range.split('..');
let [y_min, y_max] = y_range.split('..');
x_min = x_min.split('=')[1]
y_min = y_min.split('=')[1]

let answer = -1

for (let vx_start=1;vx_start<=parseInt(x_max);vx_start++) {
    for (let vy_start=parseInt(y_min);vy_start<=1000;vy_start++) {
        if ((vx_start !== 0)) {
            let y_highest = 0;
            let x = 0;
            let y = 0;
            let vx = vx_start;
            let vy = vy_start
            while (true) {
                x = x + vx;
                y = y + vy;
                if (vx<0) vx++; else if (vx>0) vx--;
                vy--;
                y_highest = Math.max(y_highest, y);
                if ((x >= x_min) && (x <= x_max) && (y >= y_min) && (y <= y_max)) {
                    answer = Math.max(answer, y_highest);
                    break;
                }
                if ((x > x_max) || (y < y_min)) {
                    break;
                }
            }
        }
    }
}

console.log('Answer Y: ' + answer);

