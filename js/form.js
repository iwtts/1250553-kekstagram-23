import '../nouislider/nouislider.js';
import {isEscEvent} from './utils.js';
import {sendData} from './api.js';
import {checkHastagsValidity, checkCommentValidity} from './validation.js';
import {effectChangeHandler, clearPictureEffects} from './effects.js';
import {defineImageScale, clearPictureScale} from './scale.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const scaleValue = document.querySelector('.scale__control--value');

const uploadForm = document.querySelector('.img-upload__form');

const effectsList = document.querySelector('.effects__list');
const effectsLevelSliderWrapper = document.querySelector('.img-upload__effect-level ');

const uploadFileClose = function () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  clearPictureScale();
  clearPictureEffects();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadFileEscKeydown);
};

const onUploadFileEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    uploadFileClose();
  }
};

uploadFile.addEventListener('change', () => {
  scaleValue.value = '100%';
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadCancel.addEventListener('click', uploadFileClose);

  document.addEventListener('keydown', onUploadFileEscKeydown);
});

defineImageScale();

effectsLevelSliderWrapper.classList.add('hidden');

effectsList.addEventListener('change', effectChangeHandler);

commentInput.addEventListener('input', () => {
  checkCommentValidity(commentInput);
});

commentInput.addEventListener('keydown', (evt) =>{
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

hashtagInput.addEventListener('input', () => {
  checkHastagsValidity(hashtagInput);
});

hashtagInput.addEventListener('keydown', (evt) =>{
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

const setUploadFormSubmit = (onSuccess, onFail) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );

    uploadFileClose();
  });
};

export {setUploadFormSubmit, uploadFileClose};

