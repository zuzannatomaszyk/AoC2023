const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const lines = content.split('\n');

const part1 = lines.reduce((accumulator, current) => {
    current = current.split('').filter(Number);
    const number = current[0] + current.at(-1);
    return accumulator + +number;
}, 0);

console.log(`PART 1: ${part1}`);

const spelledNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const replaceSpelledNumbers = (currentLine) => {
    const firstsFound = spelledNums.map((spelledNum) => currentLine.indexOf(spelledNum));
    const lastsFound = spelledNums.map((spelledNum) => currentLine.lastIndexOf(spelledNum));

    firstsFound.forEach((foundIndex, i) => {
        if (foundIndex === -1) return;
        currentLine = currentLine.substring(0, foundIndex) + (i + 1).toString() + currentLine.substring(foundIndex + 1);
    });

    lastsFound.forEach((foundIndex, i) => {
        if (foundIndex === -1) return;
        currentLine = currentLine.substring(0, foundIndex) + (i + 1).toString() + currentLine.substring(foundIndex + 1);
    });

    return currentLine;
}

const part2 = lines.reduce((accumulator, currentLine) => {
    currentLine = replaceSpelledNumbers(currentLine);
    currentLine = currentLine.split('').filter(Number);
    const number = currentLine[0] + currentLine.at(-1);
    return accumulator + +number;
}, 0);

console.log(`PART 2: ${part2}`);