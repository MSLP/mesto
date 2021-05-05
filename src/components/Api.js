export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // проверка ответа от сервера
  _checkResponse(res) {
    if (res.ok)
        return res.json();
      else
        return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение изначальных карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
    .then(this._checkResponse);
  }

  // добавление новой карточки
  addCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(card)
    })
    .then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._checkResponse);
  }

  // получение информации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
    .then(this._checkResponse);
  }

  // изменение информации о пользователе
  changeUserInfo(newInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(newInfo)
    })
    .then(this._checkResponse);
  }

  // изменить фото в профиле
  changeAvatar(newLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(newLink)
    })
    .then(this._checkResponse);
  }

  // поставить лайк
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(this._checkResponse);
  }

  // убрать лайк
  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this._checkResponse);
  }
}
