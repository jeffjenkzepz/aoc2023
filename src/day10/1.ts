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

    // const input: string = `7-F7-
    // .FJ|7
    // SJLL7
    // |F--J
    // LJ.LJ`;

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

  const [path1, path2] = findInitialConnectors(grid, startPos);
  console.log(getConnector(grid, startPos));
  console.log(getConnector(grid, path1));
  console.log(getConnector(grid, path2));
  const paths: Coordinates[][] = [
    [startPos, path1],
    [startPos, path2]
  ];
  console.log(paths);

  //   while (paths[0][paths[0].length - 1] !== paths[1][paths[1].length - 1]) {
  //   while (
  //     !sameCoordinates(
  //       paths[0][paths[0].length - 1],
  //       paths[1][paths[1].length - 1]
  //     )
  //   ) {
  while (
    !sameCoordinates(startPos, paths[0][paths[0].length - 1]) &&
    !sameCoordinates(startPos, paths[1][paths[1].length - 1])
  ) {
    console.log(
      grid[paths[0][paths[0].length - 1][0]][paths[0][paths[0].length - 1][1]]
    );
    console.log(
      grid[paths[1][paths[1].length - 1][0]][paths[1][paths[1].length - 1][1]]
    );
    const path1NextDirection = getNextDirection(
      paths[0][paths[0].length - 1],
      paths[0][paths[0].length - 2],
      grid[paths[0][paths[0].length - 1][0]][paths[0][paths[0].length - 1][1]]
    );
    const path2NextDirection = getNextDirection(
      paths[1][paths[1].length - 1],
      paths[1][paths[1].length - 2],
      grid[paths[1][paths[1].length - 1][0]][paths[1][paths[1].length - 1][1]]
    );

    paths[0].push(
      getNextPosition(paths[0][paths[0].length - 1], path1NextDirection)
    );
    paths[1].push(
      getNextPosition(paths[1][paths[1].length - 1], path2NextDirection)
    );
  }

  console.log(grid, startPos);
  console.log(paths);
  console.log('result', paths[0].length - 2);
  console.log('path1', (paths[0].length-1)/2);
    console.log('path2', (paths[1].length-1)/2);
  console.log('location1', grid[paths[0][(paths[1].length-1)/2][0]][paths[0][(paths[1].length-1)/2][1]]);
    console.log('location2', grid[paths[1][(paths[1].length-1)/2][0]][paths[1][(paths[1].length-1)/2][1]]);

  //  7109
  // 14246

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
