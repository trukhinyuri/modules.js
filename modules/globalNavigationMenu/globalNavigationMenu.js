// alert("Hi!");
//"use strict";
//(function () {
//    var events = new Modules.Events();
//    var items = document.getElementsByClassName('globalNavigationMenu_unorderedList_item');
//    for (var i = 0; i < items.length; i++) {
//        (function(items, i) {
//                events.addListener(items[i], 'click', function() {
//                    var menu = items[i].getElementsByClassName("globalNavigationMenu_unorderedList_dropDownListSpace")[0];
//                    if (menu.style.display == 'none') {
//                        menu.style.display = 'block';
//                    } else {
//                        menu.style.display = 'none';
//                    }
//                });
//        })(items, i);
//    }

//    var server = new Modules.Server();
//    function loadUserNameHandler(userName) {
//        var events = new Modules.Events();
//        var loginState_logout = document.getElementById('loginState_logout');
//        var loginState_content = document.getElementsByClassName('loginState_content')[0];
//        function loginState_logoutClicked() {
//            function logoutHandler() {
//                window.location.href = '/index.html';
//            }
//            server.getStringAsync("/api/public/systemInfo/logout", logoutHandler);
//        }
//        function loginState_contentClicked() {
//            if (userName !== 'guest') {
//                alert('profile_event');
//            }
//            else {
//                window.location.href = '/login.html';
//            }
//        }
//        events.addListener(loginState_logout, 'click', loginState_logoutClicked);
//        events.addListener(loginState_content, 'click', loginState_contentClicked);
//        var loginState = document.getElementsByClassName("loginState")[0];
//        var about_text = document.getElementsByClassName("loginState_content_text")[0];
//        if (userName !== 'guest') {
//            loginState.className = 'loginState_Success';
//            about_text.innerHTML = userName;
//        }
//        else {
//            loginState.className = 'loginState';
//            about_text.innerHTML = 'гость';
//        }
//    }
//    server.getStringAsync("/api/public/systemInfo/userName", loadUserNameHandler);
//}());