import { fetchInput } from '../utils/fetch';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/6/input`
  );

  // const input: string = `Time:      7  15   30
  // Distance:  9  40  200`;

  // parse the data into arrays
  const time: number = parseInt(
    input.split('\n')[0].replace('Time:', '').trim().split(/\s+/).join('')
  );
  const distance: number = parseInt(
    input.split('\n')[1].replace('Distance:', '').trim().split(/\s+/).join('')
  );

  console.log(time);
  console.log(distance);

  const wins: number = Array.from(Array(time).keys()).filter(
    (i) => i * (time - i) > distance
  ).length;

  console.log(wins);
};

puzzle();
