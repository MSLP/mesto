let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let inputName = document.querySelector('#input-name');
let inputDescription = document.querySelector('#input-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupSaveButton = document.querySelector('.popup__save');

function showPopup() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    popup.style.display = 'block';
}

function closePopup() {
    popup.style.display = 'none';
}

function savePopup(evt) {
    evt.preventDefault();
    profileName.childNodes[0].textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup();
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSaveButton.addEventListener('click', savePopup);
