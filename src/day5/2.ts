import Decimal from 'decimal.js-light';
import { fetchInput } from '../utils/fetch';
import { getMaps, reverseLookup } from './utils';
import { Maps, Range } from './types';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/5/input`
  );

  const start = performance.now();

  //   const input: string = `seeds: 79 14 55 13

  // seed-to-soil map:
  // 50 98 2
  // 52 50 48

  // soil-to-fertilizer map:
  // 0 15 37
  // 37 52 2
  // 39 0 15

  // fertilizer-to-water map:
  // 49 53 8
  // 0 11 42
  // 42 0 7
  // 57 7 4

  // water-to-light map:
  // 88 18 7
  // 18 25 70

  // light-to-temperature map:
  // 45 77 23
  // 81 45 19
  // 68 64 13

  // temperature-to-humidity map:
  // 0 69 1
  // 1 0 69

  // humidity-to-location map:
  // 60 56 37
  // 56 93 4`;

  // lets parse the data
  const data: string[] = input.split('\n\n');

  const seeds = data
    .shift()!
    .trim()
    .replace('seeds: ', '')
    .split(' ')
    .map((n) => parseInt(n));

  const maps: Maps = getMaps(data);

  // format seeds into pairs
  const seedPairs: (number[] | null)[] = seeds
    .map((seed, index) => {
      if (index % 2 === 1) return null;
      return [seed, seeds[index + 1]];
    })
    .filter((pair) => pair !== null);

  // lets start by finding the lowest possible location
  // in increments of 1000000 and we can then work more
  // granularly from there
  let increment = 1000000;

  let lowest = null;
  let count = 0;

  while (!lowest) {
    // lets do a reverse lookup by working backwards through the maps
    // starting with the lowest possible destingation and checking if
    // the resulting seed is in one of our seed pairs
    // retruns the lowest location or null if no match
    lowest = reverseLookup(maps, seedPairs, count);

    // if we find a match we will go back to the previous increment
    // and reduce our granularity and start walking forwards again
    // we will keep doing this until our granularity is 1
    if (lowest && increment > 1) {
      console.log('HIT', count, lowest);
      count -= increment;
      increment = Math.floor(increment / 10);
      lowest = null;
    }

    count += increment;
  }

  const end = performance.now();

  // WHILE THIS WORKED FOR MY INPUT
  // the granularity may be too large which could cause you to miss the lowest result
  // if that happens try adjusting the granularity to be smaller
  console.log('LOWEST', lowest);
  console.log(
    `Result in ${new Decimal(end).minus(start).toDecimalPlaces(4)}ms`
  );
};

puzzle();
