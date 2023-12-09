const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const lines = content.split('\n').map(l => l.split(' ').map(Number));

function extrapolateBackwards(line) {
    notAllZeros = true;
    const extrapolatedLines = [[...line]];
    while (notAllZeros) {
        const currentLine = [...extrapolatedLines.at(-1)]
        const newLine = [];
        for (let i = 0; i < currentLine.length - 1; i++) {
            newLine.push(currentLine[i + 1] - currentLine[i]);
        }
        extrapolatedLines.push(newLine);
        if (newLine.every(n => n === 0)) {
            notAllZeros = false;
        }
    }

    for (let i = extrapolatedLines.length - 1; i > 0; i--) {
        const newNum = extrapolatedLines[i - 1][0] - extrapolatedLines[i][0];
        extrapolatedLines[i - 1].unshift(newNum);
    }

    return extrapolatedLines[0][0];
}

const sum = lines.reduce((acc, current) => {
    return acc + extrapolateBackwards(current);
}, 0)

console.log(sum);