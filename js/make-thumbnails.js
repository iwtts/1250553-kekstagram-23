import { createPhotos } from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const thumbnailPictures = createPhotos();

const picturesFragment = document.createDocumentFragment();

thumbnailPictures.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImage = pictureElement.querySelector('.picture__img');
  const pictureLikesCount = pictureElement.querySelector('.picture__likes');
  const pictureCommentsCount = pictureElement.querySelector('.picture__comments');
  pictureImage.src = photo.url;
  pictureLikesCount.textContent = photo.likes;
  pictureCommentsCount.textContent = photo.comments.length;

  picturesFragment.appendChild(pictureElement);
});

pictures.appendChild(picturesFragment);
