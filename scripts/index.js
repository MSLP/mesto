import Card from './Card.js';
import FormValidator from './FormValidator.js';

// списоки всех span и input для сброса ошибок
const errorList = Array.from(document.querySelectorAll('.error'));
const inputList = Array.from(document.querySelectorAll('.popup__input'));

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

// переменные для работы с окном добавления новой фотографии
const addButton = document.querySelector('.profile__add-button');
const popupAddPicture = document.querySelector('.popup_add-picture');
const inputPhotoName = document.querySelector('.popup__input_photo-name');
const inputLink = document.querySelector('.popup__input_photo-link');
const addCloseButton = document.querySelector('.popup__close_add-picture');
const addForm = document.querySelector('.popup__add-form');
const saveButton = addForm.querySelector('.popup__save');

// переменные для работы с окном с фотографией
const popupShowPicture = document.querySelector('.popup_show-picture');
const showCloseButton = document.querySelector('.popup__close_show-picture');
const popupPic = document.querySelector('.popup__picture');
const popupPicTitle = document.querySelector('.popup__pic-title');

// добавление нового элемента с фото на страницу, вперед предыдущих
function addElement(card) {
  elements.prepend(card.createCard());
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
  deleteErrors();
  showPopup(popupEditProfile);
}

//обнуление полей окна добавления нового фото
function showAddPopup() {
  inputPhotoName.value = "";
  inputLink.value = "";
  // saveButton.classList.add('popup__save_disable');
  // saveButton.setAttribute('disabled', true);
  deleteErrors();
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
function saveAddPopup(evt) {
  evt.preventDefault();
  const newPhoto = {
    name: inputPhotoName.value,
    link: inputLink.value
  }
  addElement(new Card(newPhoto, 'element'));
  closePopup(popupAddPicture);
}

// отображение окна увеличенной фотографии
export function showPicture(name, link) {
  popupPic.src = link;
  popupPic.alt = name;
  popupPicTitle.textContent = name;
  showPopup(popupShowPicture);
}

// сброс всех ошибок полей, будет вызываться перед открытием попапа
function deleteErrors() {
  errorList.forEach(error => {
    error.classList.remove('error_active');
  });
  inputList.forEach(input => {
    input.classList.remove('popup__input_error');
  })
}

// закрытие любого попапа по оверлэю или кнопке Esc
function callClosePopup (evt) {
  if (evt.key == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
  if (evt.target.classList.contains('popup'))
    closePopup(evt.target);
}

// навешивание слушателей закрытия попапа
function popupSetListeners (popup) {
  popup.addEventListener('click', callClosePopup);
  document.addEventListener('keydown', callClosePopup);
}

// снятие слушателей закрытия попапа
function popupRemoveListeners (popup) {
  popup.removeEventListener('click', callClosePopup);
  document.removeEventListener('keydown', callClosePopup);
}

// отображение изначально имеющихся фото элементов
initialElements.forEach(el => addElement(new Card(el, 'element')));

editButton.addEventListener('click', showEditPopup);
addButton.addEventListener('click', showAddPopup);
editCloseButton.addEventListener('click', function() {closePopup(popupEditProfile)});
addCloseButton.addEventListener('click', function() {closePopup(popupAddPicture)});
showCloseButton.addEventListener('click', function() {closePopup(popupShowPicture)});
editForm.addEventListener('submit', saveEditPopup);
addForm.addEventListener('submit', saveAddPopup);
