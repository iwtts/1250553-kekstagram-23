import {isEscEvent, hasDuplicates} from './utils.js';

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
