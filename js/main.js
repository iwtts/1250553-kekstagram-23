import {createThumbnails} from './thumbnails.js';
import {setUploadFormSubmit} from './form.js';
import {setUpSuccessPopUp, setUpFailPopUp} from './picture-upload-popups.js';
import {getData} from './data.js';
import {setUpCommentsFilter, setUpDefaultFilter, setUpRandomFilter} from './filters.js';

getData ((photos) => {
  createThumbnails(photos);
  setUpDefaultFilter(photos);
  setUpRandomFilter(photos);
  setUpCommentsFilter(photos);
});

setUploadFormSubmit(setUpSuccessPopUp, setUpFailPopUp);

