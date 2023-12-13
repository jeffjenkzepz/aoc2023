import { fetchInput } from '../utils/fetch';

function isOffByOne(s1: string, s2: string): number {
  // console.log(s1);
  // console.log(s2);
  let index = -1;
  if (s1.length !== s2.length) return index;

  let differences = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      differences++;
      index = i;
    }
  }

  if (differences !== 1) return -1;
  
  return index;
}

// recusrsive function to find a match
const findMatch = (
  ogPattern: string[],
  start: number = 1,
  count: number = 1,
  bitflip: boolean = false,
  bitflipPattern: string[] = []
): number | null => {
  // console.log(pattern, start, count);
  const pattern = bitflip ? bitflipPattern : ogPattern;

  if (!bitflip && pattern[start - count] && pattern[start + count - 1]) {
    const offByOneIndex = isOffByOne(
      pattern[start - count],
      pattern[start + count - 1]
    );
    // console.log(start, count, 'OFF BY ONE INDEX', offByOneIndex);

    // check if the patterns are off by one character
    if (offByOneIndex >= 0) {
      // console.log('OFF BY ONE', offByOneIndex, pattern[start - count], pattern[start + count - 1]);
      if (findMatch(ogPattern, start, count, true, pattern.map((line, index) => {
        if (index === start - count) {
          const replace = line[offByOneIndex] === '#' ? '.' : '#';
          return line.substr(0, offByOneIndex) + replace + line.substr(offByOneIndex + 1);
        }
        return line;
      }))) {
        return findMatch(ogPattern, start, count, true, pattern.map((line, index) => {
          if (index === start - count) {
            const replace = line[offByOneIndex] === '#' ? '.' : '#';
            return line.substr(0, offByOneIndex) + replace + line.substr(offByOneIndex + 1);
          }
          return line;
        }));
      }

      if (findMatch(ogPattern, start, count, true, pattern.map((line, index) => {
        if (index === start + count - 1) {
          const replace = line[offByOneIndex] === '#' ? '.' : '#';
          return line.substr(0, offByOneIndex) + replace + line.substr(offByOneIndex + 1);
        }
        return line;
      }))) {
        return findMatch(ogPattern, start, count, true, pattern.map((line, index) => {
          if (index === start + count - 1) {
            const replace = line[offByOneIndex] === '#' ? '.' : '#';
            return line.substr(0, offByOneIndex) + replace + line.substr(offByOneIndex + 1);
          }
          return line;
        }));
      }
    }
  }

  if (
    pattern[start - count] &&
    pattern[start + count - 1] &&
    pattern[start - count] === pattern[start + count - 1]
  ) {
    // console.log('MATCH CHECK NEXT LINE');
    return findMatch(ogPattern, start, count + 1, bitflip, bitflipPattern);
  } else if (
    (!pattern[start - count] || !pattern[start + count - 1]) &&
    count >= 1
  ) {
    if (bitflip) return start;
    if (start > pattern.length) return null;
  }

  // console.log('CHECK NEXT POSITION', start, 1);
  return findMatch(ogPattern, start + 1, 1, false);
};

const findMirrorVertical = (
  pattern: string[][]
): number | null => {
  // compile array of all possible columns
  const columns: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      columns[j] = columns[j] ? columns[j] + pattern[i][j] : pattern[i][j];
    }
  }
  //   console.log(columns);
  console.log("VERTICAL");
  let mirrorPosition: number | null = findMatch(columns);

  if (mirrorPosition && mirrorPosition >= 1 && mirrorPosition < columns.length)
    return mirrorPosition;

  return null;
};

const findMirrorHorizontal = (
  pattern: string[][]
): number | null => {
  // compile array of all possible columns
  const columns: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    columns[i] = pattern[i].join('');
  }
  //   console.log(columns);
  console.log("HORIZONTAL");
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

    // const input: string = `..#.#.#
    // #####..
    // ...###.
    // ...#..#
    // ##..##.
    // ###..#.
    // ##.###.
    // ......#
    // #.###.#
    // ####...
    // ..##..#
    // ##.....
    // ##.##.#
    // ##.####
    // ##.####`;

  const patternsInput = input.split('\n\n');

  const patterns: string[][][] = patternsInput.map((x) => {
    return x.split('\n').map((x) => x.trim().split(''));
  });

  //    console.log(patterns);
  const verticalMirrorPositions: number[] = [];
  const horizontalMirrorPositions: number[] = [];

  patterns.forEach((pattern, index) => {
    const mirrorPositionVertical = findMirrorVertical(pattern);
    const mirrorPositionHorizontal = findMirrorHorizontal(pattern);
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
  // 31603

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
