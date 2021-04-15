import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor() {
    this._popupPic = document.querySelector('.popup__picture');
    this._popupPicTitle = document.querySelector('.popup__pic-title');
  }
  open() {
    this._popupPic.src = link;
    this._popupPic.alt = name;
    this._popupPicTitle.textContent = name;
  }
}
