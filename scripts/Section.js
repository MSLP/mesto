// класс отвечающий за отрисовку элементов на странице
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка элементов на странице
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  // добавление элемента в список на отрисовку
  addItem(item) {
    this._container.prepend(item);
  }
}
