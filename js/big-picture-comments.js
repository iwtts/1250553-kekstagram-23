const COMMENT_MAX_VISIBLE = 5;

const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

const bigPictureSocialCommentsLoader = document.querySelector('.comments-loader');

const clearCommentsList = function () {
  commentsList.innerHTML = '';
};

const createBigPictureComments = function (source) {
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

  clearCommentsList();

  commentsList.appendChild(commentsFragment);

  const bigPictureCommentsList = document.querySelectorAll('.social__comment');

  for (let commentId = COMMENT_MAX_VISIBLE; commentId < bigPictureCommentsList.length; commentId++) {
    bigPictureCommentsList[commentId].classList.add('hidden');
  }
  const toggleLoaderVisibility = function () {
    bigPictureCommentsList.forEach((comment) => {
      if(!comment.classList.contains('hidden')) {
        bigPictureSocialCommentsLoader.classList.add('hidden');
      } else {
        bigPictureSocialCommentsLoader.classList.remove('hidden');
      }
    });
  };
  const countVisibleComments = function () {
    let visibleCommentsCount  = 0;
    for (let commentId = 0; commentId < bigPictureCommentsList.length; commentId++) {
      if (!bigPictureCommentsList[commentId].classList.contains('hidden')) {
        visibleCommentsCount ++;
      }
    }
    return visibleCommentsCount ;
  };

  const visibleComments = document.querySelector('.visible-comments-count');
  visibleComments.textContent = countVisibleComments();

  toggleLoaderVisibility();

  bigPictureSocialCommentsLoader.addEventListener('click', () => {
    const visibleCount = countVisibleComments();
    const COMMENTS_LOAD_PER_CLICK = 5;
    const updatedVisibleCount = visibleCount + COMMENTS_LOAD_PER_CLICK;

    for (let commentId = visibleCount; commentId < updatedVisibleCount; commentId++) {
      bigPictureCommentsList[commentId].classList.remove('hidden');
      toggleLoaderVisibility();
      visibleComments.textContent = countVisibleComments();
    }
  });
};

export {createBigPictureComments, clearCommentsList};
