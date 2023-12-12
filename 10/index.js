const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const sketch = content.split('\n').map((line) => line.split(''));
//[y, x]
const directionsMap = new Map([
    ['|', [[-1, 0], [1, 0]]],
    ['-', [[0, 1], [0, -1]]],
    ['L', [[-1, 0], [0, 1]]],
    ['J', [[-1, 0], [0, -1]]],
    ['7', [[1, 0], [0, -1]]],
    ['F', [[1, 0], [0, 1]]],
    ['S', [[1, 0], [0, -1]]] //from input
]);


function findStart() {
    let start;
    sketch.forEach((y, yIndex) => {
        y.forEach((x, xIndex) => {
            if (x === 'S') {
                start = {
                    node: [yIndex, xIndex],
                    directions: directionsMap.get(x)
                };
            }
        })
    })
    return start;
}

function getNextNode(currentNode, direction) {
    return [currentNode[0] + direction[0], currentNode[1] + direction[1]];
}

function findCycle(start) {

    let foundCycle;
    let currentNode = start.node;
    let direction = [...start.directions[0]];
    const path = [];

    while (!foundCycle) {

        const prevNode = [...currentNode];
        currentNode = getNextNode(currentNode, direction);
        path.push(currentNode);
        const currentNodeValue = sketch[currentNode[0]][currentNode[1]];

        if (currentNodeValue === 'S') {
            foundCycle = [...path];
            // console.log(foundCycle);
        } else {
            direction = directionsMap.get(currentNodeValue)?.filter((direction) => {
                const next = getNextNode(currentNode, direction);
                return prevNode.join('') !== next.join('');
            })[0];
        }

    }
    return foundCycle;
}

const start = findStart();
const cycle = findCycle(start);
console.log(`Cycle max distance: ${Math.floor(cycle.length / 2)}`);

sketch.forEach((line, Y) => {
    line.forEach((_, X) => {
        if (cycle.every(element => element[0] !== Y || element[1] !== X)) {
            sketch[Y][X] = '.'
        }
    })
})

function findMinMaxSquare(cycle) {
    const sortedByY = [...cycle].sort((node1, node2) => node1[0] - node2[0]);
    const sortedByX = [...cycle].sort((node1, node2) => node1[1] - node2[1]);

    return {
        minY: sortedByY[0][0],
        maxY: sortedByY.at(-1)[0],
        minX: sortedByX[0][1],
        maxX: sortedByX.at(-1)[1],
    }
}

function cutCycleSquare(cycle) {
    const { minX, minY, maxX, maxY } = findMinMaxSquare(cycle);
    return sketch.slice(minY, maxY + 1).map(line => line.slice(minX, maxX + 1));
}


const cycleSquare = cutCycleSquare(cycle);
// console.log(cycleSquare.map(line => line.join('')));

function isInside(cycleSquare, Y, X) {
    let crossingBefore = 0;
    let crossingAfter = 0;
    cycleSquare[Y].forEach((element, id) => {
        if (['|', 'L', 'J', '7', 'F', 'S'].includes(element)) {
            id < X ? crossingBefore++ : crossingAfter++;
        }
    })
    if (crossingBefore === 0 || crossingAfter === 0) {
        return false;
    }
    if (crossingBefore % 2 !== 0 || crossingAfter % 2 !== 0) {
        return true;
    }
    //reset values before Y
    crossingBefore = 0;
    crossingAfter = 0;

    cycleSquare.forEach((line, id) => {
        if (['-', 'L', 'J', '7', 'F', 'S'].includes(line[X])) {
            id < Y ? crossingBefore++ : crossingAfter++;
        }
    })
    if (crossingBefore === 0 || crossingAfter === 0) {
        return false;
    }
    if (crossingBefore % 2 !== 0 || crossingAfter % 2 !== 0) {
        return true;
    }
    return false;
}

let pointsInside = 0;
cycleSquare.forEach((line, Y) => {
    line.forEach((char, X) => {
        if (char === '.' && isInside(cycleSquare, Y, X)) {
            console.log(`[${Y}, ${X}]`);
            pointsInside++;
        }
    })
})

console.log(`Points inside: ${pointsInside}`);
