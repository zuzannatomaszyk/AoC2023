const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const cards = content.split('\n').map((card) => {
    const id = Number(card.split(': ')[0].slice(4).trim());
    const [winning, played] = card.split(': ')[1].split(' | ');
    return {
        id,
        winning: winning.split(' ').filter(Boolean),
        played: played.split(' ').filter(Boolean)
    }
});

function findWon(card) {
    return card.played.filter(num => card.winning.includes(num));
}

const part1 = cards.reduce((acc, card) => {
    const won = findWon(card);

    if (won.length) {
        acc += Math.pow(2, (won.length - 1));
    }
    return acc;
}, 0);

console.log(`PART 1: ${part1}`);


function copyAndWin(card, maxID) {
    const won = findWon(card);

    if (won.length) {

        let currentID = card.id;
        let toBeAdded = {
            id: currentID + 1,
            winning: [...cards[currentID].winning],
            played: [...cards[currentID].played],
        }

        for (let i = 0; i < won.length; i++) {
            if (toBeAdded.id > maxID) break;

            cards.push({ ...toBeAdded });
            currentID++;

            toBeAdded = {
                id: currentID + 1,
                winning: [...cards[currentID].winning],
                played: [...cards[currentID].played],
            }
        }
    }
}

const maxID = cards.at(-1).id;

for (let i = 0; i < cards.length; i++) {
    copyAndWin(cards[i], maxID);
}


console.log(`PART 2: ${cards.length}`)
