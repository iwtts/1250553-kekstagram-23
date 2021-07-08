import {createThumbnails} from './thumbnails.js';
import {getData} from './data.js';
import {debounce} from './debounce.js';

const RERENDER_DELAY = 500;

const sortByDefaultButton = document.querySelector('#filter-default');
const sortByRandomButton = document.querySelector('#filter-random');
const sortByCommentButton = document.querySelector('#filter-discussed');

const clearButtonsActiveState = () => {
  sortByDefaultButton.classList.remove('img-filters__button--active');
  sortByRandomButton.classList.remove('img-filters__button--active');
  sortByCommentButton.classList.remove('img-filters__button--active');
};

const setUpImageFilters = () => {
  const imageFiltersBar = document.querySelector('.img-filters');
  imageFiltersBar.classList.remove('img-filters--inactive');
};

const applyDefaultFilter = debounce(() => {
  getData ((photos) => {
    createThumbnails(photos);
  });
}, RERENDER_DELAY);

const setUpDefaultFilter = () => {
  sortByDefaultButton.addEventListener('click', () => {
    clearButtonsActiveState();
    sortByDefaultButton.classList.add('img-filters__button--active');
    applyDefaultFilter();
  });
};

const mixArray = (array) => array.map((currentIndex)=>[Math.random(), currentIndex]).sort().map((currentIndex)=>currentIndex[1]);
const applyRandomFilter = debounce(() => {
  getData ((photos) => {
    createThumbnails(mixArray(photos).slice(0, 10));
  });
}, RERENDER_DELAY);

const setUpRandomFilter = () => {
  sortByRandomButton.addEventListener('click', () => {
    clearButtonsActiveState();
    sortByRandomButton.classList.add('img-filters__button--active');
    applyRandomFilter();
  });
};

const applyCommentsFilter = debounce(() => {
  const sortByComments = (com1, com2) => com2.comments.length - com1.comments.length;
  getData ((photos) => {
    photos.sort(sortByComments);
    createThumbnails(photos);
  });
}, RERENDER_DELAY);

const setUpCommentsFilter = () => {
  sortByCommentButton.addEventListener('click', () => {
    clearButtonsActiveState();
    sortByCommentButton.classList.add('img-filters__button--active');
    applyCommentsFilter();
  });
};

export {setUpImageFilters, setUpCommentsFilter, setUpDefaultFilter, setUpRandomFilter};
