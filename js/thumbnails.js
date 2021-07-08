import {createBigPicture} from './big-picture.js';
import { setUpImageFilters } from './filters.js';

const createThumbnails = (thumbnails ) => {
  setUpImageFilters ();
  const thumbnailsContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content;
  const thumbnailsFragment = document.createDocumentFragment();

  thumbnails
    .forEach((photo) => {
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

      thumbnailsFragment.appendChild(thumbnailElement);
    });

  while (thumbnailsContainer.children.length > 2) {
    thumbnailsContainer.removeChild(thumbnailsContainer.lastChild);
  }
  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export {createThumbnails};

