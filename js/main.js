const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 3;
const COMMENTS_COUNT_TOTAL = PHOTOS_COUNT * COMMENTS_COUNT;

const createIdArray = function (maxValue) {
  const keys = [];
  const numbers = [];
  let total = 0;
  while(total < maxValue) {
    const i = Math.floor(Math.random() * maxValue);
    if(keys[i] === undefined) {
      keys[i] = 1;
      numbers.push(i);
      total++;
    }
  }
  return numbers;
};

const PHOTO_ID_ARRAY = createIdArray(PHOTOS_COUNT);
const COMMENTS_ID_ARRAY = createIdArray(COMMENTS_COUNT_TOTAL);

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COMMENT_NAMES = [
  'Ричард Керн',
  'Энни Лейбовиц',
  'Патрик Демаршелье',
  'Александр Родченко',
  'Ги Бурден',
  'Диана Арбус',
];

const getRandomPositiveInteger = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const getRandomUnicElement = function (elements) {
  const currentIndex = getRandomPositiveInteger(0, elements.length -1);
  const element = elements[currentIndex];
  elements.splice(currentIndex, 1);
  return element;
};

const createComment = () => ({
  id: getRandomUnicElement(COMMENTS_ID_ARRAY),
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg.`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(COMMENT_NAMES),
});

const createComments = () => {
  const сomments = new Array(getRandomPositiveInteger(0, COMMENTS_COUNT)).fill(null).map(() => createComment());
  return сomments;
};

const createPhoto = () => ({
  id: getRandomUnicElement(PHOTO_ID_ARRAY),
  url: `photos/${  getRandomPositiveInteger(1, 25) }.jpg`,
  description: 'Такое искусство, если угодно, оказывается трансперсональным и трансцендентным.',
  likes: getRandomPositiveInteger(15, 200),
  comments: createComments(),
});

const createPhotos = () => {
  const photos = new Array(PHOTOS_COUNT).fill(null).map(() => createPhoto());
  return photos;
};

createPhotos();
