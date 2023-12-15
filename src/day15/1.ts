import Decimal from 'decimal.js-light';
import { fetchInput } from '../utils/fetch';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/15/input`
  );

  const start = performance.now();

//   const input: string = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  const steps = input.trim().split(',');

  console.log(steps);

  let value = steps.reduce((vAcc, step) => {
    const calc = new Decimal(step.split('').reduce((sAcc, char) => {
        let ascii = char.charCodeAt(0);
        let calc = new Decimal(sAcc).add(ascii).mul(17).mod(256).toNumber();
        // console.log(char, sAcc, ascii, calc);
        return calc;
        }, 0)).toNumber();

    // console.log(step, calc);

    return new Decimal(calc).add(vAcc).toNumber();
  }, 0);

  console.log(value);


  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
}

puzzle();