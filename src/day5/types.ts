export type Range = {
  destinationRange: number;
  sourceRange: number;
  rangeLength: number;
}[];

export type Maps = Record<
  string,
  {
    ranges: Range;
    from: string;
    to: string;
  }
>;
