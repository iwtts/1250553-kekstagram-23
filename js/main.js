import {createThumbnails} from './thumbnails.js';
import './form.js';
import {setUploadFormSubmit} from './form.js';
import {setUpSuccessPopUp, setUpFailPopUp} from './afterUploadPopup.js';
import {getData} from './api.js';

getData ((photos) => {
  createThumbnails(photos);
});

setUploadFormSubmit(setUpSuccessPopUp, setUpFailPopUp);

