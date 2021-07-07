import { isEscEvent} from './utils.js';

const body = document.querySelector('body');

const setUpSuccessPopUp = () => {
  const successPopUpTemplate = document.querySelector('#success').content;
  const successPopUpFragment = document.createDocumentFragment();
  const successPopup = successPopUpTemplate.cloneNode(true);

  successPopUpFragment.appendChild(successPopup);
  body.appendChild(successPopUpFragment);

  const successPopupWrapper = document.querySelector('.success');

  const successPopupClose = () => {
    body.removeChild(successPopupWrapper);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onSuccessPopUpEscKeydown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', outsideSuccesPopUpPopupClick);
  };

  const onSuccessPopUpEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      successPopupClose();
    }
  };

  const outsideSuccesPopUpPopupClick = (evt) => {
    if (evt.taget !== successPopupWrapper) {
      successPopupClose();
    }
  };

  const successPopupCloseButton = document.querySelector('.success__button');
  successPopupCloseButton.addEventListener ('click', successPopupClose);

  document.addEventListener('keydown', onSuccessPopUpEscKeydown);
  document.addEventListener('click', outsideSuccesPopUpPopupClick);
};

const setUpFailPopUp = () => {
  const errorPopUpTemplate = document.querySelector('#error').content;
  const errorPopUpFragment = document.createDocumentFragment();
  const errorPopUp = errorPopUpTemplate.cloneNode(true);

  errorPopUpFragment.appendChild(errorPopUp);
  body.appendChild(errorPopUpFragment);

  const errorPopUpWrapper = document.querySelector('.error');

  const errorPopUpClose = () => {
    body.removeChild(errorPopUpWrapper);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onErrorPopUpEscKeydown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', outsideErrorPopUpPopupClick);
  };

  const onErrorPopUpEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      errorPopUpClose();
    }
  };

  const outsideErrorPopUpPopupClick = (evt) => {
    if (evt.taget !== errorPopUpWrapper) {
      errorPopUpClose();
    }
  };

  const errorPopupCloseButton = document.querySelector('.error__button');
  errorPopupCloseButton.addEventListener ('click', errorPopUpClose);

  document.addEventListener('keydown', onErrorPopUpEscKeydown);
  document.addEventListener('click', outsideErrorPopUpPopupClick);
};

export {setUpSuccessPopUp, setUpFailPopUp };
