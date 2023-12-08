const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const lines = content.split('\n');

const instructions = lines[0].split('');
const nodes = lines.slice(2).map(line => {
    const [node, possibles] = line.split(' = ');
    const [L, R] = possibles.slice(1, -1).split(', ');
    return [
        node,
        { node, directions: { L, R } }
    ]
});

const nodesMap = new Map(nodes);

let stepsCount = 0;
let zzzNotReached = true;
let currentNode = nodesMap.get('AAA');

console.log(nodes);

while (zzzNotReached) {
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        stepsCount++;
        currentNode = nodesMap.get(currentNode.directions[instruction]);
        if (currentNode.node === 'ZZZ') {
            zzzNotReached = false;
            break;
        }
    }
}

console.log(stepsCount);