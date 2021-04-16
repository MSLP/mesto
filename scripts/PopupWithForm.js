import Popup from './Popup.js';

// класс окна с формой
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputValues = {};
    this._form = this._popup.querySelector('.popup__form');
  }

  // получение данных из полей формы
  _getInputValues() {
    const allInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    allInputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
  }

  // навешивание слушателей на попап
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  }

  // закрытие попапа
  close() {
    super.close();
    this._form.reset();
  }
}
