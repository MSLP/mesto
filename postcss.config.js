const autoprefixer = require('autoprefixer'); // добавляет вендорные префиксы
const cssnano = require('cssnano'); // занимается минификацией css-кода

module.exports = {
  plugins: [
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать
    // стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
}
