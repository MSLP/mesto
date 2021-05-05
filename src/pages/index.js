import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {obj} from '../components/constants.js';

// создание экземпляра окна отображения фотографии
const popupWithImage = new PopupWithImage('.popup_show-picture');

// экземпляр попапа подтверждения удаления фото
const popupDeleteCard = new PopupWithConfirmation('.popup_delete-picture');

// создание экзепляра информации о пользователе
const user = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

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

// переменные для работы с окном обновления аватара
const editAvatar = document.querySelector('.profile__edit-avatar');
const avatarForm = document.querySelector('.popup__avatar-form');
const avatarValidator = new FormValidator(obj, avatarForm);

// создание экземпляра класса отвечающего за работу с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'f6f9ecaf-e6cf-427c-9bec-74dcbb4a47a1',
    'Content-Type': 'application/json'
  }
});

// создание карточки
function createCard(item, id) {
  return new Card(item, id, 'element', () => {
    popupWithImage.open(item.name, item.link);
  }, api, popupDeleteCard);
}

// отображение информации профиля
api.getUserInfo()
.then(data => {
  user.setUserInfo(data.name, data.about, data.avatar);

  // отображение изначально имеющихся фото-карточек
  const cardList = new Section((item, data) => {
    const card = createCard(item, data._id);
    cardList.addItem(card.generateCard());
  }, '.elements');

  api.getInitialCards()
  .then(cards => {
    const initialElements = cards;
    cardList.renderAllItems(initialElements, data);

    // сохранение формы добавления новой фотографии
    const popupAddPicture = new PopupWithForm('.popup_add-picture', (inputValues) => {
      const newPhoto = {
        name: inputValues['photo-name'],
        link: inputValues['photo-link']
      }
      popupAddPicture.loading(true);
      api.addCard(newPhoto)
      .then(card => {
        cardList.addItem(createCard(card, data._id).generateCard());
        popupAddPicture.close();
      })
      .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    });
    popupAddPicture.setEventListeners(); // слушатели для закрытия попапа

    // открытие окна добавления новой фотографии
    addButton.addEventListener('click', () => {
      addValidator.disableSaveButton();
      addValidator.deleteErrors();
      popupAddPicture.open();
    });
  })
})
.catch(err => console.log('Ошибка. Запрос не выполнен: ', err));

// включение валидации форм
addValidator.enableValidation();
editValidator.enableValidation();
avatarValidator.enableValidation();

// сохранение формы редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_edit-profile', (inputValues) => {
  popupEditProfile.loading(true);
  const newInfo = {name: inputValues['profile-name'], about: inputValues['profile-description']};
  api.changeUserInfo(newInfo)
  .then((data) => {
    user.setUserInfo(data.name, data.about, data.avatar);
    popupEditProfile.close();
  })
  .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
});

// сохранение формы изменения аватарки
const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', (inputValues) => {
  popupEditAvatar.loading(true);
  api.changeAvatar({avatar: inputValues['avatar-link']})
  .then((data) => {
    user.setUserInfo(data.name, data.about, data.avatar);
    popupEditAvatar.close();
  })
  .catch(err => console.log('Ошибка. Запрос не выполнен: ', err));
});

// установка слушателей попапов
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

// открытие окна редактирования по клику на кнопку
editButton.addEventListener('click', () => {
  editValidator.deleteErrors();
  const info = user.getUserInfo();
  inputProfileName.value = info.name;
  inputDescription.value = info.description;
  popupEditProfile.open();
});

// открытие окна редактирования аватара
editAvatar.addEventListener('click', () => {
  avatarValidator.deleteErrors();
  avatarValidator.disableSaveButton();
  popupEditAvatar.open();
});
