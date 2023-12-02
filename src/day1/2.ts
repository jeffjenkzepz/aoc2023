import { fetchInput } from '../utils/input';
import { isParsableAsInteger } from './utils';

const input: string = fetchInput('src/day1/1.input.txt');
const numberRegex: RegExp = /(one|two|three|four|five|six|seven|eight|nine)/g;
const numberRegexReverse: RegExp =
  /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g;
const numberLookup: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};
const numberLookupReverse: Record<string, string> = {
  eno: '1',
  owt: '2',
  eerht: '3',
  ruof: '4',
  evif: '5',
  xis: '6',
  neves: '7',
  thgie: '8',
  enin: '9'
};
function parseStringNumbers(
  str: string,
  regex: RegExp,
  lookup: Record<string, string>
): string {
  return str.replace(regex, (word) => {
    return lookup[word];
  });
}

let inputArr = input.split('\n');
let values = inputArr.map((line) => {
  let front = parseStringNumbers(line, numberRegex, numberLookup)
    .split('')
    .find((char: string) => isParsableAsInteger(char));
  let back = parseStringNumbers(
    line.split('').reverse().join(''),
    numberRegexReverse,
    numberLookupReverse
  )
    .split('')
    .find((char: string) => isParsableAsInteger(char));
  return `${front}${back}`;
});

console.log(values);
console.log(values.length);
const sum = values.reduce((total, numStr) => total + parseInt(numStr), 0);
console.log(sum);
