import Decimal from 'decimal.js-light';
import { fetchInput } from '../utils/fetch';

const puzzle = async () => {
  const input: string = await fetchInput(
    `https://adventofcode.com/2023/day/15/input`
  );

  const start = performance.now();

  // const input: string = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  const steps = input.trim().split(',');

  console.log(steps);

  const hashCodes: Map<string, number> = new Map();
  const boxes: Map<string, string[]> = new Map();

  // first pass lets just set our hash codes
  steps.forEach((step) => {
    const label = step.split('=')[0].replace('-', '');
    hashCodes.set(
      step,
      new Decimal(
        label.split('').reduce((sAcc, char) => {
          let ascii = char.charCodeAt(0);
          let calc = new Decimal(sAcc).add(ascii).mul(17).mod(256).toNumber();
          return calc;
        }, 0)
      ).toNumber()
    );
  });

  console.log(hashCodes);

  steps.forEach((step) => {
    let hashCode = hashCodes.get(step);
    let box = boxes.get(hashCode!.toString()) || [];

    // dash indicates we need to remove a lense
    if (step.includes('-')) {
      const [lense, _value] = step.split('-');
      let index = box.findIndex((item) => item.split(' ')[0] === lense);

      if (index > -1) box.splice(index, 1);
    }

    // = indicates we need to add a lense
    if (step.includes('=')) {
      const [lense, value] = step.split('=');
      let index = box.findIndex((item) => item.split(' ')[0] === lense);

      if (index > -1) {
        box[index] = `${lense} ${value}`;
      } else {
        box.push(`${lense} ${value}`);
      }
    }

    boxes.set(hashCode!.toString(), box);
  });

  let total = 0;

  boxes.forEach((box, boxNumber) => {
    total += box.reduce((acc, curr, position) => {
      const [lense, value] = curr.split(' ');
      return new Decimal(boxNumber).plus(1).mul(position + 1).mul(value).add(acc).toNumber();
    }, 0);
  });

  console.log(boxes);

  console.log(total);


  const end = performance.now();
  console.log(`Took ${(end - start).toFixed(2)}ms`);
};

puzzle();
