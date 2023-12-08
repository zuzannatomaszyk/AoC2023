const fs = require('fs');
const content = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

// CARDS: A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2
const cardsToValues = new Map([
    ['A', 14],
    ['K', 13],
    ['Q', 12],
    ['J', 1],
    ['T', 10],
]);

const hands = content.split('\n').map((hand) => {
    const [cards, bid] = hand.split(' ');
    return {
        bid: Number(bid),
        cards: cards.split('').map(c => Number(cardsToValues.get(c)) || Number(c)),
    }
});


function getHandRank(hand) {
    const counts = {};
    hand.cards.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    const cardKyes = Object.keys(counts);
    const cardCountsValues = Object.values(counts);

    switch (cardKyes.length) {
        case 5:
            if (cardKyes.includes('1')) {
                return 1;
            }
            return 0;
        case 4:
            if (cardKyes.includes('1')) {
                return 3;
            }
            return 1;
        case 3:
            if (cardCountsValues.includes(3) && cardKyes.includes('1')) {
                return 5;
            }
            if (cardCountsValues.includes(3)) {
                return 3;
            }
            if (counts['1'] === 1) {
                return 4;
            }
            if (counts['1'] === 2) {
                return 5;
            }
            return 2;
        case 2:
            if (cardKyes.includes('1')) {
                return 6;
            }
            if (cardCountsValues.includes(4)) {
                return 5;
            }
            return 4;
        case 1:
            return 6;
        default:
            return;
    }

}

function sortHands(hand1, hand2) {
    const type1 = getHandRank(hand1);
    const type2 = getHandRank(hand2);

    if (type1 - type2 !== 0) {
        return type1 - type2
    }
    for (let i = 0; i < hand1.cards.length; i++) {
        if (hand1.cards[i] - hand2.cards[i] !== 0) {
            return hand1.cards[i] - hand2.cards[i];
        }
    }

}

hands.sort(sortHands);

const sum = hands.reduce((acc, current, index) => {
    return acc + current.bid * (index + 1)
}, 0)

console.log(sum);




