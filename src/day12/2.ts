import { fetchInput } from '../utils/fetch';

let iterations: number = 0;
// 298958

function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

const checkPositions = (
  sequence: string,
  gear: string,
  positions: number[]
): boolean => {
  let index = 0;
  const newGear = gear.replace(/\?/g, () => sequence[index++]);
  console.log(newGear);
  const newPositions = newGear
    .split(/\./g)
    .map((x) => x.length)
    .filter((x) => x > 0);
  return arraysEqual(newPositions, positions);
};

function generateSequence(
  slots: number,
  gears: number,
  positions: number[],
  gear: string,
  sequence: string = '',
  spaces: number = 0,
  result: number = 0
): number {
  iterations = iterations + 1;
  if (sequence.length === slots) {
    if (checkPositions(sequence, gear, positions)) {
      return result + 1;
    } else {
      return result;
    }
  }

  if (spaces < gears) {
    return (
      generateSequence(
        slots,
        gears,
        positions,
        gear,
        sequence + '#',
        spaces + 1,
        result
      ) +
      generateSequence(
        slots,
        gears,
        positions,
        gear,
        sequence + '.',
        spaces,
        result
      )
    );
  } else {
    return generateSequence(
      slots,
      gears,
      positions,
      gear,
      sequence + '.',
      spaces,
      result
    );
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
  const multipliers: number[] = [];

  for (const element of lines) {
    const line = element.trim();
    const [igear, iposition] = line.split(' ');

    // number of ? in gear
    const iquestionMarks = igear.split('').filter((x) => x === '?').length;
    // number of positions
    const ipositions = iposition.split(',').map((x) => parseInt(x));
    const ipositionsTotal = ipositions.reduce(
      (acc: number, curr: number) => acc + curr,
      0
    );
    // number of existing gears '#'
    const iexistingGears = igear.split('').filter((x) => x === '#').length;

    const ivalid = generateSequence(
      iquestionMarks,
      ipositionsTotal - iexistingGears,
      ipositions,
      igear
    );
    validArrangements.push(ivalid);

    const gear = `${igear}?`.repeat(2).slice(0, -1);
    const position = `${iposition},`.repeat(2).slice(0, -1);
    console.log(gear, position);

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

    const valid = generateSequence(
      questionMarks,
      positionsTotal - existingGears,
      positions,
      gear
    );

    console.log(gear, valid);

    multipliers.push(valid / ivalid);
  }

  console.log(validArrangements);
  console.log(multipliers);
  const lineTotals = validArrangements.map(
    (x, i) => x * Math.pow(multipliers[i], 4)
  );
  console.log(lineTotals);
  const total = lineTotals.reduce((acc, curr) => acc + curr, 0);

  console.log('count', total);
  console.log('iterations', iterations);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
