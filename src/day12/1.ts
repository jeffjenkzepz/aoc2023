import { fetchInput } from '../utils/fetch';

function arraysEqual(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
}

function generateSequence(
  slots: number,
  gears: number,
  sequence: string = '',
  spaces: number = 0
): string[] {
  if (sequence.length === slots) {
    return [sequence];
  }

  if (spaces < gears) {
    return [
      ...generateSequence(slots, gears, sequence + '#', spaces + 1),
      ...generateSequence(slots, gears, sequence + '.', spaces)
    ];
  } else {
    return [...generateSequence(slots, gears, sequence + '.', spaces)];
  }
}

const puzzle = async () => {
    // const input: string = await fetchInput(
    //   `https://adventofcode.com/2023/day/12/input`
    // );

  const start = performance.now();

  const input: string = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

  const lines = input.split('\n');
  const validArrangements: number[] = [];

  for (const element of lines) {
    const line = element.trim();
    const [gear, position] = line.split(' ');
    

    // number of ? in gear
    const questionMarks = gear.split('').filter((x) => x === '?').length;
    // number of positions
    const positions = position.split(',').map((x) => parseInt(x));
    const positionsTotal = positions.reduce(
      (acc: number, curr: number) => acc + curr,
      0
    );
    // number of existing gears '#'
    const existingGears = gear.split('').filter((x) => x === '#').length;

    const arrangements = generateSequence(
      questionMarks,
      positionsTotal - existingGears
    );

    let valid = 0;

    arrangements.forEach((arrangement) => {
      let index = 0;
      const newGear = gear.replace(/\?/g, () => arrangement[index++]);
      const newPositions = newGear
        .split(/\./g)
        .map((x) => x.length)
        .filter((x) => x > 0);
      if (arraysEqual(newPositions, positions)) {
        valid++;
      }
    });

    console.log(line, valid);

    validArrangements.push(valid);
  }

  console.log("count", validArrangements.reduce((acc, curr) => acc + curr, 0));

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
