import {getRandomPositiveInteger} from './utils/get-random-positive-integer.js';
import {makeUniqueRandomIntegerGenerator} from './utils/make-unique-random-integer-generator.js';

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 3;
const COMMENTS_COUNT_MAX = PHOTOS_COUNT * COMMENTS_COUNT;

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

const getCommentId = makeUniqueRandomIntegerGenerator(0, COMMENTS_COUNT_MAX);
const getPhotoId = makeUniqueRandomIntegerGenerator(0, PHOTOS_COUNT);
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(COMMENT_NAMES),
});

const createComments = () => {
  const сomments = new Array(getRandomPositiveInteger(1, COMMENTS_COUNT)).fill(null).map(() => createComment());
  return сomments;
};

const createPhoto = () => ({
  id: getPhotoId(),
  url: `photos/${  getRandomPositiveInteger(1, 25) }.jpg`,
  description: 'Такое искусство, если угодно, оказывается трансперсональным и трансцендентным.',
  likes: getRandomPositiveInteger(15, 200),
  comments: createComments(),
});

const createPhotos = () => {
  const photos = new Array(PHOTOS_COUNT).fill(null).map(() => createPhoto());
  return photos;
};

export {createPhotos};
