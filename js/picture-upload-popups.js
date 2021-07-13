import {isEscEvent} from './utils.js';

const body = document.querySelector('body');

const setUpSuccessPopUp = () => {
  const successPopUpTemplate = document.querySelector('#success').content;
  const successPopup = successPopUpTemplate.cloneNode(true);

  body.appendChild(successPopup);

  const successPopupWrapper = document.querySelector('.success');

  const onSuccessPopupCloseClick = () => {
    body.removeChild(successPopupWrapper);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onSuccessPopUpEscKeydown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onOutsideSuccesPopUpPopupClick);
  };

  const onSuccessPopUpEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      onSuccessPopupCloseClick();
    }
  };

  const onOutsideSuccesPopUpPopupClick = (evt) => {
    if (evt.taget !== successPopupWrapper) {
      onSuccessPopupCloseClick();
    }
  };

  const successPopupCloseButton = document.querySelector('.success__button');
  successPopupCloseButton.addEventListener ('click', onSuccessPopupCloseClick);

  document.addEventListener('keydown', onSuccessPopUpEscKeydown);
  document.addEventListener('click', onOutsideSuccesPopUpPopupClick);
};

const setUpFailPopUp = () => {
  const errorPopUpTemplate = document.querySelector('#error').content;
  const errorPopUp = errorPopUpTemplate.cloneNode(true);

  body.appendChild(errorPopUp);

  const errorPopUpWrapper = document.querySelector('.error');

  const onErrorPopUpCloseClick = () => {
    body.removeChild(errorPopUpWrapper);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onErrorPopUpEscKeydown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onOutsideErrorPopUpPopupClick);
  };

  const onErrorPopUpEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      onErrorPopUpCloseClick();
    }
  };

  const onOutsideErrorPopUpPopupClick = (evt) => {
    if (evt.taget !== errorPopUpWrapper) {
      onErrorPopUpCloseClick();
    }
  };

  const errorPopupCloseButton = document.querySelector('.error__button');
  errorPopupCloseButton.addEventListener ('click', onErrorPopUpCloseClick);

  document.addEventListener('keydown', onErrorPopUpEscKeydown);
  document.addEventListener('click', onOutsideErrorPopUpPopupClick);
};

export {setUpSuccessPopUp, setUpFailPopUp };
