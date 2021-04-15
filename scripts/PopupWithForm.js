import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputValues = {};
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const allInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    allInputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
