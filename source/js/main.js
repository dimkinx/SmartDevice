'use strict';

(function () {

  const bodyElement = document.querySelector('body');
  const initModalLink = bodyElement.querySelector('.page-header__contacts-link--order-call');
  const modalElement = bodyElement.querySelector('.modal');
  const modalForm = modalElement.querySelector('.modal__form');
  const modalUserName = modalElement.querySelector("[name=modal-user-name]");
  const modalPhoneNumber = modalElement.querySelector("[name=modal-phone-number]");
  const modalText = modalElement.querySelector("[name=modal-text]");
  const closeModalButton = modalElement.querySelector('.modal__close-button');
  const modalOverlay = modalElement.querySelector('.modal__overlay');
  const footerElement = document.querySelector('.page-footer');
  const siteMenuBlock = footerElement.querySelector('.site-menu');
  const toggleButtons = footerElement.querySelectorAll('.page-footer__toggle-button');

  const scrollDisable = function (element) {
    element.style.overflow = 'hidden';
  };

  const scrollEnable = function (element) {
    element.style.overflow = '';
  };

  const isEscapeKey = function (evt) {
    return evt.key === 'Escape'
      || evt.key === 'Esc';
  };

  const buttonClickHandler = function () {
    closeModalHandler();
  };

  const overlayClickHandler = function () {
    closeModalHandler();
  };

  const escPressHandler = function (evt) {
    return isEscapeKey(evt) && closeModalHandler();
  };

  const setData = function () {
    localStorage.setItem("modal-user-name", modalUserName.value);
    localStorage.setItem("modal-phone-number", modalPhoneNumber.value);
    localStorage.setItem("modal-text", modalText.value);
  };

  const dataSubmitHandler = function () {
    return (localStorage!==null) && setData();
  };

  const openModalHandler = function (evt) {
    evt.preventDefault();
    modalElement.classList.add('modal--show');
    modalUserName.focus();
    scrollDisable(bodyElement);

    closeModalButton.addEventListener('click', buttonClickHandler);
    modalOverlay.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown', escPressHandler);
    modalForm.addEventListener('submit', dataSubmitHandler);
  };

  const closeModalHandler = function () {
    modalElement.classList.remove('modal--show');
    scrollEnable(bodyElement);

    closeModalButton.removeEventListener('click', buttonClickHandler);
    modalOverlay.removeEventListener('click', overlayClickHandler);
    document.removeEventListener('keydown', escPressHandler);
    modalForm.removeEventListener('submit', dataSubmitHandler);
  };

  const toggleBlocks = function () {
    for (let i = 0; i < toggleButtons.length; i++) {
      toggleButtons[i].addEventListener('click', function () {
        this.parentNode.classList.toggle('page-footer__section--closed');
      });
    }
  };

  const initPage = function () {
    initModalLink.addEventListener('click', openModalHandler);
    footerElement.classList.remove('page-footer--no-js');
    siteMenuBlock.classList.add('page-footer__section--closed');
    toggleBlocks();
  };

  initPage();

})();
