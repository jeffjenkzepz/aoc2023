import { fetchInput } from '../utils/fetch';
import { Connector, Coordinates } from './types';
import {
  findInitialConnectors,
  getConnector,
  getNextDirection,
  getNextPosition,
  sameCoordinates
} from './utils';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/10/input`
  );

  const start = performance.now();

    // const input: string = `FF7FSF7F7F7F7F7F---7
    // L|LJ||||||||||||F--J
    // FL-7LJLJ||||||LJL-77
    // F--JF--7||LJLJ7F7FJ-
    // L---JF-JLJ.||-FJLJJ7
    // |F|F-JF---7F7-L7L|7|
    // |FFJF7L7F-JF7|JL---7
    // 7-L-JL7||F7|L7F-7F7|
    // L.L7LFJ|||||FJL7||LJ
    // L7JLJL-JLJLJL--JLJ.L`;

    // const input: string = `-L|F7
    // 7S-7|
    // L|7||
    // -L-J|
    // L|-JF`;

  const grid: Connector[][] = input
    .split('\n')
    .map((line) => line.trim().split('') as Connector[]);

  // find the start position
  let startPos: Coordinates = [0, 0];

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    const start = row.indexOf('S');

    if (start !== -1) {
      startPos = [i, start];
      break;
    }
  }

  console.log(grid, startPos);

  const [path1] = findInitialConnectors(grid, startPos);
  const path: Coordinates[] = [startPos, path1];
  console.log('path', path);

  while (
    !sameCoordinates(startPos, path[path.length - 1])
  ) {
    // console.log(
    //   grid[path[path.length - 1][0]][path[path.length - 1][1]]
    // );
    const path1NextDirection = getNextDirection(
      path[path.length - 1],
      path[path.length - 2],
      grid[path[path.length - 1][0]][path[path.length - 1][1]]
    );

    path.push(
      getNextPosition(path[path.length - 1], path1NextDirection)
    );
  }

  // loop through grid and replace any coordiantes not in path array with '.'
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      const col = row[j];
      const coord: Coordinates = [i, j];

      if (!path.some((pathCoord) => sameCoordinates(pathCoord, coord))) {
        grid[i][j] = '.';
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    console.log(row.join(''));
  }

  //  7109
  // 14246

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
