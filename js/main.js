import {createThumbnails} from './thumbnails.js';
import './form.js';
import { setUploadFormSubmit, uploadFileClose } from './form.js';
import { getData } from './api.js';

getData ((photos) => {
  createThumbnails(photos);
});

setUploadFormSubmit(uploadFileClose);
