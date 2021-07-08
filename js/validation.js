import {hasDuplicates, checkStringLength} from './utils.js';

const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MIN_LENGTH = 2;
const COMMENT_MAX_LENGTH = 140;

const checkHastagsValidity = (hashtagInput) => {
  const hashtags = hashtagInput.value.toLowerCase().split(' ');
  const hashtagRestrictions = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const checkHashtagRestrictions = hashtags.every((hashtag) => hashtagRestrictions.test(hashtag));
  const checkHashtagMaxLength = hashtags.every((hashtag) => hashtag.length < HASHTAG_MAX_LENGTH);
  const checkHashtagMinLength = hashtags.every((hashtag) => hashtag.length >= HASHTAG_MIN_LENGTH);

  if (!checkHashtagRestrictions) {
    hashtagInput.setCustomValidity('Хэштэг должен состоять только из букв и цифр и начинаться с #');
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
};

const checkCommentValidity = (commentInput) => {
  if (checkStringLength(commentInput.value, COMMENT_MAX_LENGTH)) {
    commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
};

export {checkHastagsValidity, checkCommentValidity};
