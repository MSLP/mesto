import Popup from './Popup.js';

// класс окна с формой
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputValues = {};
    this._form = this._popup.querySelector('.popup__form');
    this._allInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._button = this._popup.querySelector('.popup__save');
    this._buttonContent = this._button.textContent;
  }

  // получение данных из полей формы
  _getInputValues() {
    this._allInputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // ожидание отправки запроса на сервер
  renderLoading(isLoading) {
    if (isLoading)
      this._button.textContent = 'Сохранение ...';
    else
      this._button.textContent = this._buttonContent;
  }

  // навешивание слушателей на попап
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => this._formSubmit(this._getInputValues()));
  }

  // закрытие попапа
  close() {
    super.close();
    this._form.reset();
    this.renderLoading(false);
  }
}
