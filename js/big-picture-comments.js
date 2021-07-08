import {defineVisibility } from './big-picture-comments-visibility.js';

const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

const clearCommentsList = () => commentsList.innerHTML = '';

const createBigPictureComments = function (source) {
  const comments = source.comments;
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImage = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentText.textContent = comment.message;

    commentsFragment.appendChild(commentElement);
  });

  clearCommentsList();

  commentsList.appendChild(commentsFragment);

  defineVisibility(source);
};

export {createBigPictureComments, clearCommentsList};
