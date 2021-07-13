const SCALE_STEP = 0.25;
const DEFAULT_SCALE_VALUE = '100%';
const MAX_SCALE_VALUE = '100%';
const MIN_SCALE_VALUE = '25%';
const MAX_SCALE_ADJUSTER_VALUE = parseInt(MAX_SCALE_VALUE, 10) / 100;
const MIN_SCALE_ADJUSTER_VALUE = parseInt(MIN_SCALE_VALUE, 10) / 100;

const scaleValue = document.querySelector('.scale__control--value');

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const uploadImagePreviewWrapper = document.querySelector('.img-upload__preview');
const uploadImagePreview = uploadImagePreviewWrapper.querySelector('img');

let scaleAdjuster = parseInt(DEFAULT_SCALE_VALUE, 10) / 100;

const defineImageScale = () => {
  scaleSmaller.addEventListener('click', () => {
    scaleAdjuster -= SCALE_STEP;
    uploadImagePreview.style.transform = `scale(${ scaleAdjuster })`;
    scaleValue.value = `${ scaleAdjuster * 100 }%`;
    if (parseInt(scaleValue.value, 10) <= parseInt(MIN_SCALE_VALUE, 10)) {
      scaleAdjuster = MIN_SCALE_ADJUSTER_VALUE;
      uploadImagePreview.style.transform = `scale(${ scaleAdjuster})`;
      scaleValue.value = `${ scaleAdjuster * 100 }%`;
    }
  });

  scaleBigger.addEventListener('click', () => {
    scaleAdjuster += SCALE_STEP;
    uploadImagePreview.style.transform = `scale(${ scaleAdjuster })`;
    scaleValue.value = `${ scaleAdjuster * 100 }%`;
    if (parseInt(scaleValue.value, 10) >= parseInt(MAX_SCALE_VALUE, 10)) {
      scaleAdjuster = MAX_SCALE_ADJUSTER_VALUE;
      uploadImagePreview.style.transform = `scale(${ scaleAdjuster })`;
      scaleValue.value = `${ scaleAdjuster * 100 }%`;
    }
  });
};

const clearPictureScale = () => {
  scaleValue.value = DEFAULT_SCALE_VALUE;
  uploadImagePreview.style.transform = `scale(${ parseInt(DEFAULT_SCALE_VALUE, 10) / 100})`;
};

export {defineImageScale, clearPictureScale};
