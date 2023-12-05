import { fetchInput } from '../utils/fetch';
import { Maps } from './types';
import { getMaps, lookup } from './utils';

const puzzle = async () => {
  // const input: string = await fetchInput(
  //   `https://adventofcode.com/2023/day/5/input`
  // );

  const input: string = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  // lets parse the data
  const data: string[] = input.split('\n\n');

  const seeds = data
    .shift()!
    .trim()
    .replace('seeds: ', '')
    .split(' ')
    .map((n) => parseInt(n));

  const maps = getMaps(data);

  const seedData = lookup(maps, seeds);

  //   console.log(seeds);
  console.log(maps);
  console.log(seedData);
  const lowestLocation = Math.min(
    ...Object.values(seedData).map((seed) => seed.location)
  );

  console.log(lowestLocation);
};

puzzle();
