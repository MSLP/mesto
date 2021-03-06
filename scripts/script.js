//массив данных об изначальном фото-контенте, расположение фото снизу вверх
const initialElements = [
  {
    name: 'Карачаево-Черкесия',
    link: './images/karachaevo.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/karachaevo.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
  }
]

// создание html-кода для карточки с фотографией, добавление вперед всех карточек
function createElement(el) {
  let element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__img').src = el.link;
  element.querySelector('.element__img').alt = el.name;
  element.querySelector('.element__title').textContent = el.name;
  elements.prepend(element);
}

// отображение начальных карточек с фотографиями на странице
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;
initialElements.forEach(el => createElement(el));


// переменные для работы с окном редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const inputProfileName = document.querySelector('.popup__input_profile-name');
const inputDescription = document.querySelector('.popup__input_profile-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editCloseButton = document.querySelector('.popup__close_edit-profile');
const editForm = document.querySelector('.popup__edit-form');

// переменные для работы с окном добавления новой фотографии
const addButton = document.querySelector('.profile__add-button');
const popupAddPicture = document.querySelector('.popup__add-picture');
const inputPhotoName = document.querySelector('.popup__input_photo-name');
const inputLink = document.querySelector('.popup__input_photo-link');
const addCloseButton = document.querySelector('.popup__close_add-picture');
const addForm = document.querySelector('.popup__add-form');


// открытие всплывающего окна
function showPopup(popupName) {
  //добавление имени и описания в поля, если это окно редактирования профиля
  if (popupName === popupEditProfile) {
    inputProfileName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  }
  popupName.classList.add('popup_opened');
}

// закрытие всплывающего окна
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

// сохранение формы редактирования профиля
function saveEditPopup(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEditProfile);
}

// сохранение формы добавления новой фотографии
function saveAddPopup(evt) {
  evt.preventDefault();
  let newPhoto = {
    name: inputPhotoName.value,
    link: inputLink.value
  }
  createElement(newPhoto);
  closePopup(popupAddPicture);
}

editButton.addEventListener('click', function() {showPopup(popupEditProfile)});
addButton.addEventListener('click', function() {showPopup(popupAddPicture)});
editCloseButton.addEventListener('click', function() {closePopup(popupEditProfile)});
addCloseButton.addEventListener('click', function() {closePopup(popupAddPicture)});
editForm.addEventListener('submit', saveEditPopup);
addForm.addEventListener('submit', saveAddPopup);
