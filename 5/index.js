const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
let lines = content.split('\n').filter(Boolean);

//SEEDS PART 1
const seeds = lines[0].slice(7).split(' ').map(Number);

lines = lines.slice(1);

let maps = [];

let currentMap;
let ranges = [];
lines.forEach((line) => {
    if (line.includes('map')) {
        if (currentMap) {
            currentMap = { ...currentMap, ranges: [...ranges] }
            maps.push(currentMap);

        }
        currentMap = { name: line.split(' ')[0] }
        ranges = [];
        return;
    }
    const [to, from, length] = line.split(' ').map(Number);
    ranges.push({ to, from, length })
})
maps.push({ ...currentMap, ranges: [...ranges] });

let allMapped = seeds.map((seed) => {
    return {
        seed,
        soil: '',
        fertilizer: '',
        water: '',
        light: '',
        temperature: '',
        humidity: '',
        location: '',
    }
})

//SEEDS PART 2
const seedsRanges = lines[0].slice(7).split(' ').map(Number);

for (let i = 0; i < seedsRanges.length; i += 2) {
    const start = seedsRanges[i];
    const length = seedsRanges[i + 1];
    for (let j = 0; j < length; j++) {
        seeds.push(start + j);
    }
}

maps.forEach((map) => {
    const [FROM, TO] = map.name.split('-to-');

    allMapped.forEach((element) => {
        map.ranges.forEach((range) => {
            if (range.from <= element[FROM] && element[FROM] < (range.from + range.length)) {
                element[TO] = range.to + (element[FROM] - range.from);
            }
        })
        if (element[TO] === '') {
            element[TO] = element[FROM];
        }
    })
})

// Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
// Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
// Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
// Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.

const minLoc = allMapped.reduce((acc, current) => {
    return Math.min(current.location, acc);
}, Infinity);

console.log(minLoc);