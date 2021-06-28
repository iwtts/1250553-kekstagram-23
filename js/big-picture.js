import {createBigPictureComments, clearCommentsList} from './big-picture-comments.js';
import {isEscEvent} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImageWrapper = document.querySelector('.big-picture__img');
const bigPictureImage = bigPictureImageWrapper.querySelector('img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentsCount = document.querySelector('.comments-count');

const createBigPicture = function (source) {
  bigPicture.classList.remove('hidden');
  bigPictureImage.src = source.url;
  bigPictureLikesCount.textContent = source.likes;
  bigPictureCommentsCount.textContent = source.comments.length;

  createBigPictureComments(source);

  const bigPictureDescripion = document.querySelector('.social__caption');
  bigPictureDescripion.textContent = source.description;

  const bigPictureSocialCommentsCount = document.querySelector('.social__comment-count');
  bigPictureSocialCommentsCount.classList.add('hidden');
  const bigPictureSocialCommentsLoader = document.querySelector('.comments-loader');
  bigPictureSocialCommentsLoader.classList.add('hidden');

  const body = document.querySelector('body');
  body.classList.add('modal-open');

  const onBigPicturekeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      bigPictureClose();
    }
  };

  const bigPictureClose = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPicturekeydown);
    clearCommentsList();
  };

  const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
  bigPictureCloseButton.addEventListener('click', () => {
    bigPictureClose();
  });

  document.addEventListener('keydown', onBigPicturekeydown);
};

export {createBigPicture};
