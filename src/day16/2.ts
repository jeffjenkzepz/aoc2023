import { fetchInput } from '../utils/fetch';
import { MOVES } from './constants';
import { Direction, Grid, Position, Tile } from './types';

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

let makeMove = (
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
  const visited = new Set<string>();

  while (queue.length) {
    const {
      position,
      direction
    }: {
      position: Position;
      direction: Direction;
    } = queue.shift()!;
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

  // const input: string = String.raw`.|...I....
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

  const startPositions: {
    position: Position;
    direction: Direction;
  }[] = [
    ...grid[0].map((_, index) => ({
      position: {
        x: index,
        y: 0
      } as Position,
      direction: 'DOWN' as Direction
    })),
    ...grid[grid.length - 1].map((_, index) => ({
      position: {
        x: index,
        y: grid.length - 1
      } as Position,
      direction: 'UP' as Direction
    })),
    ...grid.map((_, index) => ({
      position: { x: 0, y: index } as Position,
      direction: 'RIGHT' as Direction
    })),
    ...grid.map((_, index) => ({
      position: { x: grid[0].length - 1, y: index } as Position,
      direction: 'LEFT' as Direction
    }))
  ];
  console.log(startPositions);

  const counts: number[] = [];
  for (const startPosition of startPositions) {
    const heatCount = makeMove(
      grid,
      startPosition.position,
      startPosition.direction
    );

    counts.push(heatCount);

    console.log('Final heatCount', heatCount);
  }

  console.log('counts', counts);

  // highest heat count
  console.log(
    'maxHeatCount',
    counts.reduce((acc, count) => Math.max(acc, count), 0)
  );

  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
