const checkStringLength = (string, length) => string.length <= length;

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const hasDuplicates = (array) => new Set(array).size !== array.length;

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

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

export {
  checkStringLength,
  isEscEvent,
  hasDuplicates,
  getRandomPositiveInteger,
  getRandomArrayElement,
  makeUniqueRandomIntegerGenerator
};
