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

function getStepsCount(start) {
    let currentNode = start;
    let stepsCount = 0;
    let zzzNotReached = true;
    while (zzzNotReached) {
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            stepsCount++;
            if (nodesMap.get(currentNode.directions[instruction]) === undefined) {
                console.log(currentNode);
            }
            currentNode = nodesMap.get(currentNode.directions[instruction]);
            // if (currentNode.node === 'ZZZ') 
            if (currentNode.node.at(-1) === 'Z') {
                zzzNotReached = false;
                break;
            }
        }
    }
    return stepsCount;
}

//PART 1
// console.log(getStepsCount(nodesMap.get('AAA')));

const starts = [];
nodes.forEach(node => {
    if (node[0].at(-1) === 'A') {
        starts.push(nodesMap.get(node[0]));
    }
})


const cyclesLength = starts.map(start => {
    return getStepsCount(start);
});

console.log(cyclesLength);
