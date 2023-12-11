import { fetchInput } from '../utils/fetch';

const getDistance = (a: [number, number], b: [number, number]) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const puzzle = async () => {
    const input: string = await fetchInput(
      `https://adventofcode.com/2023/day/11/input`
    );

  const start = performance.now();

//   const input: string = `...#......
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

  // pad the grid with empty columns
  emptyColumns.reverse().forEach((col) => {
    grid.forEach((row) => {
      row.splice(col!, 0, '.');
    });
  });

  // pad the grid with empty rows
  emptyRows.reverse().forEach((row) => {
    grid.splice(row!, 0, new Array(grid[0].length).fill('.'));
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

//   console.log(galaxies);

  const distances: Record<string, number> = {};
  let sumDistances: number = 0;

  galaxies.forEach((galaxy, index) => {
    galaxies.forEach((galaxy2, index2) => {
      if (galaxy === galaxy2) return;
      if (distances[`${index2}:${index}`] || distances[`${index}:${index2}`])
        return;

      const distance = getDistance(galaxy, galaxy2);

      distances[`${index}:${index2}`] = distance;
      sumDistances += distance;
    });
  });

   console.log(Object.keys(distances).length);
  console.log(sumDistances);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
