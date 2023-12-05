import { Decimal } from 'decimal.js-light';
import { Maps } from './types';

export function rangesOverlap(
  a: [number, number],
  b: [number, number]
): boolean {
  return new Decimal(a[0]).lte(b[1]) && new Decimal(b[0]).lte(a[1]);
}

export function getOverlappingRange(
  a: [number, number],
  b: [number, number]
): [number, number] | null {
  if (new Decimal(a[0]).lte(b[1]) && new Decimal(b[0]).lte(a[1])) {
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
  }
  return null;
}

export const getMaps = (
  data: string[]
): Maps => {
  const maps: Maps = {};

  data.forEach((map) => {
    const [mapNameLine, ...mapData] = map.trim().split('\n');
    const mapName = mapNameLine.trim().replace(' map:', '');
    maps[mapName] = {
      ranges: [],
      from: mapName.split('-to-')[0],
      to: mapName.split('-to-')[1]
    };
    mapData.forEach((row) => {
      const [destinationRange, sourceRange, rangeLength] = row
        .trim()
        .split(' ')
        .map((n) => parseInt(n));

      maps[mapName].ranges.push({
        destinationRange,
        sourceRange,
        rangeLength: rangeLength
      });
    });
  });

  return maps;
}

export const reverseLookup = (
  maps: Maps,
  seeds: (number[] | null)[],
  location: number,
): Record<string, number> | null => {
 let seedData: Record<string, number> = {
    seed: 0,
    soil: 0,
    fertilizer: 0,
    water: 0,
    light: 0,
    temperature: 0,
    humidity: 0,
    location
  };

  let to = 'location';
  while (to !== 'seed') {
    const map = Object.values(maps).find((map) => map.to === to);
    map!.ranges.forEach((range) => {
      const start = range.destinationRange;
      const end = range.destinationRange + range.rangeLength;
      if (seedData[to] >= start && seedData[to] < end) {
        seedData[map!.from] =
          range.sourceRange +
          (seedData[to] - range.destinationRange);
      }
    });

    if (!seedData[map!.from])
        seedData[map!.from] = seedData[map!.to];

    to = map!.from;
  }

  // check if seed is in any of the seed ranges
  const seedPair = seeds.find((seedPair) => {
    const seed = seedData.seed;
    // return seed >= seedPair[0] && seed < seedPair[0] + seedPair[1];
    return new Decimal(seed).gte(seedPair![0]) && new Decimal(seed).lt(seedPair![0] + seedPair![1]);
  });

  if (!seedPair) return null;

  return seedData;
}

export const lookup = (
  maps: Maps,
  seeds: number[],
) => {

  const seedData: Record<string, any> = {};

  seeds.forEach((seed) => {
    seedData[seed] = {
      seed,
      soil: 0,
      fertilizer: 0,
      water: 0,
      light: 0,
      temperature: 0,
      humidity: 0,
      location: 0
    };

    let from = 'seed';
    while (from !== 'location') {
      const map = Object.values(maps).find((map) => map.from === from);
      map!.ranges.forEach((range) => {
        const start = range.sourceRange;
        const end = range.sourceRange + range.rangeLength;
        if (seedData[seed][from] >= start && seedData[seed][from] < end) {
          seedData[seed][map!.to] =
            range.destinationRange +
            (seedData[seed][from] - range.sourceRange);
        }
      });

      if (!seedData[seed][map!.to])
          seedData[seed][map!.to] = seedData[seed][map!.from];

      console.log(
        seed,
        from,
        seedData[seed][map!.from],
        map!.to,
        seedData[seed][map!.to]
      );
      from = map!.to;
    }
  });

  return seedData;
}
