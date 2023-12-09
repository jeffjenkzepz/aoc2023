import { fetchInput } from '../utils/fetch';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function lcmOfArray(array: number[]): number {
  let multiple = array[0];
  array.forEach(function (n) {
    multiple = lcm(multiple, n);
  });
  return multiple;
}

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/8/input`
  );

  const start = performance.now();

  // const input: string = `LR

  // 11A = (11B, XXX)
  // 11B = (XXX, 11Z)
  // 11Z = (11B, XXX)
  // 22A = (22B, XXX)
  // 22B = (22C, 22C)
  // 22C = (22Z, 22Z)
  // 22Z = (22B, 22B)
  // XXX = (XXX, XXX)`;

  const directions = input
    .split('\n\n')[0]
    .trim()
    .split('')
    .map((d) => d.toLowerCase());
  const map: Record<string, { r: string; l: string }> = {};
  const paths: Record<
    string,
    { location: string; found: boolean; steps: number }
  > = {};

  input
    .split('\n\n')[1]
    .trim()
    .split('\n')
    .forEach((line, i) => {
      const [index, rightLeft] = line.trim().split(' = ');

      // if index ends with A then add it to paths
      if (index.endsWith('A')) {
        paths[index] = { location: index, found: false, steps: 1 };
      }

      const [l, r] = rightLeft.replace('(', '').replace(')', '').split(', ');
      map[index.trim()] = { r, l };
    });

  console.log(directions);
  console.log(paths);
  // console.log(map);

  let steps: number = 0;
  let allPathsFound: boolean = false;

  while (!allPathsFound) {
    // if (steps % 10000000 === 0) console.log('Checked ', steps);
    allPathsFound = true;
    const direction: 'r' | 'l' = directions[steps % directions.length] as
      | 'r'
      | 'l';

    Object.keys(paths).forEach((key) => {
      const path = paths[key];
      path.location = map[path.location][direction];
      // path.found = map[path.location][direction].endsWith('Z');
      if (path.location.endsWith('Z')) {
        path.found = true;
      }

      if (!path.found) {
        path.steps++;
        allPathsFound = false;
      }
    });

    // console.log(steps, Object.keys(paths).map((key) => paths[key].found));

    steps++;
  }

  console.log(paths);
  console.log(steps);

  const iterationsToMatch: number[] = Object.keys(paths).map(
    (key) => paths[key].steps
  );

  console.log(iterationsToMatch);

  // we need to find the largest common multiple for all elements in the array
  console.log(lcmOfArray(iterationsToMatch));

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
