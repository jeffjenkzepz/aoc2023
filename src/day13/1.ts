import { fetchInput } from '../utils/fetch';

// recusrsive function to find a match
const findMatch = (
  pattern: string[],
  start: number = 1,
  count: number = 1
): number | null => {
  //   console.log(
  //     'find match',
  //     start,
  //     count,
  //     pattern[start - count],
  //     pattern[start + count - 1]
  //   );
  console.log(pattern, start, count);
  if (
    pattern[start - count] &&
    pattern[start + count - 1] &&
    pattern[start - count] === pattern[start + count - 1]
  ) {
    console.log('MATCH CHECK NEXT LINE');
    return findMatch(pattern, start, count + 1);
  } else if (
    (!pattern[start - count] || !pattern[start + count - 1]) &&
    count >= 1
  ) {
    console.log('BREAK OUT');
    return start;
  }

  console.log('CHECK NEXT POSITION', start, 1);
  return findMatch(pattern, start + 1, 1);
};

const findMirrorVertical = (
  pattern: string[][],
  position: 0
): number | null => {
  // compile array of all possible columns
  const columns: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      columns[j] = columns[j] ? columns[j] + pattern[i][j] : pattern[i][j];
    }
  }
  //   console.log(columns);
  let mirrorPosition: number | null = findMatch(columns);

  if (mirrorPosition && mirrorPosition >= 1 && mirrorPosition < columns.length)
    return mirrorPosition;

  return null;
};

const findMirrorHorizontal = (
  pattern: string[][],
  position: 0
): number | null => {
  // compile array of all possible columns
  const columns: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    columns[i] = pattern[i].join('');
  }
  //   console.log(columns);
  let mirrorPosition: number | null = findMatch(columns);

  if (mirrorPosition && mirrorPosition >= 1 && mirrorPosition < columns.length)
    return mirrorPosition;

  return null;
};

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/13/input`
  );

  const start = performance.now();

  //   const input: string = `#.##..##.
  // ..#.##.#.
  // ##......#
  // ##......#
  // ..#.##.#.
  // ..##..##.
  // #.#.##.#.

  // #...##..#
  // #....#..#
  // ..##..###
  // #####.##.
  //  #####.##.
  // ..##..###
  // #....#..#`;

  const patternsInput = input.split('\n\n');

  const patterns: string[][][] = patternsInput.map((x) => {
    return x.split('\n').map((x) => x.trim().split(''));
  });

  //    console.log(patterns);
  const verticalMirrorPositions: number[] = [];
  const horizontalMirrorPositions: number[] = [];

  patterns.forEach((pattern, index) => {
    const mirrorPositionVertical = findMirrorVertical(pattern, 0);
    const mirrorPositionHorizontal = findMirrorHorizontal(pattern, 0);
    console.log('\n\n');
    console.log(
      'vertical',
      mirrorPositionVertical,
      'horizontal',
      mirrorPositionHorizontal
    );
    for (let i = 0; i < pattern.length; i++) {
      console.log(pattern[i].join(''));
    }

    if (mirrorPositionVertical)
      verticalMirrorPositions.push(mirrorPositionVertical);
    if (mirrorPositionHorizontal)
      horizontalMirrorPositions.push(mirrorPositionHorizontal);
  });

  const total =
    verticalMirrorPositions.reduce(
      (acc: number, curr: number) => acc + curr,
      0
    ) +
    horizontalMirrorPositions.reduce(
      (acc: number, curr: number) => acc + curr * 100,
      0
    );

  console.log(verticalMirrorPositions);
  console.log(horizontalMirrorPositions);

  console.log(total);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
