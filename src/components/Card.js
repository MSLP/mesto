// класс карточки с фото
export default class Card {
  constructor(element, userId, selector, handleCardClick, api, popupDelete) {
    this._name = element.name;
    this._link = element.link;
    this._counter = element.likes;
    this._id = element._id;
    this._owner = element.owner;
    this._userId = userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._popupDelete = popupDelete;
  }

  // получение разметки для будущей карточки
  _getTemplate() {
    const elementTemplate = document.querySelector(`#${this._selector}`).content;
    const cardElement = elementTemplate
    .querySelector(`.${this._selector}`).cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // кнопка и событие для добавления/удаления лайка на фото
    this.likeButton.addEventListener('click', () => {
      if (this.likeButton.classList.contains(`${this._selector}__like_active`)) {
        this._api.dislikeCard(this._id)
        .then((data) => {
          this._counterElement.textContent = data.likes.length;
          this.likeButton.classList.remove(`${this._selector}__like_active`);
        })
        .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
      }
      else {
        this._api.likeCard(this._id)
        .then((data) => {
          this._counterElement.textContent = data.likes.length;
          this.likeButton.classList.add(`${this._selector}__like_active`);
        })
        .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
      }
    });

    // кнопка для открытия фотографии на всё окно
    const showButton = this._card.querySelector(`.${this._selector}__show-img`);
    showButton.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // делаем лайки черными, если мы лайкали фото
  _renderLikes() {
    this.likeButton = this._card.querySelector(`.${this._selector}__like`);
    for (let i = 0; i < this._counter.length; i++) {
      if (this._counter[i]._id == this._userId)
        this.likeButton.classList.add(`${this._selector}__like_active`);
    }
  }

  // добавляем корзину только на свои карточки и вешаем на нее слушатель
  _renderBins() {
    this.deleteButton = this._card.querySelector(`.${this._selector}__bin`);
    if (this._owner._id != this._userId)
      this.deleteButton.style.display = "none";
    else
      this.deleteButton.addEventListener('click', () => {
        this._popupDelete.open();
        this._popupDelete.setFormSubmit(() => {
          this._popupDelete.loading(true);
          this._api.deleteCard(this._id)
          .then(() => {
            this._popupDelete.close();
            this._card.remove();
          })
          .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
          .finally(() => this._popupDelete.loading(false))
        });
      });
  }

  // заполняется разметка карточки данными
  generateCard() {
    this._card = this._getTemplate();
    const img = this._card.querySelector(`.${this._selector}__img`);
    img.src = this._link;
    img.alt = this._name;
    this._card.querySelector(`.${this._selector}__title`).textContent = this._name;
    this._counterElement = this._card.querySelector(`.${this._selector}__counter`);
    this._counterElement.textContent = this._counter.length;
    this._renderLikes();
    this._renderBins();
    this._setEventListeners();
    return this._card;
  }
}
