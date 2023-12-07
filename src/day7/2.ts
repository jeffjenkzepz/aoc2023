import { fetchInput } from '../utils/fetch';

export const HANDS = {
  FIVE_OF_A_KIND: 'FIVE_OF_A_KIND',
  FOUR_OF_A_KIND: 'FOUR_OF_A_KIND',
  FULL_HOUSE: 'FULL_HOUSE',
  THREE_OF_A_KIND: 'THREE_OF_A_KIND',
  TWO_PAIRS: 'TWO_PAIRS',
  ONE_PAIR: 'ONE_PAIR',
  HIGH_CARD: 'HIGH_CARD'
};

export const CARD_SCORES: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2
};

export const getHand = (cards: Record<string, number>) => {
  const jokers = cards['J'] || 0;

  if (Object.keys(cards).find((card) => cards[card] === 5))
    return HANDS.FIVE_OF_A_KIND;

  if (Object.keys(cards).find((card) => cards[card] === 4)) {
    if (jokers === 4) return HANDS.FIVE_OF_A_KIND;
    if (jokers === 1) return HANDS.FIVE_OF_A_KIND;
    return HANDS.FOUR_OF_A_KIND;
  }

  if (
    Object.keys(cards).find((card) => cards[card] === 3) &&
    Object.keys(cards).find((card) => cards[card] === 2)
  ) {
    if (jokers === 2 || jokers === 3) return HANDS.FIVE_OF_A_KIND;
    return HANDS.FULL_HOUSE;
  }

  if (Object.keys(cards).find((card) => cards[card] === 3)) {
    if (jokers === 3 || jokers === 1) return HANDS.FOUR_OF_A_KIND;
    return HANDS.THREE_OF_A_KIND;
  }

  if (Object.keys(cards).filter((card) => cards[card] === 2).length === 2) {
    if (jokers === 2) return HANDS.FOUR_OF_A_KIND;
    if (jokers === 1) return HANDS.FULL_HOUSE;
    return HANDS.TWO_PAIRS;
  }

  if (Object.keys(cards).find((card) => cards[card] === 2)) {
    if (jokers === 2) return HANDS.THREE_OF_A_KIND;
    if (jokers === 1) return HANDS.THREE_OF_A_KIND;
    return HANDS.ONE_PAIR;
  }

  if (jokers === 1) return HANDS.ONE_PAIR;

  return HANDS.HIGH_CARD;
};

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/7/input`
  );

  const start = performance.now();

  // const input: string = `32T3K 765
  // T55J5 684
  // KK677 28
  // KTJJT 220
  // QQQJA 483`;

  const lines = input.split('\n');
  const hands: Record<
    string,
    {
      hand: string;
      type: string;
      bet: number;
      points: number;
      cards: Record<string, number>;
    }
  > = {};
  const handOrder: string[] = [];
  const handsByType: Record<string, string[]> = Object.keys(HANDS).reduce(
    (acc: Record<string, string[]>, hand) => {
      acc[hand] = [];
      return acc;
    },
    {}
  );

  // get all the hand data we need to process scores
  lines.forEach((line) => {
    const [hand, value] = line.trim().split(' ');
    handOrder.push(hand);
    const bet = parseInt(value);
    const cards: Record<string, number> = {};

    hand.split('').forEach((card) => {
      if (cards[card]) cards[card] += 1;
      else cards[card] = 1;
    });

    // check what type of hand it is
    const type = getHand(cards);
    handsByType[type].push(hand);

    hands[hand] = {
      hand,
      type,
      bet,
      points: 0,
      cards
    };
  });

  // order individual hands within each type
  Object.keys(handsByType).forEach((handType) => {
    handsByType[handType] = handsByType[handType].sort(
      (a: string, b: string): number => {
        const cardsA: string[] = a.split('');
        const cardsB: string[] = b.split('');
        for (let i = 0; i < cardsA.length; i++) {
          if (cardsA[i] === cardsB[i]) continue;

          return CARD_SCORES[cardsB[i]] - CARD_SCORES[cardsA[i]];
        }
        return 0;
      }
    );
  });

  // merge all hand arrays into one in order of hand type weight
  const allHandsInOrder = Object.keys(HANDS).reduce(
    (acc: string[], handType) => {
      return [...acc, ...handsByType[handType]];
    },
    []
  );

  const score = allHandsInOrder.reduceRight(
    (acc: number, hand, reverseIndex) => {
      const index = allHandsInOrder.length - reverseIndex;
      const score = hands[hand].bet * index;
      return acc + score;
    },
    0
  );

  Object.keys(handsByType).forEach((handType) => {
    const hands = handsByType[handType];

    // only filter only hands containing the joker
    console.log(
      handType,
      hands.filter((hand) => hand.includes('J'))
    );
  });

  console.log(score);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
