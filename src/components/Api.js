export default class Api {
  constructor(options) {
    this._options = options;
  }

  // получение изначальных карточек
  getInitialCards() {

  }

  // добавление новой карточки
  addCard() {

  }

  // удаление карточки
  deleteCard() {

  }

  // получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._options.headers
    })
    .then(res => {
      if (res.ok)
        return res.json();
      else
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // изменение информации о пользователе
  changeUserInfo() {

  }

  // изменить фото в профиле
  changeAvatar() {

  }

  // поставить лайк
  likeCard() {

  }

  // убрать лайк
  dislikeCard() {

  }

  // тест запросов
  test() {
    console.log(this.getUserInfo());
  }
}
