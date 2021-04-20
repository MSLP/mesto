// класс валидатора формы
export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.buttonSelector);
  }

  // показ сообщения об ошибке, если поле не валидно
  _showError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorActive);
    input.classList.add(this._config.inputError);
  }

  // скрытие сообщение об ошибке, если поле ввода валидно
  _hideError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = "";
    error.classList.remove(this._config.errorActive);
    input.classList.remove(this._config.inputError);
  }

  // проверяется поле на валидность и показываем/скрываем сообщение об ошибке
  _checkInput(input) {
    if (input.validity.valid) {
      this._hideError(input);
    }
    else {
      this._showError(input);
    }
  }

  // проверка: есть ли хотя бы одно не валидное поле в форме
  // возращает true, если есть
  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  // изменение состояния кнопки в зависимости от валидности формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSaveButton();
    }
    else {
      this._buttonElement.classList.remove(this._config.saveDisable);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  // установка слушателей на поля ввода, чтобы поверять их на валидность
  _setInputListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInput(input);
        this._toggleButtonState();
      });
    });
  }

  // запуск валидации формы
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }

  // переключение кнопки сохранить в неактивное состояние
  disableSaveButton() {
    this._buttonElement.classList.add(this._config.saveDisable);
    this._buttonElement.setAttribute('disabled', true);
  }

  // сброс всех ошибок полей, будет вызываться перед открытием попапа
  deleteErrors() {
    this._inputList.forEach(input => this._hideError(input));
  }
}
