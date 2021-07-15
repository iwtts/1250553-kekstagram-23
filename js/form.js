import '../nouislider/nouislider.js';
import {isEscEvent} from './utils.js';
import {sendData} from './data.js';
import {checkHastagsValidity, checkCommentValidity} from './validation.js';
import {onEffectListChange, clearPictureEffects} from './effects.js';
import {defineImageScale, clearPictureScale} from './scale.js';

const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_SCALE_VALUE = '100%';

const body = document.querySelector('body');
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const scaleValue = document.querySelector('.scale__control--value');

const uploadImagePreviewWrapper = document.querySelector('.img-upload__preview');
const uploadImagePreview = uploadImagePreviewWrapper.querySelector('img');

const uploadForm = document.querySelector('.img-upload__form');

const effectsList = document.querySelector('.effects__list');
const effectsLevelSliderWrapper = document.querySelector('.img-upload__effect-level ');

const onUploadFileCloseClick = () => {
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
    onUploadFileCloseClick();
  }
};

uploadFile.addEventListener('change', () => {
  scaleValue.value = DEFAULT_SCALE_VALUE;
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadCancel.addEventListener('click', onUploadFileCloseClick);

  document.addEventListener('keydown', onUploadFileEscKeydown);

  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadImagePreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

defineImageScale();

effectsLevelSliderWrapper.classList.add('hidden');

effectsList.addEventListener('change', onEffectListChange);

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
    hashtagInput.value = hashtagInput.value.trim();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
    onUploadFileCloseClick();
  });
};

export {setUploadFormSubmit, onUploadFileCloseClick};

