import { fetchInput } from '../utils/fetch';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/6/input`
  );

  //   const input: string = `Time:      7  15   30
  //   Distance:  9  40  200`;

  // parse the data into arrays
  const times: number[] = input
    .split('\n')[0]
    .replace('Time:', '')
    .trim()
    .split(/\s+/)
    .map((n) => parseInt(n));
  const distances: number[] = input
    .split('\n')[1]
    .replace('Distance:', '')
    .trim()
    .split(/\s+/)
    .map((n) => parseInt(n));

  console.log(times);
  console.log(distances);

  // work out possible wins
  const possibleWins: number[] = times.map((time, index) => {
    const distance = distances[index];
    const wins: number[] = Array.from(Array(time).keys()).filter(
      (i) => i * (time - i) > distance
    );

    return wins.length;
  });

  console.log(possibleWins);

  const result = possibleWins.reduce((acc, wins) => acc * wins, 1);

  console.log(result);
};

puzzle();
