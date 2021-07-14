const DEFAULT_VISIBLE_COMMENTS_AMOUNT = 5;
const COMMENTS_LOADED_PER_CLICK_AMOUNT = 5;

const defineVisibility = (source) => {
  const bigPictureComments = document.querySelectorAll('.social__comment');
  const bigPictureCommentsCounter = document.querySelector('.social__comment-count');
  const bigPictureCommentsLoader = document.querySelector('.comments-loader');
  const comments = source.comments;

  bigPictureCommentsLoader.classList.add('hidden');

  for (let currentIndex = DEFAULT_VISIBLE_COMMENTS_AMOUNT; currentIndex < bigPictureComments.length; currentIndex++) {
    bigPictureComments[currentIndex].classList.add('hidden');
  }

  const checkLoaderVisibility = () => {
    bigPictureComments.forEach((comment) => {
      if(!comment.classList.contains('hidden')) {
        bigPictureCommentsLoader.classList.add('hidden');
      } else {
        bigPictureCommentsLoader.classList.remove('hidden');
      }
    });
  };

  const countVisibleComments = () => Array.from(bigPictureComments)
    .reduce((accumulator, comment) => accumulator + 1 - comment.classList.contains('hidden'), 0);

  const countInvisibleComments = () => comments.length - countVisibleComments();

  const updateBigPictureCommentsCounter = () => {
    bigPictureCommentsCounter.textContent = `${countVisibleComments()} из ${comments.length} комментариев`;
  };

  updateBigPictureCommentsCounter();
  checkLoaderVisibility();

  const updateCommentVisibility = (comment) => {
    comment.classList.remove('hidden');
    checkLoaderVisibility();
    updateBigPictureCommentsCounter();
  };

  const onBigPictureCommentsLoaderClick = () => {
    const visibleCommentsCount = countVisibleComments();
    const inVisibleCommentsCount = countInvisibleComments();
    const updatedVisibleCommentsCount = visibleCommentsCount + COMMENTS_LOADED_PER_CLICK_AMOUNT;

    if (inVisibleCommentsCount > COMMENTS_LOADED_PER_CLICK_AMOUNT) {
      for (let commentId = visibleCommentsCount; commentId < updatedVisibleCommentsCount; commentId++) {
        updateCommentVisibility(bigPictureComments[commentId]);
      }
    } else {
      for (let commentId = visibleCommentsCount; commentId < bigPictureComments.length; commentId++) {
        updateCommentVisibility(bigPictureComments[commentId]);
      }
    }
  };

  bigPictureCommentsLoader.addEventListener('click', onBigPictureCommentsLoaderClick);
};

export { defineVisibility };
