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

const directionTile = (direction: Direction): string => {
  if (direction === 'UP') {
    return '^';
  } else if (direction === 'DOWN') {
    return 'v';
  } else if (direction === 'LEFT') {
    return '<';
  }
  return '>';
}

const makeMove = (
  grid: Grid,
  position: Position = { x: 0, y: 0 },
  direction: Direction = 'RIGHT'
) => {
  const queue: {
    position: Position;
    direction: Direction;
  }[] = [
    {
      position: position,
      direction: direction
    }
  ];
  const gridAnimation: string[][] = grid.map((row) => [...row]);
  const visited = new Set<string>();

  while (queue.length) {
    const {
      position,
      direction
    }: {
      position: Position;
      direction: Direction;
    } = queue.shift()!;
    gridAnimation[position.y][position.x] = directionTile(direction);

    visited.add(`${position.x},${position.y}-${direction}`);
    const tile: Tile = grid[position.y][position.x]!;
    const nextPositions = nextPosition(
      position,
      direction,
      tile,
      grid[0].length,
      grid.length
    );
    queue.push(
      ...nextPositions.filter(
        (nextPosition) =>
          !visited.has(
            `${nextPosition.position.x},${nextPosition.position.y}-${nextPosition.direction}`
          )
      )
    );
  }
  return new Set([...visited].map((v: string) => v.split('-')[0])).size;
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

  console.log(makeMove(grid));



  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
