import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

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

// отображение изначально имеющихся фото элементов
const cardList = new Section({
  items: initialElements,
  renderer: (item) => {
    const card = new Card(item, 'element', () => {
      popupWithImage.open(item.name, item.link);
    });
    cardList.addItem(card.generateCard());
  }
}, '.elements');
cardList.renderItems();

// включение валидации форм
addValidator.enableValidation();
editValidator.enableValidation();

// сохранение формы редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_edit-profile', () => {
  popupEditProfile._getInputValues();
  user.setUserInfo(popupEditProfile._inputValues['profile-name'], popupEditProfile._inputValues['profile-description']);
  popupEditProfile.close();
});

// сохранение формы добавления новой фотографии
const popupAddPicture = new PopupWithForm('.popup_add-picture', () => {
  popupAddPicture._getInputValues();
  const newPhoto = {
    name: popupAddPicture._inputValues['photo-name'],
    link: popupAddPicture._inputValues['photo-link']
  }
  cardList._renderer(newPhoto);
  popupAddPicture.close();
});

// открытие окна добавления новой фотографии
addButton.addEventListener('click', () => {
  addValidator.disableSaveButton(saveButton);
  addValidator.deleteErrors();
  popupAddPicture.open();
});

// открытие окна редактирования по клику на кнопку
editButton.addEventListener('click', () => {
  addValidator.deleteErrors();
  const info = user.getUserInfo();
  inputProfileName.value = info.name;
  inputDescription.value = info.description;
  popupEditProfile.open();
});

// навешивание слушателей для попапов
popupAddPicture.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
