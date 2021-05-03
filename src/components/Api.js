export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // получение изначальных карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
    .then(res => {
      if (res.ok)
        return res.json();
      else
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // добавление новой карточки
  addCard() {

  }

  // удаление карточки
  deleteCard() {

  }

  // получение информации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
    .then(res => {
      if (res.ok)
        return res.json();
      else
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // изменение информации о пользователе
  changeUserInfo(newInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(newInfo)
    })
  }

  // изменить фото в профиле
  changeAvatar(newLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(newLink)
    })
  }

  // поставить лайк
  likeCard() {

  }

  // убрать лайк
  dislikeCard() {

  }

  // тест запросов
  test() {
    console.log();
  }
}
