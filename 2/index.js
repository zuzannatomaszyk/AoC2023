const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });
const games = content.split('\n');


//config: 12 red cubes, 13 green cubes, and 14 blue cubes 
//What is the sum of the IDs of those games?
function isGamePossible(game) {
    game = game.split(': ')[1].split('; ').map((hand) => hand.split(', ').map(color => color.split(' ')));

    return game.every(hand => {
        return hand.every(([ammount, color]) => {
            switch (color) {
                case 'red':
                    return ammount <= 12;
                case 'green':
                    return ammount <= 13;
                case 'blue':
                    return ammount <= 14;
                default:
                    return;
            }
        })
    })
}

const sum = games.reduce((acc, currentValue, index) => {
    if (isGamePossible(currentValue)) {
        return acc + index + 1;
    }
    return acc;
}, 0);

console.log(`PART 1: ${sum}`);

function getGamePower(game) {
    game = game.split(': ')[1].split('; ').map((hand) => hand.split(', ').map(color => color.split(' ')));

    let minimalHand = {
        'red': 0,
        'green': 0,
        'blue': 0,
    }

    game.forEach(hand => {
        hand.forEach(([ammount, color]) => {
            minimalHand[color] = Math.max(minimalHand[color], Number(ammount));
        })
    });

    return minimalHand.red * minimalHand.green * minimalHand.blue;
}

const power = games.reduce((acc, currentValue) => {
    return acc + getGamePower(currentValue);
}, 0);

console.log(`PART 2: ${power}`);

