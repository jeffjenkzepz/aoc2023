import { Decimal } from 'decimal.js-light';
import { fetchInput } from '../utils/fetch';

Decimal.config({ rounding: 2 });

const getDistance = (a: [number, number], b: [number, number]) => {
  const [x1, y1] = a;
  const [x2, y2] = b;

  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const FACTOR = 1000000;
const getEmptySpaceDistance = (
  a: [number, number],
  b: [number, number],
  grid: string[][]
) => {
  const [x1, y1] = a;
  const [x2, y2] = b;

  const smallerX = x1 < x2 ? x1 : x2;
  const largerX = x1 > x2 ? x1 : x2;
  const smallerY = y1 < y2 ? y1 : y2;
  const largerY = y1 > y2 ? y1 : y2;

  // are there any stars between x1 and x2?
  const rowStars = grid[y1].map((col, x) => {
    if (x >= smallerX && x <= largerX && col === '*') return 1;
    return 0;
  }).reduce((a: number, b: number) => a + b, 0);

  const colStars = grid.map((row, y) => {
    // if (y >= y1 && y <= y2 && row[x1] === '*') return 1;
    if (y >= smallerY && y <= largerY && row[x1] === '*') return 1;
    return 0;
  }).reduce((a: number, b: number) => a + b, 0);

  console.log("row", rowStars, "col", colStars);

  // are there any stars between y1 and y2?

  return FACTOR * (rowStars + colStars);
};

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/11/input`
  );

  const start = performance.now();

  // const input: string = `...#......
  //   .......#..
  //   #.........
  //   ..........
  //   ......#...
  //   .#........
  //   .........#
  //   ..........
  //   .......#..
  //   #...#.....`;

  const grid = input.split('\n').map((row) => row.trim().split(''));

  console.log(grid.map((row) => row.join('')).join('\n'));
  console.log('\n\n');

  // find any empty columns (just . the whole way down)
  const emptyColumns = grid[0]
    .map((_, i) => {
      if (grid.every((row) => row[i] === '.')) {
        return i;
      }
    })
    .filter((x) => x !== undefined);

  const emptyRows = grid
    .map((row, i) => {
      if (row.every((col) => col === '.')) {
        return i;
      }
    })
    .filter((x) => x !== undefined);

  // swap empty cells for *
  emptyColumns.reverse().forEach((col) => {
    grid.forEach((row) => {
      // row.splice(col!, 0, '.');
      row[col!] = '*';
    });
  });

  // pad the grid with empty rows
  emptyRows.reverse().forEach((row) => {
    // grid.splice(row!, 0, new Array(grid[0].length).fill('.'));
    grid[row!] = new Array(grid[0].length).fill('*');
  });

  // find all galaxies
  const galaxies: [number, number][] = grid
    .map((row, y) => {
      return row.map((col, x) => {
        const galaxy: [number, number] = [x, y];

        if (col === '#') return galaxy;

        return null;
      });
    })
    .flat()
    .filter((x) => x !== null) as [number, number][];

  console.log(grid.map((row) => row.join('')).join('\n'));

  // console.log(galaxies);

  const distances: Record<string, number> = {};
  const emptySpaceDistances: Record<string, number> = {};
  let sumDistances: number = 0;

  galaxies.forEach((galaxy, index) => {
    galaxies.forEach((galaxy2, index2) => {
      if (galaxy === galaxy2) return;
      if (distances[`${index2}:${index}`] || distances[`${index}:${index2}`])
        return;

      const distance = getDistance(galaxy, galaxy2);
      console.log("key", `${index}:${index2}`);
      const emptySpaceDistance = getEmptySpaceDistance(galaxy, galaxy2, grid);

      distances[`${index}:${index2}`] = distance;
      emptySpaceDistances[`${index}:${index2}`] = emptySpaceDistance;
      sumDistances += (distance - emptySpaceDistance / FACTOR) + emptySpaceDistance;
    });
  });

  console.log(distances);
  console.log(emptySpaceDistances);
  console.log(sumDistances);
  // too low 14106924

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
