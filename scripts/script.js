let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let inputName = document.querySelector('#input-name');
let inputDescription = document.querySelector('#input-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editForm = document.querySelector('.popup__form');

// открытие окна редактирования профиля
function showPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

// закрытие окна редактирования профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}

// сохранение формы редактирования профиля
function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', savePopup);
