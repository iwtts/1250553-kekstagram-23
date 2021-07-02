import {
  getRandomPositiveInteger,
  makeUniqueRandomIntegerGenerator,
  getRandomArrayElement
} from './utils.js';

const PHOTOS_AMOUNT = 25;
const COMMENTS_PER_PHOTO_MAX = 15;
const COMMENTS_PER_PHOTO_MIN = 0;
const LIKES_PER_PHOTO_MAX = 200;
const LIKES_PER_PHOTO_MIN = 15;
const COMMENTS_AMOUNT = PHOTOS_AMOUNT * COMMENTS_PER_PHOTO_MAX;
const COMMENT_AVATAR_MAX = 6;
const COMMENT_AVATAR_MIN = 1;

const CommentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const CommentNames = [
  'Ричард Керн',
  'Энни Лейбовиц',
  'Патрик Демаршелье',
  'Александр Родченко',
  'Ги Бурден',
  'Диана Арбус',
];

const getCommentId = makeUniqueRandomIntegerGenerator(1, COMMENTS_AMOUNT);
const getPhotoId = makeUniqueRandomIntegerGenerator(1, PHOTOS_AMOUNT);
const getPhotoUrl = makeUniqueRandomIntegerGenerator(1, PHOTOS_AMOUNT);

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${  getRandomPositiveInteger(COMMENT_AVATAR_MIN, COMMENT_AVATAR_MAX)  }.svg`,
  message: getRandomArrayElement(CommentMessages),
  name: getRandomArrayElement(CommentNames),
});

const createComments = () => {
  const сomments = new Array(getRandomPositiveInteger(COMMENTS_PER_PHOTO_MIN, COMMENTS_PER_PHOTO_MAX)).fill(null).map(() => createComment());
  return сomments;
};

const createPhoto = () => ({
  id: getPhotoId(),
  url: `photos/${  getPhotoUrl() }.jpg`,
  description: 'Такое искусство, если угодно, оказывается трансперсональным и трансцендентным.',
  likes: getRandomPositiveInteger(LIKES_PER_PHOTO_MIN, LIKES_PER_PHOTO_MAX),
  comments: createComments(),
});

const createPhotos = () => {
  const photos = new Array(PHOTOS_AMOUNT).fill(null).map(() => createPhoto());
  return photos;
};

export {createPhotos};
