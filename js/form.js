import {isEscEvent, hasDuplicates} from './utils.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const uploadFileClose = function () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
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

  const uploadCancel = document.querySelector('.img-upload__cancel');
  uploadCancel.addEventListener('click', () => {
    uploadFileClose();
  });

  document.addEventListener('keydown', onUploadFileEscKeydown);
});


const commentInput = document.querySelector('.text__description');
const COMMENT_MAX_LENGTH = 140;

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


const HASHTAGS_MAX_COUNT = 5;
//const HASHTAG_MAX_LENGTH = 20;
//const HASHTAG_MIN_LENGTH = 2;

const hashtagInput = document.querySelector('.text__hashtags');
const hashtagRestrictions = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const hashtags = hashtagInput.value.toLowerCase().split(' ');
const checkHashtagRestriction = hashtags.some((hashtag) => hashtagRestrictions.test(hashtag));

hashtagInput.addEventListener('input', () => {

  if (hashtags.length > HASHTAGS_MAX_COUNT) {
    hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else if (hasDuplicates(hashtags)) {
    hashtagInput.setCustomValidity('Хэштеги должны быть уникальными.');
  } else if (!checkHashtagRestriction) {
    hashtagInput.setCustomValidity('хэш-тег должен начинаться с символа # и состоять только из букв и чисел');
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
