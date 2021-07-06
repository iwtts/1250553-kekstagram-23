const uploadImagePreviewWrapper = document.querySelector('.img-upload__preview');
const uploadImagePreview = uploadImagePreviewWrapper.querySelector('img');

const effectsLevelSliderWrapper = document.querySelector('.img-upload__effect-level ');
const effectsLevelSlider = document.querySelector('.effect-level__slider');
const effectsLevelValue = document.querySelector('.effect-level__value');

effectsLevelSliderWrapper.classList.add('hidden');

noUiSlider.create(effectsLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


const effectChangeHandler = function (evt) {
  switch (evt.target.value ) {
    case 'none':
      effectsLevelSliderWrapper.classList.add('hidden');
      uploadImagePreview.className = '';
      uploadImagePreview.style.filter = '';
      break;
    case 'chrome':
      effectsLevelSlider.noUiSlider.updateOptions({
        start: 100,
      });
      effectsLevelSliderWrapper.classList.remove('hidden');
      uploadImagePreview.className = 'effects__preview--chrome';
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        uploadImagePreview.style.filter = `grayscale(${ unencoded[handle] })`;
      });
      break;
    case 'sepia':
      effectsLevelSlider.noUiSlider.updateOptions({
        start: 100,
      });
      effectsLevelSliderWrapper.classList.remove('hidden');
      uploadImagePreview.className = 'effects__preview--sepia';
      effectsLevelSlider.noUiSlider.on('update', (__, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        uploadImagePreview.style.filter = `sepia(${ unencoded[handle] })`;
      });
      break;
    case 'marvin':
      effectsLevelSliderWrapper.classList.remove('hidden');
      uploadImagePreview.className = 'effects__preview--marvin';
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        uploadImagePreview.style.filter = `invert(${ unencoded[handle] }%)`;
      });
      break;
    case 'phobos':
      effectsLevelSliderWrapper.classList.remove('hidden');
      uploadImagePreview.className = 'effects__preview--phobos';
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        uploadImagePreview.style.filter = `blur(${ unencoded[handle] }px)`;
      });
      break;
    case 'heat':
      effectsLevelSliderWrapper.classList.remove('hidden');
      uploadImagePreview.className = 'effects__preview--heat';
      effectsLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectsLevelSlider.noUiSlider.on('update', (___, handle, unencoded) => {
        effectsLevelValue.value = unencoded[handle];
        uploadImagePreview.style.filter = `brightness(${ unencoded[handle] })`;
      });
      break;
  }
};

const clearPictureEffects = () => {
  document.querySelector('#effect-none').checked = true;
  effectsLevelSliderWrapper.classList.add('hidden');
  uploadImagePreview.className = '';
  uploadImagePreview.style.filter = '';
};

export{effectChangeHandler, clearPictureEffects};
