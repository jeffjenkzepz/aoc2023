import { fetchInput } from '../utils/fetch';
import { CONNECTOR_INSIDE_DIRECTION } from './constants';
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

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    console.log(row.join(''));
  }

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

  // console.log(grid, startPos);

  const [path1] = findInitialConnectors(grid, startPos);
  const path: Coordinates[] = [startPos, path1];
  //console.log('path', path);

  while (!sameCoordinates(startPos, path[path.length - 1])) {
    // console.log(
    //   grid[path[path.length - 1][0]][path[path.length - 1][1]]
    // );
    const path1NextDirection = getNextDirection(
      path[path.length - 1],
      path[path.length - 2],
      grid[path[path.length - 1][0]][path[path.length - 1][1]]
    );

    path.push(getNextPosition(path[path.length - 1], path1NextDirection));
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

  // loop though path array and replace any '.' on inside track with 'X'
  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1];
    const current = path[i];
    const direction = getNextDirection(
      current,
      prev,
      grid[current[0]][current[1]]
    );
    const connector = getConnector(grid, current);

    const insideConnector = CONNECTOR_INSIDE_DIRECTION[connector][direction];
    if (insideConnector && insideConnector.length > 0) {
      insideConnector.forEach((direction) => {
        const insideConnectorCoord = getNextPosition(current, direction);
        const insideConnectorValue =
          grid[insideConnectorCoord[0]][insideConnectorCoord[1]];
        if (insideConnectorValue === '.') {
          grid[insideConnectorCoord[0]][insideConnectorCoord[1]] = 'X';
        }
      });
    }
  }

  // lets flip any `.` thats between two `X` to `X`
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    let gameOn = false;
    let indexes: number[] = [];
    let tempIndexes: number[] = [];

    for (let j = 0; j < row.length; j++) {
      const col = row[j];

      if (col === 'X') {
        indexes = [...indexes, ...tempIndexes];
        tempIndexes = [];
        gameOn = true;
      }

      if (col === '.' && gameOn) {
        tempIndexes.push(j);
        //grid[i][j] = 'X';
      }

      if (col !== '.' && col !== 'X') {
        tempIndexes = [];
        gameOn = false;
      }
    }

    indexes.forEach((index) => {
      grid[i][index] = 'X';
    });
  }

  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    console.log(row.join(''));
    // count all the x's
    for (let j = 0; j < row.length; j++) {
      const col = row[j];

      if (col === 'X') {
        count++;
      }
    }
  }

  console.log('count', count);

  //  7109
  // 14246

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
