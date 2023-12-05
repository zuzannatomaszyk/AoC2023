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

// let allMapped = seeds.map((seed) => {
//     return {
//         seed,
//         soil: '',
//         fertilizer: '',
//         water: '',
//         light: '',
//         temperature: '',
//         humidity: '',
//         location: '',
//     }
// })


let minLoc = Infinity;
for (let i = 0; i < seeds.length; i += 2) {
    console.log(i);
    const start = seeds[i];
    const length = seeds[i + 1];
    for (let j = 0; j < length; j++) {
        let currentFROM = start + j;
        maps.forEach((map) => {
            for (const range of map.ranges) {
                if (range.from <= currentFROM && currentFROM < (range.from + range.length)) {
                    currentFROM = range.to + (currentFROM - range.from);
                    break;
                }
            }
        })
        minLoc = Math.min(currentFROM, minLoc);
    }
}

// const minLoc = allMapped.reduce((acc, current) => {
//     return Math.min(current.location, acc);
// }, Infinity);


console.log(minLoc);