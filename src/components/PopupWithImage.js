import Popup from './Popup.js';

// класс окна с полноразмерной картинкой
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = this._popup.querySelector('.popup__picture');
    this._popupPicTitle = this._popup.querySelector('.popup__pic-title');
  }

  // открытие попапа с картинкой
  open(name, link) {
    super.open();
    this._popupPic.src = link;
    this._popupPic.alt = name;
    this._popupPicTitle.textContent = name;
  }
}
