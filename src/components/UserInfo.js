// класс информации о пользователе
export default class UserInfo {
  constructor(nameSelector, descSelector, avaSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descSelector);
    this._avatar = document.querySelector(avaSelector);
  }

  // получение информации о пользователе
  getUserInfo() {
    const info = {
      name: this._name.textContent,
      description: this._description.textContent,
      avatar: this._avatar.src
    }
    return info;
  }

  // сохранение информации о пользователе
  setUserInfo(name, description, avatar) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._avatar.src = avatar;
  }
}
