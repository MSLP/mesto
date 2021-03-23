// объект содержащий класс форм
const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save',
  errorActive: 'error_active',
  inputError: 'popup__input_error',
  saveDisable: 'popup__save_disable'
};

// устанавливаем слушатели на поля ввода, чтобы поверять их на валидность
const setInputListeners = (obj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.buttonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInput(obj, formElement, inputElement);
      toggleButtonState(obj, inputList, buttonElement);
    });
  });
};

// проверяется поле на валидность и показываем/скрываем сообщение об ошибке
const checkInput = (obj, form, input) => {
  if (input.validity.valid) {
    hideError(obj,form, input);
  }
  else {
    showError(obj, form, input);
  }
};

// проверяем есть ли хотя бы одно не валидное поле в форме
// возращает true, если есть
const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid);
};

// показываем сообщение об ошибке, если поле не валидно
const showError = (obj, form, input) => {
  const error = form.querySelector(`#${input.name}-error`);
  error.textContent = input.validationMessage;
  error.classList.add(obj.errorActive);
  input.classList.add(obj.inputError);
};

// скрываем сообщение об ошибке, если поле ввода валидно
const hideError = (obj, form, input) => {
  const error = form.querySelector(`#${input.name}-error`);
  error.textContent = "";
  error.classList.remove(obj.errorActive);
  input.classList.remove(obj.inputError);
};

// меняем состояние кнопки в зависимости от валидности формы
const toggleButtonState = (obj, inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(obj.saveDisable);
    button.setAttribute('disabled', true);
  }
  else {
    button.classList.remove(obj.saveDisable);
    button.removeAttribute('disabled');
  }
};

// функция, устанавливающую слушатели для всех форм
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputListeners(obj, formElement);
  });
};

// вызов функции, устанавливающей валидацию всех форм
enableValidation(object);
