import { Moves, Direction } from './types';

export const MOVES: Moves = {
  '.': {
    UP: ['UP'],
    DOWN: ['DOWN'],
    LEFT: ['LEFT'],
    RIGHT: ['RIGHT']
  },
  '|': {
    UP: ['UP'],
    DOWN: ['DOWN'],
    LEFT: ['UP', 'DOWN'],
    RIGHT: ['UP', 'DOWN']
  },
  '-': {
    UP: ['LEFT', 'RIGHT'],
    DOWN: ['LEFT', 'RIGHT'],
    LEFT: ['LEFT'],
    RIGHT: ['RIGHT']
  },
  I: {
    UP: ['LEFT'],
    DOWN: ['RIGHT'],
    LEFT: ['UP'],
    RIGHT: ['DOWN']
  },
  '/': {
    UP: ['RIGHT'],
    DOWN: ['LEFT'],
    LEFT: ['DOWN'],
    RIGHT: ['UP']
  }
};
