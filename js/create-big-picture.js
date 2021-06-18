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

  const commentsList = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('.social__comment');
  const comments = source.comments;
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImage = commentElement.querySelector('.social__picture');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    const commentText = commentElement.querySelector('.social__text');
    commentText.textContent = comment.message;

    commentsFragment.appendChild(commentElement);
  });

  const commentTemplates= document.querySelectorAll('.social__comment');
  commentTemplates.forEach((previousValue) => {
    previousValue.remove();
  });

  commentsList.appendChild(commentsFragment);

  const bigPictureDescripion = document.querySelector('.social__caption');
  bigPictureDescripion.textContent = source.description;

  const bigPictureSocialCommentsCount = document.querySelector('.social__comment-count');
  bigPictureSocialCommentsCount.classList.add('hidden');
  const bigPictureSocialCommentsLoader = document.querySelector('.comments-loader');
  bigPictureSocialCommentsLoader.classList.add('hidden');

  const body = document.querySelector('body');
  body.classList.add('modal-open');

  const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
  bigPictureCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};

export {createBigPicture};
