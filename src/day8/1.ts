import { fetchInput } from '../utils/fetch';

const puzzle = async () => {
    const input: string = await fetchInput(
      `https://adventofcode.com/2023/day/8/input`
    );

  const start = performance.now();

//   const input: string = `LLR

//   AAA = (BBB, BBB)
//   BBB = (AAA, ZZZ)
//   ZZZ = (ZZZ, ZZZ)`;

  const directions = input.split('\n\n')[0].trim().split('').map((d) => d.toLowerCase());
  const map: Record<string, { r: string; l: string }> = {};
  let location: string = 'AAA';

  input
    .split('\n\n')[1]
    .trim()
    .split('\n')
    .forEach((line, i) => {
      const [index, rightLeft] = line.trim().split(' = ');

      const [l, r] = rightLeft.replace('(', '').replace(')', '').split(', ');
      map[index.trim()] = { r, l };
    });

  console.log(directions);
  console.log(map);

  let steps: number = 0;
  let visitedLocations: string[] = [];
  console.log(location);

  while (location !== 'ZZZ') {
    const direction: 'r' | 'l' = directions[steps % directions.length] as
      | 'r'
      | 'l';
      visitedLocations.push(`${location}-${direction}-${map[location][direction]}`);
    location = map[location][direction];
    
    steps++;
  }

  console.log(location);
  console.log(visitedLocations);
  console.log(steps);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
