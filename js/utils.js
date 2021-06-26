function checkStringLength (string, length) {
  return string.length <= length;
}

export {checkStringLength};


function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export {getRandomPositiveInteger};


function makeUniqueRandomIntegerGenerator (min, max) {
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
}

export {makeUniqueRandomIntegerGenerator};


const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const isEnterEvent = (evt) => evt.key === 'Enter';

export {isEscEvent, isEnterEvent};
