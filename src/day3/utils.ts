import { Number, Gear } from './types';

export function isParsableAsInteger(str: string) {
  const num = parseInt(str);
  return Number.isInteger(num);
}

export function checkForRowMatch(
  data: string[][],
  rowIndex: number,
  num: Number
): { match: boolean; gears: Gear[] } {
  const gears: Gear[] = [];
  const row = data[rowIndex];

  // adjust start and end positions to account for diagonal matches
  const start = num.start - 1 < 0 ? 0 : num.start - 1;
  const end = num.end + 1 > row.length ? row.length : num.end + 1;

  // slice gets up to but not including the end index so lets add 1
  const rowSlice = row.slice(start, end + 1);

  // remove numbers and periods
  const rowAboveNoNumbers = rowSlice.filter((char) => {
    return !isParsableAsInteger(char) && char !== '.';
  });

  // if we have no numbers then lets check for gears
  // not a great way to do this but I'm lazy

  for (let i = start; i < end + 1; i++) {
    if (row[i] === '*') {
      gears.push([rowIndex, i]);
    }
  }

  // if there is anything left then its valid
  if (rowAboveNoNumbers.length > 0)
    return {
      match: true,
      gears
    };

  return {
    match: false,
    gears
  };
}

export function setGear(numbers: Number[], index: number, gear: Gear) {
  if (!numbers[index]) return;
  if (!numbers[index].gears) return (numbers[index].gears = [gear]);

  // check we don't already have this gear
  const alreadyHasGear = numbers[index].gears!.find((g) => {
    return g[0] === gear[0] && g[1] === gear[1];
  });

  if (alreadyHasGear) return;

  numbers[index].gears!.push(gear);
}
