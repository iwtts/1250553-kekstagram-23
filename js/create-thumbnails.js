import {createPhotos} from './get-random-data.js';
import {createBigPicture} from './create-big-picture.js';
import {isEnterEvent} from './utils.js';

const thumbnails = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
const thumbnailPictures = createPhotos();
const thumbnailsFragment = document.createDocumentFragment();

thumbnailPictures.forEach((photo) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const thumbnailImage = thumbnailElement.querySelector('.picture__img');
  const thumbnailLikesCount = thumbnailElement.querySelector('.picture__likes');
  const thumbnailCommentsCount = thumbnailElement.querySelector('.picture__comments');

  thumbnailImage.src = photo.url;
  thumbnailLikesCount.textContent = photo.likes;
  thumbnailCommentsCount.textContent = photo.comments.length;

  thumbnailImage.addEventListener('click', (evt) => {
    evt.preventDefault();
    createBigPicture(photo);
  });

  //спросить почему не получается
  thumbnailImage.addEventListener('keydown', (evt) => {
    if (isEnterEvent(evt)) {
      evt.preventDefault();
      createBigPicture(photo);
    }
  });

  thumbnailsFragment.appendChild(thumbnailElement);
});

thumbnails.appendChild(thumbnailsFragment);

