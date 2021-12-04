fs = require('fs')

const parseInput = (input) => {
    let numbers = input.splice(0, 2).toString().split(',')
    let cards = []
    let card = []
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            cards.push(card)
            card = []
        } else {
            card.push(input[i].split(' ').filter((el) => el !== '').map(number => ({number: Number(number), checked: false})))
            if (i === input.length - 1) cards.push(card)
        }
    }
    return {numbers, cards}
}

const checkCards = (cards, draw) => {
    for (const card of cards) {
        for (const row of card) {
            for (const el of row) {
                if (el.number === Number(draw)) el.checked = true
            }
        }
    }
}

const IsThereAWinner = (cards) => {
    for (const card of cards) {
        let horBingo = card.filter(row => row.checked).length == 5;

        let vertBingo = false;
        for (let i = 0; i < 5; i++) {
            if (card[0][i].checked && card[1][i].checked && card[2][i].checked && card[3][i].checked && card[4][i].checked) {
                vertBingo = true;
            }
        }

        if (horBingo || vertBingo) {
            return card
        }
    }
    return false
}


const text = fs.readFileSync('./day4/input.txt', 'utf-8')
let input = text.split('\n');
let {numbers, cards} = parseInput(input);

for (let i = 0; i < numbers.length; i++) {
    let currentNumber = numbers[i]
    checkCards(cards, currentNumber)

    if (i >= 5) {
        const winningCard = IsThereAWinner(cards)
        if (winningCard) {
            let notChecked = 0
            for (const row of winningCard) {
                for (const el of row) {
                    if (!el.checked) notChecked += el.number
                }
            }
            console.log(notChecked * Number(currentNumber));
            break;
        }
    }
}