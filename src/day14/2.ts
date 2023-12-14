
import { fetchInput } from '../utils/fetch';

const gridCount = (grid: string[][]): number => {
  return grid.reduce((acc, row, index) => {
    return (
      acc +
      row.reduce((acc, cell) => {
        return cell === 'O' ? acc + row.length - index : acc;
      }, 0)
    );
  }, 0);
};

function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const rollCache: { [key: string]: string[] } = {};

const rollBoldersByCol = (col: string[]): string[] => {
  // const key = simpleHash(col.join(''));

  // if (rollCache[key]) {
  //   return rollCache[key].map((cell) => cell);
  // }

  let oCount = 0;
  for (let row = col.length - 1; row >= 0; row--) {
    if (col[row] === 'O') oCount++;
    if (col[row] === '.' && oCount > 0) {
      col.splice(row, 1);
      col.splice(row + oCount, 0, '.');
    }
    if (col[row] === '#') oCount = 0;
  }

  // rollCache[key] = col.map((cell) => cell);

  return col;
};

const rollNorth = (grid: string[][]): string[][] => {
  for (let i = 0; i < grid[0].length; i++) {
    const col = grid.map((row) => row[i]);
    const newCol = rollBoldersByCol(col);
    newCol.forEach((cell, j) => {
      grid[j][i] = cell;
    });
  }

  return grid;
};

const rollSouth = (grid: string[][]): string[][] => {
  for (let i = 0; i < grid[0].length; i++) {
    const col = grid.map((row) => row[i]);
    const newCol = rollBoldersByCol(col.reverse());
    newCol.reverse().forEach((cell, j) => {
      grid[j][i] = cell;
    });
  }
  return grid;
};

const rollWest = (grid: string[][]): string[][] => {
  return grid.map((row) => rollBoldersByCol(row));
};

const rollEast = (grid: string[][]): string[][] => {
  return grid.map((row) => rollBoldersByCol(row.reverse()).reverse());
};
const directionCache: {
  [key: string]: {
    grid: string[][];
    gridCount: number;
    count: number;
  };
} = {};

const rollIndex: Record<string, number> = {};

const rollCycles = (grid: string[][], cycles: number = 1): string[][] => {
  for (let i = 0; i < cycles; i++) {
    const key = simpleHash(grid.map((row) => row.join('')).join(''));

    if (directionCache[key]) {
      // console.log("cache hit");
      // console.log('key', key);
      // console.log('csh', directionCache[key].map((row) => row.join('')).join(''));
      // make a deep copy

      grid = directionCache[key].grid.map((row) => [...row]);
      directionCache[key].count++;

      if (directionCache[key].count === 2) {
        rollIndex[i] = directionCache[key].gridCount;
      }

      // if we go to cycle 3 we can get out of here
      if (directionCache[key].count === 3) {
        console.log('completed 2 cycles of repetition', i, 'passes');
        break;
      }

      continue;
    }

    const northGrid = rollNorth(grid);
    const westGrid = rollWest(northGrid);
    const southGrid = rollSouth(westGrid);
    const eastGrid = rollEast(southGrid);

    //directionCache[key] = eastGrid;
    // make a deep copy
    grid = eastGrid.map((row) => [...row]);
    directionCache[key] = {
      grid,
      gridCount: gridCount(grid),
      count: 1
    };

    // console.log('\n\ncycle', gridCount(grid));
    // grid.forEach((element) => {
    //   console.log(element.join(''));
    // });
  }
  return grid;
};

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/14/input`
  );

  const start = performance.now();

  // const input: string = `O....#....
  // O.OO#....#
  // .....##...
  // OO.#O....O
  // .O.....O#.
  // O.#..O.#.#
  // ..O..#O..O
  // .......O..
  // #....###..
  // #OO..#....`;

  const lines: string[] = input.split('\n');
  const grid: string[][] = lines.map((line) => line.trim().split(''));
  grid.forEach((element) => {
    console.log(element.join(''));
  });

  const repeater = 1000000000;
  const newGrid = rollCycles(grid, repeater);
  console.log(rollIndex);

  const indexCount = Object.keys(rollIndex).length;
  const lowestIndex =
    Math.min(...Object.keys(rollIndex).map((key) => parseInt(key)));

  const repeatIndex = lowestIndex + ((repeater - lowestIndex - 1)% 4);

  console.log('repeatIndex', indexCount, lowestIndex, repeatIndex);

  console.log(rollIndex[repeatIndex]);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
