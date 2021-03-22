// получаем массив всех форм на странице
const formList = Array.from(document.querySelectorAll('.popup__form'));

// устанавливаем слушатели на поля ввода, чтобы поверять их на валидность
const setInputListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInput(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// проверяется поле на валидность и показываем/скрываем сообщение об ошибке
const checkInput = (form, input) => {
  if (input.validity.valid) {
    hideError(form, input);
  }
  else {
    showError(form, input);
  }
};

// проверяем есть ли хотя бы одно не валидное поле в форме
// возращает true, если есть
const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid);
};

// показываем сообщение об ошибке, если поле не валидно
const showError = (form, input) => {
  const error = form.querySelector(`#${input.name}-error`);
  error.textContent = input.validationMessage;
  error.classList.add('error_active');
  input.classList.add('popup__input_error');
};

// скрываем сообщение об ошибке, если поле ввода валидно
const hideError = (form, input) => {
  const error = form.querySelector(`#${input.name}-error`);
  error.textContent = "";
  error.classList.remove('error_active');
  input.classList.remove('popup__input_error');
};

// меняем состояние кнопки в зависимости от валидности формы
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__save_disable');
    button.setAttribute('disabled', true);
  }
  else {
    button.classList.remove('popup__save_disable');
    button.removeAttribute('disabled');
  }
};

// для каждой формы вызываем функцию, устанавливающую слушатели
formList.forEach(formElement => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  setInputListeners(formElement);
});
