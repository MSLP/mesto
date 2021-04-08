export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  // показываем сообщение об ошибке, если поле не валидно
  _showError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorActive);
    input.classList.add(this._config.inputError);
  }

  // скрываем сообщение об ошибке, если поле ввода валидно
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

  // проверяем есть ли хотя бы одно не валидное поле в форме
  // возращает true, если есть
  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid);
  }

  // меняем состояние кнопки в зависимости от валидности формы
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSaveButton(button);
    }
    else {
      button.classList.remove(this._config.saveDisable);
      button.removeAttribute('disabled');
    }
  }

  // устанавливаем слушатели на поля ввода, чтобы поверять их на валидность
  _setInputListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._form.querySelector(this._config.buttonSelector);
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInput(input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // запускаем валидацию формы
  enableValidation() {
    this._setInputListeners();
  }

  disableSaveButton(button) {
    button.classList.add(this._config.saveDisable);
    button.setAttribute('disabled', true);
  }
}
