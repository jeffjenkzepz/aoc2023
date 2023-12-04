import { fetchInput } from '../utils/fetch';

const puzzle = async () => {
  // const input: string = await fetchInput(
  //   `https://adventofcode.com/2023/day/4/input`
  // );

  const input: string = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

  // lets parse the data into a 2d array
  const data: string[] = input.split('\n');

  const cards = data.map((row, index) => {
    // lets process the input into a usable format
    const [cardName, allNumbers] = row.trim().split(':');
    const [winningNumbers, myNumbers] = allNumbers.split('|');
    const cardData = {
      raw: row,
      name: cardName.trim(),
      winningNumbers: winningNumbers
        .trim()
        .split(/\s+/) // split on any number of spaces
        .map((num) => parseInt(num)),
      myNumbers: myNumbers
        .trim()
        .split(/\s+/) // split on any number of spaces
        .map((num) => parseInt(num))
    };

    // lets check if any of my numbers are winning numbers
    const myWinningNumbers = cardData.winningNumbers.filter((num) => {
      return cardData.myNumbers.includes(num);
    });

    return {
      ...cardData,
      myWinningNumbers,

    };
  });

  const total = cards.reduce((acc, card) => {
    if (card.myWinningNumbers.length === 0) return acc;

    const points = Math.pow(2, card.myWinningNumbers.length - 1);
    return acc + points;
  }, 0);

  console.log(cards);
  console.log(total);
};

puzzle();
