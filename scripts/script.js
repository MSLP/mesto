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

// переменные для создания элементов с фотографиями
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

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

// переменные для работы с окном с фотографией
const popupShowPicture = document.querySelector('.popup_show-picture');
const showCloseButton = document.querySelector('.popup__close_show-picture');
const popupPic = document.querySelector('.popup__picture');
const popupPicTitle = document.querySelector('.popup__pic-title');

// создание html-кода для элемента с фотографией
function createElement(el) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImg = element.querySelector('.element__img');
  const elementTitle = element.querySelector('.element__title');
  elementImg.src = el.link;
  elementImg.alt = el.name;
  elementTitle.textContent = el.name;
  addElement(element);

  // кнопка и событие для добавления/удаления лайка на фото
  const likeButton = element.querySelector('.element__like');
  likeButton.addEventListener('click', like);

  // кнопка и событие удаления карточки с фотографией
  const deleteButton = element.querySelector('.element__bin');
  deleteButton.addEventListener('click', function() {
    element.remove();
  });

  // кнопка для открытия фотографии на всё окно
  const showButton = element.querySelector('.element__show-img');
  showButton.addEventListener('click', function() {showPicture(el);});
}

// добавление нового элемента с фото на страницу, вперед предыдущих
function addElement(element) {
  elements.prepend(element);
}

// открытие всплывающего окна
function showPopup(popup) {
  popup.classList.add('popup_opened');
}

//добавление имени и описания в поля окна редактирования профиля
function showEditPopup() {
  inputProfileName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  showPopup(popupEditProfile);
}

//обнуление полей окна добавления нового фото
function showAddPopup() {
  inputPhotoName.value = "";
  inputLink.value = "";
  showPopup(popupAddPicture);
}

// закрытие всплывающего окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  const newPhoto = {
    name: inputPhotoName.value,
    link: inputLink.value
  }
  createElement(newPhoto);
  closePopup(popupAddPicture);
}

// поставить/убрать лайк
function like (evt) {
  evt.target.classList.toggle('element__like_active');
}

// отображение окна увеличенной фотографии
function showPicture(el) {
  popupPic.src = el.link;
  popupPic.alt = el.name;
  popupPicTitle.textContent = el.name;
  showPopup(popupShowPicture);
}

// отображение изначально имеющихся фото элементов
initialElements.forEach(el => createElement(el));

editButton.addEventListener('click', showEditPopup);
addButton.addEventListener('click', showAddPopup);
editCloseButton.addEventListener('click', function() {closePopup(popupEditProfile)});
addCloseButton.addEventListener('click', function() {closePopup(popupAddPicture)});
showCloseButton.addEventListener('click', function() {closePopup(popupShowPicture)});
editForm.addEventListener('submit', saveEditPopup);
addForm.addEventListener('submit', saveAddPopup);
