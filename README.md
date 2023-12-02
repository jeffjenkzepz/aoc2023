# aoc2023

My solutions for [Advent of Code 2023](https://adventofcode.com/2023).

## Fork it

If you wanna fork this to use yourself you need to do a couple of things:

1. Make a copy of `.env.example` to `.env`. You need to add your session cookies from your own authenticated session on adventofcode.com. You can get this by logging in, then checking the request headers. Copy the contents of the `Cookie` request header and paste over the `COOKIE` value in the `.env` file. The cookies look something like this:

```
_ga=GAxxx; session=xxx; _gid=xxx; _ga_XXX=xxx
```

This will allow you to fetch your input for each puzzle directly from the adventofcode server. 

2. To get a puzzle going you can simply make a new folder for the day `dayX` and then a new file for the puzzle `x.ts` and copy the following boiler to get yourself going:

```JavaScript
import { fetchInput } from '../utils/fetch';
import { isParsableAsInteger } from './utils';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/X/input`
  );

  // const input: string = `1abc2
  // pqr3stu8vwx
  // a1b2c3d4e5f
  // treb7uchet`;

  // YOUR PUZZLE CODE GOES HERE
}

puzzle();
```

Update the fetchInput method to use the correct input URL for the day. If you want to test with a smaller input you can comment out the fetch code and use an inline string.

## Run it

To get started make sure you have your environment cookie set up per point 1 above.

Run `npm i` to set up. Then you can run each individual puzzle in dev mode using the following command:

```
npm run dev --file=./src/day{DAY_NUMBER}/{SOLUTION_NUMBER}.ts
```

This will continue to run the code whenever the file is changed.
