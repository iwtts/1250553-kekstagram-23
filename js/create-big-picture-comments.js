const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

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
};

export {createBigPictureComments, clearCommentsList};
