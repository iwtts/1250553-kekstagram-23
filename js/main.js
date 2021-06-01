//Функция, возвращающая случайное целое число из переданного диапазона включительно
//За основу взял функцию getRandomIntInclusive из mdn https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(from, to) {
  if (to > from && from >= 0) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
  if (from > to && to >= 0) {
    to = Math.ceil(to);
    from = Math.floor(from);
    return Math.floor(Math.random() * (from - to + 1)) + to;
  }
  if (from === to) {
    return from;
  }
  return 'Ошибка. Диапазон не может включать отрицательные числа.';
}

getRandomIntInclusive();


//Функция для проверки максимальной длины строки.

function checkStringLength (string, maxLength) {
  string = String(string);
  return (string.length <= maxLength);
}

checkStringLength ();

