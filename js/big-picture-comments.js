const DEFAULT_VISIBLE_COMMENTS_AMOUNT = 5;
const COMMENTS_LOADED_PER_CLICK_AMOUNT = 5;

const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const commentsCounter = document.querySelector('.social__comment-count');
const bigPictureSocialCommentsLoader = document.querySelector('.comments-loader');

const clearCommentsList = () => commentsList.innerHTML = '';

const createBigPictureComments = function (source) {
  const comments = source.comments;
  const commentsFragment = document.createDocumentFragment();
  bigPictureSocialCommentsLoader.classList.add('hidden');

  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImage = commentElement.querySelector('.social__picture');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    const commentText = commentElement.querySelector('.social__text');
    commentText.textContent = comment.message;

    commentsFragment.appendChild(commentElement);
  });

  clearCommentsList();

  commentsList.appendChild(commentsFragment);

  const bigPictureComments = document.querySelectorAll('.social__comment');

  for (let currentIndex = DEFAULT_VISIBLE_COMMENTS_AMOUNT; currentIndex < bigPictureComments.length; currentIndex++) {
    bigPictureComments[currentIndex].classList.add('hidden');
  }

  const checkLoaderVisibility = function () {
    bigPictureComments.forEach((comment) => {
      if(!comment.classList.contains('hidden')) {
        bigPictureSocialCommentsLoader.classList.add('hidden');
      } else {
        bigPictureSocialCommentsLoader.classList.remove('hidden');
      }
    });
  };

  const countVisibleComments = function () {
    let visibleCommentsCount  = 0;
    for (let commentId = 0; commentId < bigPictureComments.length; commentId++) {
      if (!bigPictureComments[commentId].classList.contains('hidden')) {
        visibleCommentsCount ++;
      }
    }
    return visibleCommentsCount ;
  };

  const countInvisibleComments = function () {
    let invisibleCommentsCount  = 0;
    for (let commentId = 0; commentId < bigPictureComments.length; commentId++) {
      if (bigPictureComments[commentId].classList.contains('hidden')) {
        invisibleCommentsCount ++;
      }
    }
    return invisibleCommentsCount;
  };

  const updateVisibleCommentsCounter = () => {
    commentsCounter.innerHTML = ` ${countVisibleComments()} из <span class="comments-count">${comments.length}</span> комментариев`;
  };

  updateVisibleCommentsCounter();

  checkLoaderVisibility();

  const updateCommentVisibility = (comment) => {
    comment.classList.remove('hidden');
    checkLoaderVisibility();
    updateVisibleCommentsCounter();
  };

  bigPictureSocialCommentsLoader.addEventListener('click', () => {
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
  });
};

export {
  createBigPictureComments,
  clearCommentsList
};
