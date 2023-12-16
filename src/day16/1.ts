import { fetchInput } from '../utils/fetch';
import { wait } from '../utils/wait';
import { MOVES } from './constants';
import { Direction, Grid, HeatGrid, Position, Tile } from './types';

const nextPosition = (
  position: Position,
  direction: Direction,
  tile: Tile,
  gridWidth: number,
  gridHeight: number
): {
  position: Position;
  direction: Direction;
}[] => {
  const moves = MOVES[tile][direction];
  const nextDirections = moves;

  const nextPositions: {
    position: Position;
    direction: Direction;
  }[] = [];

  nextDirections.forEach((nextDirection) => {
    const nextPosition = {
      x: position.x,
      y: position.y
    };

    if (nextDirection === 'UP') {
      nextPosition.y -= 1;
    } else if (nextDirection === 'DOWN') {
      nextPosition.y += 1;
    } else if (nextDirection === 'LEFT') {
      nextPosition.x -= 1;
    } else if (nextDirection === 'RIGHT') {
      nextPosition.x += 1;
    }

    if (
      nextPosition.x < 0 ||
      nextPosition.x >= gridWidth ||
      nextPosition.y < 0 ||
      nextPosition.y >= gridHeight
    ) {
      return;
    }

    nextPositions.push({
      position: nextPosition,
      direction: nextDirection
    });
  });

  return nextPositions;
};

let makeMove = async (
  grid: Grid,
  heatGrid: HeatGrid,
  position: Position = { x: 0, y: 0 },
  direction: Direction = 'RIGHT'
) => {
  await wait(10);
  heatGrid[position.y][position.x] =
    heatGrid[position.y][position.x] >= 9
      ? 9
      : heatGrid[position.y][position.x] + 1;
  // heatGrid.forEach((row) => {
  //   console.log(row.join(''));
  // });

  const heatCount = heatGrid.reduce((acc, row) => {
    return (
      acc +
      row.reduce((acc, heat) => {
        if (heat === 0) return acc;
        return acc + 1;
      }, 0)
    );
  }, 0);

  console.log('heatCount', heatCount);

  const tile: Tile = grid[position.y][position.x]!;
  const nextPositions = nextPosition(
    position,
    direction,
    tile,
    grid[0].length,
    grid.length
  );

  if (nextPositions.length === 0) {
    return;
  }

  nextPositions.forEach((nextPosition) => {
    makeMove(grid, heatGrid, nextPosition.position, nextPosition.direction);
  });
};

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/16/input`
  );

  const start = performance.now();

  //   const input: string = String.raw`.|...I....
  // |.-.I.....
  // .....|-...
  // ........|.
  // ..........
  // .........I
  // ..../.II..
  // .-.-/..|..
  // .|....-|.I
  // ..//.|....`;

  // replace I is actually \

  const lines = input.trim().split('\n');

  console.log(lines);

  const grid: Grid = lines.map((row: string) =>
    row
      .trim()
      .split('')
      .map((tile) => tile as Tile)
  );
  const heatGrid: HeatGrid = lines.map((row) =>
    row
      .trim()
      .split('')
      .map(() => 0)
  );

  grid.forEach((row) => {
    console.log(row.join(''));
  });

  heatGrid.forEach((row) => {
    console.log(row.join(''));
  });

  makeMove(grid, heatGrid);

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
