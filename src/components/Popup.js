// класс всплывающего окна
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._closeEscBinder = this._handleEscClose.bind(this);
  }

  // закрытие попапа по кнопке Esc
  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }

  // закрытие попапа по оверлэю
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup'))
      this.close();
  }

  // навешивание слушателей для выполнения закрытия
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }

  // открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeEscBinder);
  }

  // закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeEscBinder);
  }
}
