import {showPicture} from './index.js';

export default class Card {
  constructor(element, selector) {
    this._name = element.name;
    this._link = element.link;
    this._selector = selector;
  }

  // получаем разметку для будущей карточки
  _getTemplate() {
    const elementTemplate = document.querySelector(`#${this._selector}`).content;
    const cardElement = elementTemplate
    .querySelector(`.${this._selector}`).cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // кнопка и событие для добавления/удаления лайка на фото
    const likeButton = this._card.querySelector(`.${this._selector}__like`);
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle(`${this._selector}__like_active`);
    });

    // кнопка и событие удаления карточки с фотографией
    const deleteButton = this._card.querySelector(`.${this._selector}__bin`);
    deleteButton.addEventListener('click', () => {
      this._card.remove();
    });

    // кнопка для открытия фотографии на всё окно
    const showButton = this._card.querySelector(`.${this._selector}__show-img`);
    showButton.addEventListener('click', () => {
      showPicture(this._name, this._link);
    });
  }

  // заполняем разметку карточки данными
  createCard() {
    this._card = this._getTemplate();
    this._card.querySelector(`.${this._selector}__img`).src = this._link;
    this._card.querySelector(`.${this._selector}__img`).alt = this._name;
    this._card.querySelector(`.${this._selector}__title`).textContent = this._name;
    this._setEventListeners();
    return this._card;
  }
}
