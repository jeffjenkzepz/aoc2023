import { Decimal } from 'decimal.js-light';
import { fetchInput } from '../utils/fetch';

const getAllLineSequences = (lines: number[]): number[][] => {
  const sequences: number[][] = [[...lines]];
  let seqCount = 0;

  while (
    sequences[seqCount] &&
    // check if any of the values are not 0
    !sequences[seqCount].reduce((a, b) => a && new Decimal(b).eq(0), true)
  ) {
    const seq = sequences[seqCount];
    const newSeq: number[] = [];
    for (let i = 1; i < seq.length; i++) {
      newSeq.push(new Decimal(seq[i]).minus(seq[i - 1]).toNumber());
    }
    sequences.push(newSeq);
    seqCount++;
  }

  return sequences;
};

const puzzle = async () => {
  // const input: string = await fetchInput(
  //   `https://adventofcode.com/2023/day/9/input`
  // );

  const start = performance.now();

  const input: string = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

  // YOUR PUZZLE CODE GOES HERE
  const lines: string[] = input.split('\n');
  const startSequences: number[][] = lines.map((line) =>
    line
      .trim()
      .split(' ')
      .map((num) => parseInt(num)).reverse()
  );
  let results: number[][][] = [];

  for (let i = 0; i < startSequences.length; i++) {
    results[i] = getAllLineSequences(startSequences[i]);
  }

  console.log('startSequences', startSequences);
  console.log('results', results);
  results = results.map((result) => {
    const sequences: number[][] = [...result];

    sequences[sequences.length - 1].push(0);

    for (let i = sequences.length - 1; i > 0; i--) {
      const bottomValue = sequences[i][sequences[i].length - 1];
      const leftValue = sequences[i - 1][sequences[i - 1].length - 1];
      sequences[i - 1].push(
        new Decimal(bottomValue).plus(leftValue).toNumber()
      );
    }
    return sequences;
  });

  //   console.log(
  //     'results',
  //     results.map((result) => result[0])
  //   );

  let sum = 0;

  results.forEach((result, index) => {
    const last = result[0][result[0].length - 1];
    // console.log('line', new Decimal(startSequences[index][startSequences[index].length - 1]).eq(result[0][result[0].length - 2]), result[0][result[0].length - 1]);
    sum = new Decimal(sum).plus(last).toNumber();
  });

  console.log('line count', lines.length);
  console.log('results count', results.length);
  console.log('sum', sum);
  //your answer is too high 1819125980
  //                        1819125966

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
