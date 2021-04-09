import Card from './Card.js';
import FormValidator from './FormValidator.js';

// объект с селекторами попапов
const obj = {
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save',
  errorActive: 'error_active',
  inputError: 'popup__input_error',
  saveDisable: 'popup__save_disable'
}

// переменная для добавления карточек с фотографиями на страницу
const elements = document.querySelector('.elements');

// переменные для работы с окном редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const inputProfileName = document.querySelector('.popup__input_profile-name');
const inputDescription = document.querySelector('.popup__input_profile-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editCloseButton = document.querySelector('.popup__close_edit-profile');
const editForm = document.querySelector('.popup__edit-form');
const editValidator = new FormValidator(obj, editForm);

// переменные для работы с окном добавления новой фотографии
const addButton = document.querySelector('.profile__add-button');
const popupAddPicture = document.querySelector('.popup_add-picture');
const inputPhotoName = document.querySelector('.popup__input_photo-name');
const inputLink = document.querySelector('.popup__input_photo-link');
const addCloseButton = document.querySelector('.popup__close_add-picture');
const addForm = document.querySelector('.popup__add-form');
const addValidator = new FormValidator(obj, addForm);
const saveButton = addForm.querySelector('.popup__save');

// переменные для работы с окном с фотографией
const popupShowPicture = document.querySelector('.popup_show-picture');
const showCloseButton = document.querySelector('.popup__close_show-picture');
const popupPic = document.querySelector('.popup__picture');
const popupPicTitle = document.querySelector('.popup__pic-title');

// добавление нового элемента с фото на страницу, вперед предыдущих
function addElement(card) {
  elements.prepend(card);
}

// создание карточки
function createCard(item) {
  const card = new Card(item, 'element');
  return card.generateCard();
}

// открытие всплывающего окна
function showPopup(popup) {
  popup.classList.add('popup_opened');
  popupSetListeners(popup);
}

//добавление имени и описания в поля окна редактирования профиля
function showEditPopup() {
  inputProfileName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  editValidator.deleteErrors();
  showPopup(popupEditProfile);
}

//обнуление полей окна добавления нового фото
function showAddPopup() {
  inputPhotoName.value = "";
  inputLink.value = "";
  addValidator.disableSaveButton(saveButton);
  addValidator.deleteErrors();
  showPopup(popupAddPicture);
}

// закрытие всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popupRemoveListeners(popup);
}

// сохранение формы редактирования профиля
function saveEditPopup() {
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
}

// сохранение формы добавления новой фотографии
function saveAddPopup() {
  const newPhoto = {
    name: inputPhotoName.value,
    link: inputLink.value
  }
  addElement(createCard(newPhoto));
  closePopup(popupAddPicture);
}

// отображение окна увеличенной фотографии
export function showPicture(name, link) {
  popupPic.src = link;
  popupPic.alt = name;
  popupPicTitle.textContent = name;
  showPopup(popupShowPicture);
}

// закрытие любого попапа по кнопке Esc
function escapeClosePopup(evt) {
  if (evt.key == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// закрытие любого попапа по оверлэю
function overlayClosePopup (evt) {
  if (evt.target.classList.contains('popup'))
    closePopup(evt.target);
}

// навешивание слушателей закрытия попапа
function popupSetListeners (popup) {
  popup.addEventListener('click', overlayClosePopup);
  document.addEventListener('keydown', escapeClosePopup);
}

// снятие слушателей закрытия попапа
function popupRemoveListeners (popup) {
  popup.removeEventListener('click', overlayClosePopup);
  document.removeEventListener('keydown', escapeClosePopup);
}

// отображение изначально имеющихся фото элементов
initialElements.forEach(el => addElement(createCard(el)));

// включение валидации форм
addValidator.enableValidation();
editValidator.enableValidation();

editButton.addEventListener('click', showEditPopup);
addButton.addEventListener('click', showAddPopup);
editCloseButton.addEventListener('click', function() {closePopup(popupEditProfile)});
addCloseButton.addEventListener('click', function() {closePopup(popupAddPicture)});
showCloseButton.addEventListener('click', function() {closePopup(popupShowPicture)});
editForm.addEventListener('submit', saveEditPopup);
addForm.addEventListener('submit', saveAddPopup);
