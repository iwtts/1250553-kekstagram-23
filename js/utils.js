const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  checkStringLength,
  isEscEvent,
  hasDuplicates,
  getRandomPositiveInteger,
  getRandomArrayElement,
  makeUniqueRandomIntegerGenerator,
  showAlert,
  debounce
};
