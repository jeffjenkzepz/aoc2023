import { fetchInput } from '../utils/fetch';
import { checkForRowMatch, isParsableAsInteger } from './utils';
import { Number } from './types';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/3/input`
  );

  //   const input: string = `467..114..
  //   ...*......
  //   ..35..633.
  //   ......#...
  //   617*......
  //   .....+.58.
  //   ..592.....
  //   ......755.
  //   ...$.*....
  //   .664.598..`;

  // lets parse the data into a 2d array
  const data: string[][] = input.split('\n').map((row) => row.trim().split(''));

  //for each line, lets find all the indiviual numbers and check if they are valid

  const numbers: Number[] = [];

  data.forEach((row, rowIndex) => {
    const rowNumbers: Number[] = [];
    let num: Number = {
      number: '',
      valid: false,
      line: rowIndex,
      start: -1,
      end: -1
    };

    row.forEach((char, charIndex) => {
      // if its a number
      if (isParsableAsInteger(char)) {
        num.number += char;
        num.end = charIndex;
        if (num.start === -1) num.start = charIndex;
        return;
      }

      if (num.number.length > 0) rowNumbers.push(num);
      num = {
        number: '',
        valid: false,
        line: rowIndex,
        start: -1,
        end: -1
      };
      return;
    });

    // if we got to the end and num has a value lets push it
    if (num.number.length > 0) rowNumbers.push(num);

    rowNumbers.forEach((num, index) => {
      // check adjacent characters in this row
      if (
        (num.start > 0 && data[num.line][num.start - 1] !== '.') ||
        (num.end < data[num.line].length - 1 &&
          data[num.line][num.end + 1] !== '.')
      ) {
        return (rowNumbers[index].valid = true);
      }

      // lets check the row above
      if (num.line > 0) {
        const { match } = checkForRowMatch(data, num.line - 1, num);

        if (match) {
          rowNumbers[index].valid = true;
          return;
        }
      }

      // lets check the row below
      if (num.line < data.length - 1) {
        const { match } = checkForRowMatch(data, num.line + 1, num);
        if (match) {
          rowNumbers[index].valid = true;
          return;
        }
      }
    });

    // push the numbers to the global numbers array
    numbers.push(...rowNumbers);
  });

  const sum = numbers
    .filter((num) => num.valid)
    .reduce((acc, num) => {
      return acc + parseInt(num.number);
    }, 0);

  console.log(sum);
};

puzzle();
