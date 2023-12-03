export type Number = {
    number: string;
    valid: boolean;
    line: number;
    start: number;
    end: number;
    gears?: Gear[];
  };

  export type Gear = [row: number, col: number];