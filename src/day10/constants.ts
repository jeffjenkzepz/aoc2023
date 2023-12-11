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

export const CONNECTOR_INSIDE_DIRECTION: 
  Record<Connector, Partial<Record<Direction, Direction[]>>>
 = {
  '|': {
    N: ['W'],
    S: ['E']
  },
  '-': {
    E: ['N'],
    W: ['S']
  },
  L: {
    N: ['W', 'S'],
    E: []
  },
  J: {
    N: [],
    W: ['S', 'E']
  },
  '7': {
    S: ['E', 'N'],
    W: []
  },
  F: {
    S: [],
    E: ['N', 'W']
  },
  '.': {},
  S: {},
  X: {}
};
