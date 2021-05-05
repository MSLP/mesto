import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__save');
    this._buttonContent = this._button.textContent;
  }

  // передаем функцию удаления
  setFormSubmit(submit) {
    this._formSubmit = submit;
  }

  // ожидание отправки запроса на сервер
  renderLoading(isLoading) {
    if (isLoading)
      this._button.textContent = this._buttonContent + '...';
    else
      this._button.textContent = this._buttonContent;
  }

  // навешивание слушателей на попап
  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => this._formSubmit());
  }
}
