import { fetchInput } from '../utils/fetch';

const rollBoldersByCol = (
  col: string[],
  row: number = 1,
  count: number = 0
): string[] => {
  const currentRow = row - count;
  const previousRow = row - count - 1;

  if (col[currentRow] === 'O' && col[previousRow] === '.') {
    col[currentRow] = '.';
    col[previousRow] = 'O';
  }

  count++;

  if (count < row) {
    return rollBoldersByCol(col, row, count);
  }

  if (row < col.length - 1) {
    return rollBoldersByCol(col, row + 1, 0);
  }

  return col;
};

const rollBolders = (grid: string[][]): string[][] => {
  for (let i = 0; i < grid[0].length; i++) {
    const col = grid.map((row) => row[i]);
    const newCol = rollBoldersByCol(col);
    newCol.forEach((cell, j) => {
      grid[j][i] = cell;
    });
  }
  return grid;
};

const puzzle = async () => {
    // const input: string = await fetchInput(
    //   `https://adventofcode.com/2023/day/14/input`
    // );

  const start = performance.now();

  const input: string = `O....#....
  O.OO#....#
  .....##...
  OO.#O....O
  .O.....O#.
  O.#..O.#.#
  ..O..#O..O
  .......O..
  #....###..
  #OO..#....`;

  const lines: string[] = input.split('\n');
  const grid: string[][] = lines.map((line) => line.trim().split(''));
  grid.forEach((element) => {
    console.log(element.join(''));
  });

  const newGrid = rollBolders(grid);

  console.log('\n----------------\n');
  newGrid.forEach((element) => {
    console.log(element.join(''));
  });

  const count = newGrid.reduce((acc, row, index) => {
    return (
      acc +
      row.reduce((acc, cell) => {
        return cell === 'O' ? acc + row.length - index : acc;
      }, 0)
    );
  }, 0);

  console.log(count);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
