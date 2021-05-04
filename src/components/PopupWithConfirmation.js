import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  // передаем функцию удаления
  setFormSubmit(submit) {
    this._formSubmit = submit;
  }

  // навешивание слушателей на попап
  setEventListeners() {
    super.setEventListeners();
    this._button = this._popup.querySelector('.popup__save');
    this._button.addEventListener('click', () => this._formSubmit());
  }
}
