// класс информации о пользователе
export default class UserInfo {
  constructor(nameSelector, descSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descSelector);
  }

  // получение информации о пользователе
  getUserInfo() {
    const info = {
      name: this._name.textContent,
      description: this._description.textContent
    }
    return info;
  }

  // сохранение информации о пользователе
  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
