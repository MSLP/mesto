import './index.css';

import {initialElements} from '../components/initial-elements.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// объект с селекторами попапов
const obj = {
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save',
  errorActive: 'error_active',
  inputError: 'popup__input_error',
  saveDisable: 'popup__save_disable'
}

// создание экземпляра окна отображения фотографии
const popupWithImage = new PopupWithImage('.popup_show-picture');

// создание экзепляра информации о пользователе
const user = new UserInfo('.profile__name', '.profile__description');

// переменные для работы с окном редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const inputProfileName = document.querySelector('.popup__input_profile-name');
const inputDescription = document.querySelector('.popup__input_profile-description');
const editForm = document.querySelector('.popup__edit-form');
const editValidator = new FormValidator(obj, editForm);

// переменные для работы с окном добавления новой фотографии
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup__add-form');
const addValidator = new FormValidator(obj, addForm);
const saveButton = addForm.querySelector('.popup__save');

// создание карточки
function createCard(item) {
  return new Card(item, 'element', () => {
    popupWithImage.open(item.name, item.link);
  });
}

// отображение изначально имеющихся фото элементов
const cardList = new Section({
  items: initialElements,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card.generateCard());
  }
}, '.elements');
cardList.renderItems();

// включение валидации форм
addValidator.enableValidation();
editValidator.enableValidation();

// сохранение формы редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_edit-profile', (inputValues) => {
  user.setUserInfo(inputValues['profile-name'], inputValues['profile-description']);
  popupEditProfile.close();
});

// сохранение формы добавления новой фотографии
const popupAddPicture = new PopupWithForm('.popup_add-picture', (inputValues) => {
  const newPhoto = {
    name: inputValues['photo-name'],
    link: inputValues['photo-link']
  }
  cardList.addItem(createCard(newPhoto).generateCard());
  popupAddPicture.close();
});

// установка слушателей попапов
popupWithImage.setEventListeners();
popupAddPicture.setEventListeners();
popupEditProfile.setEventListeners();

// открытие окна добавления новой фотографии
addButton.addEventListener('click', () => {
  addValidator.disableSaveButton(saveButton);
  addValidator.deleteErrors();
  popupAddPicture.open();
});

// открытие окна редактирования по клику на кнопку
editButton.addEventListener('click', () => {
  editValidator.deleteErrors();
  const info = user.getUserInfo();
  inputProfileName.value = info.name;
  inputDescription.value = info.description;
  popupEditProfile.open();
});
