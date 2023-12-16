export type Beam = {
  position: Position;
  direction: Direction;
};

export type Position = {
  x: number;
  y: number;
};

// can be UP DOWN LEFT RIGHT
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Tile = '.' | '|' | '-' | 'I' | '/';

export type Moves = {
  [key in Tile]: Record<Direction, Direction[]>;
};

export type HeatGrid = number[][];
export type Grid = Tile[][];
