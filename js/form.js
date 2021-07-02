import {isEscEvent, hasDuplicates} from './utils.js';
import '../nouislider/nouislider.js';

const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MIN_LENGTH = 2;
const COMMENT_MAX_LENGTH = 140;

const body = document.querySelector('body');
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const uploadFileClose = function () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadFileEscKeydown);
};

const onUploadFileEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    uploadFileClose();
  }
};

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadCancel.addEventListener('click', uploadFileClose);

  document.addEventListener('keydown', onUploadFileEscKeydown);
});


const SCALE_STEP = 0.25;
const scaleValue = document.querySelector('.scale__control--value');

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const scaleImage = document.querySelector('.img-upload__preview');
const scaleImageImg = scaleImage.querySelector('img');

scaleValue.value = 1;

scaleSmaller.addEventListener('click', () => {
  scaleValue.value -= SCALE_STEP;
  scaleImageImg.style.transform = `scale(${ scaleValue.value })`;
  if (scaleValue.value <= 0.25) {
    scaleValue.value = 0.25;
    scaleImageImg.style.transform = `scale(${ scaleValue.value })`;
  }
});

scaleBigger.addEventListener('click', () => {
  scaleValue.value = Number(scaleValue.value) + SCALE_STEP;
  scaleImageImg.style.transform = `scale(${ scaleValue.value })`;
  if (scaleValue.value >= 1) {
    scaleValue.value = 1;
    scaleImageImg.style.transform = `scale(${ scaleValue.value })`;
  }
});

const effectsList = document.querySelector('.effects__list');
const effectsLevelSliderWrapper = document.querySelector('.img-upload__effect-level ');
const effectsLevelSlider = document.querySelector('.effect-level__slider');
const effectsLevelValue = document.querySelector('.effect-level__value');

effectsLevelSliderWrapper.classList.add('hidden');

noUiSlider.create(effectsLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


const effectChangeHandler = function (evt) {
  switch (evt.target.value ) {
    case 'chrome':
      effectsLevelSlider.noUiSlider.updateOptions({
        start: 100,
      });
      effectsLevelSliderWrapper.classList.remove('hidden');
      scaleImageImg.className = 'effects__preview--chrome';
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        scaleImageImg.style.filter = `grayscale(${ unencoded[handle] })`;
      });
      break;
    case 'sepia':
      effectsLevelSlider.noUiSlider.updateOptions({
        start: 100,
      });
      effectsLevelSliderWrapper.classList.remove('hidden');
      scaleImageImg.className = 'effects__preview--sepia';
      effectsLevelSlider.noUiSlider.on('update', (__, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        scaleImageImg.style.filter = `sepia(${ unencoded[handle] })`;
      });
      break;
    case 'marvin':
      effectsLevelSliderWrapper.classList.remove('hidden');
      scaleImageImg.className = 'effects__preview--marvin';
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        scaleImageImg.style.filter = `invert(${ unencoded[handle] }%)`;
      });
      break;
    case 'phobos':
      effectsLevelSliderWrapper.classList.remove('hidden');
      scaleImageImg.className = 'effects__preview--phobos';
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        scaleImageImg.style.filter = `blur(${ unencoded[handle] }px)`;
      });
      break;
    case 'heat':
      effectsLevelSliderWrapper.classList.remove('hidden');
      scaleImageImg.className = 'effects__preview--heat';
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        scaleImageImg.style.filter = `brightness(${ unencoded[handle] })`;
      });
      break;
    default:
      effectsLevelSliderWrapper.classList.add('hidden');
      scaleImageImg.className = '';
      scaleImageImg.style.filter = '';
      break;
  }
};

effectsList.addEventListener('change', effectChangeHandler);

commentInput.addEventListener('input', () => {
  if (commentInput.value.length > COMMENT_MAX_LENGTH) {
    commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
});

commentInput.addEventListener('keydown', (evt) =>{
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

hashtagInput.addEventListener('input', () => {
  const hashtags = hashtagInput.value.toLowerCase().split(' ');
  const hashtagRestrictions = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const checkHashtagRestrictions = hashtags.some((hashtag) => hashtagRestrictions.test(hashtag));
  const checkHashtagMaxLength = hashtags.some((hashtag) => hashtag.length < HASHTAG_MAX_LENGTH);
  const checkHashtagMinLength = hashtags.some((hashtag) => hashtag.length > HASHTAG_MIN_LENGTH);

  if (!checkHashtagRestrictions) {
    hashtagInput.setCustomValidity('Хэш тэг должен начинаться с # и не может включать спецсимволы и пробел');
  } else if (!checkHashtagMaxLength) {
    hashtagInput.setCustomValidity(`Хэш тэг не может быть длинее ${  HASHTAG_MAX_LENGTH  } символов`);
  } else if (!checkHashtagMinLength) {
    hashtagInput.setCustomValidity(`Хэш тэг не может быть короче ${  HASHTAG_MIN_LENGTH  } символов`);
  } else if (hashtags.length > HASHTAGS_MAX_COUNT) {
    hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else if (hasDuplicates(hashtags)) {
    hashtagInput.setCustomValidity('Хэштеги должны быть уникальными.');
  } else {
    hashtagInput.setCustomValidity('');
  }
  hashtagInput.reportValidity();
});

hashtagInput.addEventListener('keydown', (evt) =>{
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});
