import { fetchInput } from '../utils/fetch';
import { isParsableAsInteger } from './utils';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/1/input`
  );

  // const input: string = `1abc2
  // pqr3stu8vwx
  // a1b2c3d4e5f
  // treb7uchet`;

  const inputArr: string[] = input.split('\n');
  const values: string[] = inputArr.map((line) => {
    // get the first number in the line
    let front = line.split('').find((char) => isParsableAsInteger(char));

    // get the last number in the line
    let back = line
      .split('')
      .reverse()
      .find((char) => isParsableAsInteger(char));

    return `${front}${back}`;
  });

  const sum = values.reduce((total, numStr) => total + parseInt(numStr), 0);
  console.log(sum);
};

puzzle();
