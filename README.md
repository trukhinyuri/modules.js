#MODULES.JS
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
python -m SimpleHTTPServer