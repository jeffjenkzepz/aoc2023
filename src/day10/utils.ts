import { CONNECTORS } from './constants';
import { Connector, Coordinates, Direction } from './types';

export const isConnector = (direction: Direction, character: Connector) => {
  if (!character || !CONNECTORS[character]) return false;

  return CONNECTORS[character].includes(direction);
};

export const findInitialConnectors = (
  grid: Connector[][],
  position: number[]
): Coordinates[] => {
  const char: Connector = grid[position[0]][position[1]];
  let connectors: Coordinates[] = [];
  const N: Coordinates = [position[0] - 1, position[1]];
  const S: Coordinates = [position[0] + 1, position[1]];
  const W: Coordinates = [position[0], position[1] - 1];
  const E: Coordinates = [position[0], position[1] + 1];

  // checking if we can go north
  if (grid[N[0]]?.[N[1]] && isConnector('S', grid[N[0]][N[1]])) {
    connectors.push(N);
  }

  // checking if we can go south
  if (grid[S[0]]?.[S[1]] && isConnector('N', grid[S[0]][S[1]])) {
    connectors.push(S);
  }

  // Checking if we can go west
  if (grid[W[0]]?.[W[1]] && isConnector('E', grid[W[0]][W[1]])) {
    connectors.push(W);
  }

  // Checking if we can go east
  if (grid[E[0]]?.[E[1]] && isConnector('W', grid[E[0]][E[1]])) {
    connectors.push([position[0], position[1] + 1]);
  }

  console.log('connectors', connectors);

  return connectors;
};

export const getRelativeDirection = (
  currentPosition: Coordinates,
  relativePosition: Coordinates
): Direction => {
  const [currentRow, currentCol] = currentPosition;
  const [relativeRow, relativeCol] = relativePosition;

  if (currentRow === relativeRow) {
    if (currentCol > relativeCol) {
      return 'W';
    } else {
      return 'E';
    }
  } else {
    if (currentRow > relativeRow) {
      return 'N';
    } else {
      return 'S';
    }
  }
};

export const getNextDirection = (
  currentPosition: Coordinates,
  previousPosition: Coordinates,
  type: Connector
): Direction => {
  const relativeDirection = getRelativeDirection(
    currentPosition,
    previousPosition
  );
  const directions = CONNECTORS[type];
  const directionIndex = directions.indexOf(relativeDirection);
  const nextDirectionIndex = directionIndex === 0 ? 1 : 0;
  return directions[nextDirectionIndex];
};

export const getNextPosition = (
  currentPosition: Coordinates,
  direction: Direction
): Coordinates => {
  const [row, col] = currentPosition;

  switch (direction) {
    case 'N':
      return [row - 1, col];
    case 'S':
      return [row + 1, col];
    case 'E':
      return [row, col + 1];
    case 'W':
      return [row, col - 1];
  }
};

export const sameCoordinates = (a: Coordinates, b: Coordinates) => {
  return a[0] === b[0] && a[1] === b[1];
};

export const getConnector = (grid: Connector[][], position: Coordinates) => {
  return grid[position[0]][position[1]];
};
