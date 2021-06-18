import {getRandomPositiveInteger} from './get-random-positive-integer.js';

const makeUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomPositiveInteger(min, max);
    while (previousValues.includes(currentValue)) {
      if (previousValues.length >= (max - min + 1)) {
        break;
      }
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export {makeUniqueRandomIntegerGenerator};
