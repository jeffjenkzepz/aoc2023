import { Connector, Direction } from './types';

export const CONNECTORS: Record<Connector, Direction[]> = {
  '|': ['N', 'S'],
  '-': ['E', 'W'],
  L: ['N', 'E'],
  J: ['N', 'W'],
  '7': ['S', 'W'],
  F: ['S', 'E'],
  '.': [],
  S: [],
    X: []
};
