#MODULES.JS
##Методика разработки модульных приложений на пользовательском уровне SaaS (modules.js methodology)
В основе методики лежит процесс автоматической сборки страницы приложения из различных модулей по запросу страницы
в веб-браузере. Модули загружаются в хост-файл HTML, содержащий разметку контейнеров для модулей.
На одном уровне в иерархии проекта должен находиться файл CSS с описанием свойств контейнеров хост-файла и файл
JavaScript – загрузчик модулей. Имена CSS и JavaScript файла по соглашению должны совпадать с именем хост-файла.
Процесс загрузки модулей в хост-файл описывается в загрузчике модулей, подключенном в хост-файле после подключения
служебной библиотеки modules.js.
###Пример хост-файла HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="shortcut icon" href="/img/logo-black.ico" type="image/x-icon" />
    <link rel="icon" href="/img/logo-black.ico" type="image/x-icon" />
    <title>Modules.js demo page</title>
    <link rel="stylesheet" href="/index.css" type="text/css"/>
    <script src="/js/libs/modules.js" type="text/javascript"></script>
    <script src="/index.js" type="text/javascript"></script>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="header_navigation"></div>
        <div class="header_loginState"></div>
    </div>
    <div class="body">
        <div class="bodySimple"></div>
        <div class="bodyList"></div>
    </div>
</div>
<div class="footer"></div>
</body>
</html>
```
##Загрузчик модулей
Описывать загрузчик по соглашению необходимо в анонимной функции, запускающeйся после загрузки загрузчика со включенным строгим режимом JavaScript:
```javascript
"use strict"; (function () {/*тело загрузчика*/}());
```
Загрузчик модулей должен вызываться после построения DOM хост-страницы. Для обработки событий в типичных ситуациях в modules.js содержатся обертки, находящиеся в Modules.Events, подключающие обработчик в необходимый момент с учетом особенностей современных веб-браузеров. Регистрация функции, которая должна выполниться после загрузки DOM хост-файла:
```javascript
var events = new Modules.Events(); events.addStartupListener(run);
```
, где run – функция, в которой должны загружаться модули.
Загрузкой модулей, шаблонов и других частей модульного приложения на пользовательском уровне SaaS занимается Modules.Loader. 
Для загрузки модулей указываем местоположение папки с ними:
```javascript
var modules = new Modules.Loader("/modules");
```
Далее можно загрузить модуль (в данном примере модуль называется globalNavigationMenu и загружается в контейнер с именем класса header в хост-файл):
```javascript
modules.load("globalNavigationMenu", "header");
```
После исполнения скрипта загрузчика указанный объект загрузки будет загружен. В скрипте загрузчика необходимо загружать все составные части, необходимые для корректной работы собранной страницы в хост-файле.

*Документация в процессе разработки.*   
Сейчас вы можете скачать проект, и посмотреть на демо-пример index.html для того, чтобы понять, как работает modules.js. Это просто.
## Примечания к выпуску
Для корректной работы на локальной машине из-за системы безопасности современных браузеров при запуске демо-страницы index.html или страницы тестов /js/tests/testsResult.html можно получить ошибку:  
**Died on test #1     at file://localhost/Users/trukhinyuri/modules.js/js/tests/modulesTests.js:40:1: NETWORK_ERR: XMLHttpRequest Exception 101
Source: 	
Error: A network error occurred in synchronous requests.
    at load (file://localhost/Users/trukhinyuri/modules.js/js/libs/modules.js:36:23)
    at Object.<anonymous> (file://localhost/Users/trukhinyuri/modules.js/js/tests/modulesTests.js:43:13)**  
 Для предотвращения подобной ситуации необходимо запускать демо-страницу и страницу тестов в запущенном веб-сервере. Тогда обращение к модулям будет происходить не как file:/// а как http://localhost , что корректно для системы безопасности браузеров. И демо-пример и тесты будут работать.    
###Простой способ запустить локальный веб-сервер в директории
*Требуется установленный Python*  
python -m http.server