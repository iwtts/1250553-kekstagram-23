import {createBigPictureComments, clearCommentsList} from './big-picture-comments.js';
import {isEscEvent} from './utils.js';


const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImageWrapper = document.querySelector('.big-picture__img');
const bigPictureImage = bigPictureImageWrapper.querySelector('img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentsCount = document.querySelector('.comments-count');

const createBigPicture = (source) => {
  bigPicture.classList.remove('hidden');
  bigPictureImage.src = source.url;
  bigPictureLikesCount.textContent = source.likes;
  bigPictureCommentsCount.textContent = source.comments.length;

  createBigPictureComments(source);

  const bigPictureDescripion = document.querySelector('.social__caption');
  bigPictureDescripion.textContent = source.description;
  body.classList.add('modal-open');

  const onBigPicturekeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      onBigPictureCloseClick();
    }
  };

  const onBigPictureCloseClick = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPicturekeydown);
    clearCommentsList();
  };

  const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
  bigPictureCloseButton.addEventListener('click', onBigPictureCloseClick);

  document.addEventListener('keydown', onBigPicturekeydown);
};

export {createBigPicture};
