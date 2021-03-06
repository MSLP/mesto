// класс отвечающий за отрисовку элементов на странице
export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовка изначальных элементов на странице
  renderAllItems(items, data) {
    items.forEach(item => {
      this._renderer(item, data);
    });
  }

  // добавление нового элемента на страницу
  addItem(item) {
    this._container.prepend(item);
  }
}
