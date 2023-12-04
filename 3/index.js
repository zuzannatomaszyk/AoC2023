const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const schematic = content.split('\n').map((line) => line.split(''));

let numbers = [];
let symbols = [];
let possibleGears = [];

schematic.forEach((line, lineID) => {
    let currentNum = {
        start: [lineID, 0],
        num: '',
        end: [lineID, 0],
    }
    line.forEach((char, charID) => {
        if (!Number.isNaN(Number(char)) && currentNum.num === '') {
            currentNum.start = [lineID, charID];
        }
        if (!Number.isNaN(Number(char))) {
            currentNum.num += char;
        }
        if (Number.isNaN(Number(char)) && currentNum.num) {
            currentNum.end = [lineID, charID - 1];
            numbers.push({ ...currentNum });

            currentNum.num = '';
        }

        //check for symbol 
        if (Number.isNaN(Number(char)) && char !== '.') {
            symbols.push([lineID, charID]);
        }
        //check for gear 
        if (char === '*') {
            possibleGears.push([lineID, charID]);
        }
    })
    if (currentNum.num) {
        currentNum.end = [lineID, line.length - 1];
        numbers.push({ ...currentNum });
        currentNum = '';
    }
})

function isSymbolAdjacentToNum([y, x], num) {
    return Math.abs(y - num.start[0]) <= 1 && x >= (num.start[1] - 1) && x <= (num.end[1] + 1);
}

function isAdjacent(currentNum) {
    return symbols.some(([y, x]) => {
        return isSymbolAdjacentToNum([y, x], currentNum);
    });
}

const part1 = numbers.reduce((acc, currentNum) => {
    if (isAdjacent(currentNum)) {
        acc += Number(currentNum.num);
    }
    return acc;
}, 0);

console.log(`PART 1: ${part1}`);

const part2 = possibleGears.reduce((acc, possible) => {
    let adjacentNums = [];
    numbers.forEach(num => {
        if (isSymbolAdjacentToNum(possible, num)) {
            adjacentNums.push(num.num);
        }
    });
    if (adjacentNums.length === 2) {
        return acc += adjacentNums[0] * adjacentNums[1];
    }
    return acc;
}, 0);

console.log(`PART 2: ${part2}`)