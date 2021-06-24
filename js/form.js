const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value = '';
  }
};

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const uploadCancel = document.querySelector('#upload-cancel');
  uploadCancel.addEventListener('click', () => {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value = '';
  });

  document.addEventListener('keydown', onPopupEscKeydown);
});

const regHashtag = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const hashtagInput = document.querySelector('.text__hashtags');
const hasDuplicates = (array) => new Set(array).size !== array.length;

hashtagInput.addEventListener('input', () => {
  let invalid = false;
  const hashtags = hashtagInput.value.toLowerCase().split(' ');
  if (hashtags.length > 5) {
    invalid = true;
    hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }
  hashtags.forEach((hashtag) => {
    if (!regHashtag.test(hashtag)) {
      invalid = true;
      hashtagInput.setCustomValidity('Хэштэг должен начинаться с символа #, состоять из букв и чисел, не может содержать спецсимволы.');
    }
  });
  if (hasDuplicates(hashtags)) {
    invalid = true;
    hashtagInput.setCustomValidity('Хэштеги должны быть уникальными.');
  }

  if (invalid) {
    hashtagInput.setCustomValidity('');
  }
});

hashtagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
});

const commentInput = document.querySelector('.text__description');

commentInput.addEventListener('input', () => {
  if (commentInput.value.length > 140) {
    commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
  }
});

commentInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
});
