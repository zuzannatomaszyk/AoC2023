const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const lines = content.split('\n');

const races = [];

lines[0].split(':')[1].split(' ').map(time => Number(time.trim())).filter(Boolean).forEach((time) => {
    races.push({ time });
});

lines[1].split(':')[1].split(' ').map(distance => Number(distance.trim())).filter(Boolean).forEach((distance, index) => {
    races[index] = { ...races[index], distance };
});

console.log(races);

function findNumberOfWays(race) {
    const delta = Math.pow(race.time, 2) - (4 * (race.distance + 1));

    const x1 = ((-1 * race.time) + Math.sqrt(delta)) / -2;
    const x2 = ((-1 * race.time) - Math.sqrt(delta)) / -2;

    return Math.floor(x2) - Math.ceil(x1) + 1;
}

const numberOfWays = races.map((race) => {
    return findNumberOfWays(race);
});
console.log(numberOfWays);
const part1 = numberOfWays.reduce((acc, current) => acc * current, 1);

console.log(part1);

const race = {
    time: Number(lines[0].split(':')[1].replaceAll(' ', '')),
    distance: Number(lines[1].split(':')[1].replaceAll(' ', ''))
}

console.log(findNumberOfWays(race));