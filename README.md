# Таблица адресов с Яндекс картой

# Функции проекта
<ul>
  <li>Добавлять адресса</li>
  <li>Изменять адресса</li>
  <li>Получать координаты на основе данных адресов с помощью react-yandex-maps</li>
  <li>Добавлять адресс при клике на любое место на карте(с автоматическим нахождением адресса) с помощью react-yandex-maps</li>
</ul>
<br/>
Это react-redux приложение, которое использует библиотеки node.js 
<br/>
<br/>
В основной папке:

``` json
  "dependencies": {
    "body-parser": "^1.18.3",
    "express": "^4.16.4",
    "lodash": "^4.17.21",
    "react-scripts": "^5.0.1"
  }
```
В папке /client:
``` json
"dependencies": {
    "@pbe/react-yandex-maps": "^1.2.5",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.5.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.2",
    "react-scripts": "5.0.1",
    "redux-form": "^8.3.10",
    "redux-thunk": "^2.4.2",
    "sass": "^1.68.0",
    "web-vitals": "^2.1.4"
  },
```
# Как запустить проект

``` bash
npm i
```
Установить зависимости в основной папке
<br/>
<br/>
``` bash
npm i
```
Установить зависимости в папке /client
<br/>

<br/>

``` bash
npm run dev
```
Запустить в основной папке скрипт, который запустит server.js на 5000 порту, и потом сам запустит npm start в папке /client <br/>

(Проект работает на 3000 порту, если у вас запустится 5000, просто поменяйте в браузере на 3000)
