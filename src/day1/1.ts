import { fetchInput } from '../utils/input';
const input: string = fetchInput('src/day1/1.input.txt');

function isParsableAsInteger(str: string) {
  const num = parseInt(str);
  return Number.isInteger(num);
}

const inputArr: string[] = input.split('\n');
const values: string[] = inputArr.map((line) => {
  // get the first number in the line
  let front = line.split('').find((char) => isParsableAsInteger(char));
  
  // get the last number in the line
  let back = line.split('').reverse().find((char) => isParsableAsInteger(char));

  return `${front}${back}`;
});

const sum = values.reduce((total, numStr) => total + parseInt(numStr), 0);
console.log(sum);
