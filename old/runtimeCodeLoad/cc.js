//avoidBugs
try {
//infobox.ru zone
    if (window.location.hostname == "infobox.ru") {
        (function() {
            init()
            function init() {
                setTimeout(addMouseout, 50);
            }
            function addMouseout() {
                document.addEventListener('mouseout', mouseout);
            }
            function mouseout(e) {
                if (Math.round(e.x) >= 0 && Math.round(e.y) <= 0) {
                    carrotquest.track('Попытка ухода с сайта');
                    switch(window.location.pathname) {
                        case "/hosting/":
                        case "/hosting/linux/":
                        case "/hosting/wordpress/":
                        case "/hosting/plesk-bitrix/":
                            carrotquest.track('Попытка ухода с /hosting/ || /hosting/linux/ || /hosting/wordpress/ || /hosting/plesk-bitrix/');
                            break;
                        case "/vps/":
                        case "/vps/linux/":
                        case "/vps/windows/":
                            carrotquest.track('Попытка ухода с /vps/ || /vps/linux/ || /vps/windows/');
                            break;
                        case "/domains/":
                            carrotquest.track('Попытка ухода с /domains/');
                            break;
                        case "/office/":
                        case "/office/pricing/business/":
                        case "/office/pricing/":
                            carrotquest.track('Попытка ухода с /office/ || /office/pricing/business/plans || /office/pricing/ || /office/consultation/');
                            break;
                        case "/mail/":
                            carrotquest.track('Попытка ухода с /mail/');
                            break;

                    }



                    deleteEvent();
                    setTimeout(addMouseout, 50);
                }
            }
            function deleteEvent() {
                document.removeEventListener('mouseout', mouseout);
            }
        }());

        if (!carrotJsEvent) {
            Element.prototype.remove = function() {
                this.parentElement.removeChild(this);
            };
            NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
                for (var i = this.length - 1; i >= 0; i--) {
                    if (this[i] && this[i].parentElement) {
                        this[i].parentElement.removeChild(this[i]);
                    }
                }
            };
            var carrotJsEvent = function() {
                window.addEventListener('message', function(e) {
                    if (e.data.command == 'carrotquest.track') {
                        carrotquest.track(e.data.name, e.data.parametr)
                    };
                    if (e.data.command == 'carrotquest.identify') {
                        carrotquest.identify(e.data.props)
                    };
                    if (e.data.command == 'carrotquest.trackMessageInteraction') {
                        carrotquest.trackMessageInteraction(e.data.id, e.data.type);
                        if (e.data.type == 'replied') {
                            carrotquest.identify([{op: "update_or_create", key: "reply URI", value: location.origin + location.pathname}]);
                        };
                    };
                    if (e.data.command == 'carrotquest.close_popup') {
                        document.getElementById('carrot_frame_' + e.data.id).remove();
                        carrotquest.identify([{ op: 'update_or_create', key: 'popup', value: 'closed' }]);
                        carrotquest.track('Закрыл поп-ап', {
                            'id': e.data.id
                        });
                    };
                    if (e.data.command == 'carrotquest.resize_frame') {
                        document.getElementById('carrot_frame_' + e.data.id).style.height = e.data.height + 'px';
                    };
                    /*            if (e.data.command == 'carrotquest.sendMsgToChat') {
                                    carrotquest.open();
                                    setTimeout(function() {
                                        $('#carrotquest-messenger-reply-textarea').val(e.data.text);
                                        $('#carrotquest-messenger-reply-button').click();
                                    }, 1000);
                                };*/
                });
                window.addEventListener('resize', function(event) {
                    if (document.carrot_frame) {
                        document.carrot_frame.resize_frame();
                    };
                });
            };
            carrotJsEvent();
        };

// Запись NAME_PATH
        if (location.href.indexOf('NAME_PATH=') > -1) {
            inv_str_url = location.href.split('NAME_PATH=')[1];
            if (inv_str_url.indexOf('&') > -1) {
                carrotquest.identify({'NAME_PATH': inv_str_url.split('&')[0]});
            }
            else {
                carrotquest.identify({'NAME_PATH': inv_str_url});
            };
        };

//Определяем есть ли поп-ап на странице
        if (document.querySelectorAll('iframe[id*="carrot_frame"]').length > 0) {
            carrotquest.identify([{op: 'update_or_create', key: 'popup', value: 'opened'}]);
        }
        else {
            carrotquest.identify([{op: 'update_or_create', key: 'popup', value: 'closed'}]);
        };

        carrotquest.identify([{op: "update_or_create", key: "actual URI", value: location.origin + location.pathname}]);

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        };

        if (getCookie('INFOBOXRU_V2_CS_CREATE_ACCOUNT')) {
            carrotquest.identify([{op: "update_or_create", key: "cookie", value: getCookie('INFOBOXRU_V2_CS_CREATE_ACCOUNT')}]);
        };

        function TrackUtm(){
            var utm_source = window.location.href.match(/utm_source=([^&]+)/);
            var utm_medium = window.location.href.match(/utm_medium=([^&]+)/);
            var utm_campaign = window.location.href.match(/utm_campaign=([^&]+)/);
            var utm_term = window.location.href.match(/utm_term=([^&]+)/);
            var utm_content = window.location.href.match(/utm_content=([^&]+)/);
            if (utm_content != undefined) {
                carrotquest.identify({ 'Последняя метка UTM Content': utm_content[1] });
            }
            if (utm_source != undefined) {
                carrotquest.identify({ 'Последняя метка UTM Source': utm_source[1] });
            }
            if (utm_medium != undefined) {
                carrotquest.identify({ 'Последняя метка UTM Medium': utm_medium[1] });
            }
            if (utm_campaign != undefined) {
                carrotquest.identify({ 'Последняя метка UTM Campaign': utm_campaign[1] });
            }
            if (utm_term != undefined) {
                carrotquest.identify({ 'Последняя метка UTM Term': utm_term[1] });
            }
        }
        TrackUtm();

        if (location.hostname == 'infobox.ru') {
            //Пользователь бездействует
            var val1=0, val2, val3=0;
            setInterval(function() {
                val1=val2;
                $(document).on('click', 'body', function() {
                    val2++;
                });
                $(window).scroll(function() {
                    val2++;
                });
                $('*').mouseout(function() {
                    val2++;
                });
                setTimeout(function() {
                    if (val1==val2 && val3 < 2) {
                        carrotquest.track("Пользователь бездействует");
                        val3++;
                    }
                },29000);
            },30000);

            // Запись _ga
            carrotquest.gaApi = (function (trackerId) {
                function getClientId() {
                    var trackers = ga.getAll()
                    for (var i = 0; i < trackers.length; i++) {
                        if (trackers[i].get('trackingId') === trackerId) {
                            return trackers[i].get('clientId')
                        }
                    }
                    return generatedClientId
                }

                return {
                    withClientId: function (callback) {
                        ga(function () {
                            callback(getClientId())
                        })
                    }
                }
            })('UA-40202241-1');

            carrotquest.gaApi.withClientId(function (id) {
                carrotquest.identify([{"op": "union", "key": "_ga", "value": id}]);
            });

            carrotquest.track('Посетил: ' + location.pathname);

            // Раздел: Главная
            if (location.pathname == '/') {
                $('.service-detail a').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. Linux-хостинг»');
                });
                $('.service-detail a').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. WordPress»');
                });
                $('.service-detail a').eq(2).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. 1C-Битрикс»');
                });
                $('.service-detail a').eq(3).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. Linux VPS»');
                });
                $('.service-detail a').eq(4).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. Windows VPS»');
                });
                $('.service-detail a').eq(5).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. Cloud VPS»');
                });
                $('.service-detail a').eq(6).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. Аренда сервера»');
                });
                $('.service-detail a').eq(7).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. Размещение сервера»');
                });
                $('.service-detail a').eq(8).on('click', function() {
                    carrotquest.track('Кликнул «Главная: Подробнее. Размещение майнеров»');
                });
                $('.slider-2014-form-submit').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Главная: заказать хостинг»');
                });
                $('.slider-2014-form-submit').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Главная: заказать VPS»');
                });
                $('.slider-2014-form-submit').eq(2).on('click', function() {
                    carrotquest.track('Кликнул «Главная: заказать Cloud VPS»');
                });
            };

            // Раздел: Хостинг сайтов
            if (location.pathname == '/hosting/') {
                $('[href="/hosting/#plans"]').on('click', function() {
                    carrotquest.track('Кликнул «Главная: #заказать»');
                });
                $('[href="https://infobox.ru/partners/"]').on('click', function() {
                    carrotquest.track('Кликнул «Главная: подробнее о партнерской программе»');
                });
                $('.ibx-hosting-plan-box .ibx-mail-button').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Хостинг: заказать Linux-хостинг»');
                });
                $('.ibx-hosting-plan-box .ibx-mail-button').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Хостинг: заказать Wordpress»');
                });
                $('.ibx-hosting-plan-box .ibx-mail-button').eq(2).on('click', function() {
                    carrotquest.track('Кликнул «Хостинг: заказать 1C-Битрикс»');
                });
            };

            // Заказать хостинг на любой странице
            $('[href="/orders/service/plesk-linux/"]').on('click', function() {
                carrotquest.track('Кликнул «Заказать хостинг»', {
                    'Название услуги': 'Linux-хостинг',
                    'Стоимость в месяц': '99 руб.',
                    'Диск': '5Гб на SSD',
                    'Также включено': 'Автоустановщик 200+ CMS, бесплатный SSL-сертификат, резервное копирование'
                });
            });
            $('[href="/orders/service/plesk-bitrix/"]').on('click', function() {
                carrotquest.track('Кликнул «Заказать хостинг»', {
                    'Название услуги': '1C:Битрикс-хостинг',
                    'Стоимость в месяц': '299 руб.',
                    'Диск': '10Гб на SSD',
                    'Также включено': 'Автоустановщик 1С:Битрикс, бесплатный SSL-сертификат, резервное копирование'
                });
            });
            $('[href="/orders/service/plesk-wordpress/"]').on('click', function() {
                carrotquest.track('Кликнул «Заказать хостинг»', {
                    'Название услуги': 'WordPress-хостинг',
                    'Стоимость в месяц': '199 руб.',
                    'Диск': '5Гб на SSD',
                    'Также включено': 'WordPress Toolkit, бесплатный SSL-сертификат, резервное копирование'
                });
            });

            // Раздел: Хостинг Linux
            if (location.pathname == '/hosting/linux/') {
                $('.ibx-mail-button_green[title="Заказать"]').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Linux-хостинг: заказать1»');
                });
                $('.ibx-mail-button_green[title="Заказать"]').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Linux-хостинг: заказать2»');
                });
            };

            // Раздел: Wordpress-хостинг
            if (location.pathname == '/hosting/wordpress/') {
                $('.ibx-mail-button_green[title="Заказать"]').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Wordpress-хостинг: заказать1»');
                });
                $('.ibx-mail-button_green[title="Заказать"]').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Wordpress-хостинг: заказать2»');
                });
            };

            // Раздел: Хостинг для 1С-Битрикс
            if (location.pathname == '/hosting/plesk-bitrix/') {
                $('.ibx-mail-button_green[title="Заказать"]').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «1С-Битрикс: заказать1»');
                });
                $('.ibx-mail-button_green[title="Заказать"]').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «1С-Битрикс: заказать2»');
                });
            };

            // Раздел: VPS
            if (location.pathname == '/vps/') {
                $('.hosting-green-button').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Выбрать тариф: Linux VPS»');
                });
                $('.hosting-green-button').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Выбрать тариф: Windows VPS»');
                });
                $('.hosting-green-button').eq(2).on('click', function() {
                    carrotquest.track('Кликнул «Выбрать тариф: Cloud VPS»');
                });
            };

            // Раздел: Облако
            if (location.pathname == '/cloud/') {
                $('#cloudUName').on('blur', function() {
                    carrotquest.identify([{op: 'update_or_create', key: '$name', value: $(this).val()}]);
                });
                $('#cloudUPhone').on('blur', function() {
                    carrotquest.identify([{op: 'update_or_create', key: '$phone', value: $(this).val()}]);
                });
                $('#cloudUEmail').on('blur', function() {
                    carrotquest.identify([{op: 'update_or_create', key: '$email', value: $(this).val()}]);
                });
                $('form[action="/cloud/order/"]').on('submit', function() {
                    if ($('#cloudUName').val() != '' && $('#cloudUPhone').val() != '' && $('#cloudUEmail').val() != '' && $('input[name="srv[]"]:checked').length > 0 && $('#agree').length > 0) {
                        var checkedInputs = [];
                        $('input[name="srv[]"]:checked').each(function() {
                            checkedInputs.push($(this).parent().next().text());
                        });
                        carrotquest.track('Отправил форму "Облако: бесплатная консультация"', {
                            'Название компании': $(this).find('#cloudCName').val(),
                            'Выбрал услуги': checkedInputs
                        });
                    };
                });
            };

            // Раздел: Услуги ЦОД
            if (location.pathname == '/servers/') {
                $('.service-detail a').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «ЦОД: подробнее о аренде сервера»');
                });
                $('.service-detail a').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «ЦОД: подробнее о размещении сервера»');
                });
                $('.service-detail a').eq(2).on('click', function() {
                    carrotquest.track('Кликнул «ЦОД: подробнее о размещение майнеров»');
                });
            };

            // Раздел: Microsoft Office
            if (location.pathname == '/office/') {
                $('.button-order-blue').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Office: Запросить консультацию1»');
                });
                $('.button-order-blue').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Office: Запросить консультацию2»');
                });
                $('.button-order-blue').eq(2).on('click', function() {
                    carrotquest.track('Кликнул «Office: Запросить консультацию3»');
                });
                $('.button-order-blue').eq(3).on('click', function() {
                    carrotquest.track('Кликнул «Office: Запросить консультацию4»');
                });
                $('.button-order-partner').on('click', function() {
                    carrotquest.track('Кликнул «Office: подробнее о партнерской программе»');
                });
                $('.button-order[title="Тарифы на Office 365"]').eq(0).on('click', function() {
                    carrotquest.track('Кликнул «Office: Тарифы1»');
                });
                $('.button-order[title="Тарифы на Office 365"]').eq(1).on('click', function() {
                    carrotquest.track('Кликнул «Office: Тарифы2»');
                });
                $('.button-order[title="Тарифы на Office 365"]').eq(2).on('click', function() {
                    carrotquest.track('Кликнул «Office: Тарифы3»');
                });
                $('.button-order[title="Тарифы на Office 365"]').eq(3).on('click', function() {
                    carrotquest.track('Кликнул «Office: Тарифы4»');
                });
            };

            //start
            if (location.pathname == '/orders/service/plesk-linux/order-a/') {
                $(document).on('submit', 'form[action="/orders/service/plesk-linux/do/"]', function() {
                    var sites = $('input#csPleskHostingAmount').val(),
                        monthPrice = parseInt($('.price-per-month').text()),
                        payPeriod = $('.period-selector-radio .iradio_square-blue.checked').next().text(),
                        totalPrice = parseInt($('.price-total').text()),
                        userType = $('.col-user-type-selector .iradio_square-blue.checked').parent().text().trim();
                    carrotquest.track('Оформил заказ - Linux-хостинг', {
                        'Кол-во сайтов': sites,
                        'Стоимость в месяц': monthPrice,
                        'Период оплаты': payPeriod,
                        'Общая стоимость': totalPrice,
                        'Пользователь (физическое / юридическое лицо)': userType
                    });
                });
            }
            else if (location.pathname == '/orders/service/plesk-wordpress/order-a/') {
                $(document).on('submit', 'form[action="/orders/service/plesk-wordpress/do/"]', function() {
                    var sites = $('input[name="plan-amount"]').val(),
                        monthPrice = parseInt($('.price-per-month').text()),
                        payPeriod = $('.period-selector-radio .iradio_square-blue.checked').next().text(),
                        totalPrice = parseInt($('.price-total').text()),
                        userType = $('.col-user-type-selector .iradio_square-blue.checked').parent().text().trim();
                    carrotquest.track('Оформил заказ - WordPress', {
                        'Кол-во сайтов': sites,
                        'Стоимость в месяц': monthPrice,
                        'Период оплаты': payPeriod,
                        'Общая стоимость': totalPrice,
                        'Пользователь (физическое / юридическое лицо)': userType
                    });
                });
            }
            else if (location.pathname == '/orders/service/plesk-bitrix/order-a/') {
                $(document).on('submit', 'form[action="/orders/service/plesk-bitrix/do/"]', function() {
                    var sites = $('input[name="plan-amount"]').val(),
                        monthPrice = parseInt($('.price-per-month').text()),
                        payPeriod = $('.period-selector-radio .iradio_square-blue.checked').next().text(),
                        totalPrice = parseInt($('.price-total').text()),
                        userType = $('.col-user-type-selector .iradio_square-blue.checked').parent().text().trim();
                    carrotquest.track('Оформил заказ - 1C:Битрикс', {
                        'Кол-во сайтов': sites,
                        'Стоимость в месяц': monthPrice,
                        'Период оплаты': payPeriod,
                        'Общая стоимость': totalPrice,
                        'Пользователь (физическое / юридическое лицо)': userType
                    });
                });
            };

            $(document).on('blur', 'input.form-control.form-phone', function() {
                carrotquest.identify([{op: 'update_or_create', key: '$phone', value: $(this).val()}]);
            });

            if (location.pathname == '/domains/') {
                $(document).on('click', '#check_button', function() {
                    carrotquest.track('Проверил домен', {
                        'Домены': $(this).prev('input[name="DomainNameID"]').val()
                    });
                });

                function getDomain() {
                    var domains = $('#whois_check_results input[type="checkbox"]:checked');
                    var result = '';
                    for (var i = 0; i < domains.length; i++) {
                        if (i < domains.length - 1) {
                            result = result + $(domains[i]).next().find('.domain-checkbox-result-domain').text().trim() + ', ';
                        }
                        else {
                            result = result + $(domains[i]).next().find('.domain-checkbox-result-domain').text().trim();
                        };
                    };
                    carrotquest.track('Выбрал домен', {
                        'Домены': result
                    });
                    carrotquest.identify([{op: 'update_or_create', key: 'check_domains', value: result}]);
                };

                $(document).on('click', '.domain-submit', function() {
                    getDomain();
                });
            };

            $(document).on('submit', 'form[action="/index.php?id=CHECKOUT_SCREEN&NAME_PATH=DOMAINS_PATH&SCREEN=CHECKOUT_SCREEN"]', function() {
                var cartItems = $('.OrderRowTD table.level0 tbody tr td');
                var resultCartItems = '';
                for (var i = 0; i < cartItems.length; i++) {
                    if (i < cartItems.length - 1) {
                        resultCartItems = resultCartItems + $(cartItems[i]).text().trim() + ', ';
                    }
                    else {
                        resultCartItems = resultCartItems + $(cartItems[i]).text().trim();
                    };
                };
                var authorization = $('input[name="AuthMode"]:checked').val();
                var clientType = $('input[name="AccMode"]:checked').val();
                var city = $('input#CityID').val();
                var country = $(`select#CountryID option[value=${$('select#CountryID').val()}]`).text().trim();
                var state = $(`select#StateID option[value=${$('select#StateID').val()}]`).text().trim();
                var zipId = $('input#ZipID').val();
                var payMethod = $(`select#NewCardTypeID option[value=${$('select#NewCardTypeID').val()}]`).text().trim();
                carrotquest.track('Оформил заказ - домены', {
                    'Корзина': resultCartItems,
                    'Авторизация': authorization,
                    'Тип клиента': clientType,
                    'Город': city,
                    'Страна': country,
                    'Область': state,
                    'Индекс': zipId,
                    'Способ оплаты': payMethod
                });
            });

            //finish

            // Раздел: Страница VPS Linux
            if (location.pathname == '/vps/linux/') {
                $('.tabs-plan-codename-order').on('click', function() {
                    carrotquest.track('Выбрал - Linux VPS', {
                        'Тариф': $(this).parents('tr').children('td').eq(0).children('a').attr('data-plan-name'),
                        'CPU': $(this).parents('tr').children('td').eq(1).text(),
                        'RAM': $(this).parents('tr').children('td').eq(2).text(),
                        'Диск': $(this).parents('tr').children('td').eq(3).text(),
                        'Сеть': $(this).parents('tr').children('td').eq(4).text(),
                        'Цена': $(this).parents('tr').children('td').eq(5).children('div').text(),
                        'Ссылка': location.href,
                        'Название услуги': 'VPS Linux'
                    });
                });
            };

            // Раздел: Страница VPS Windows
            if (location.pathname == '/vps/windows/') {
                $('.tabs-plan-codename-order').on('click', function() {
                    carrotquest.track('Выбрал - Windows VPS', {
                        'Тариф': $(this).parents('tr').children('td').eq(0).children('a').attr('data-plan-name'),
                        'CPU': $(this).parents('tr').children('td').eq(1).text(),
                        'RAM': $(this).parents('tr').children('td').eq(2).text(),
                        'Диск': $(this).parents('tr').children('td').eq(3).text(),
                        'Сеть': $(this).parents('tr').children('td').eq(4).text(),
                        'Цена': $(this).parents('tr').children('td').eq(5).children('div').text(),
                        'Ссылка': location.href,
                        'Название услуги': 'VPS Windows'
                    });
                });
            };

            // Раздел: Страница оформления VPS
            if (location.pathname == '/orders/service/vps/order-a/') {
                $('#form-order').on('submit', function() {
                    if ($('input[name="agree"]').is(':checked') && $('.form-error-message:visible').length == 0) {
                        carrotquest.track('Оформил заказ - VPS', {
                            'Тарифный план': $('.plan-select-item.panel-primary').find('.panel-plan-name').eq(0).text(),
                            'Дата-центр': $('.location-selected').eq(0).text(),
                            'Операционная система': $('.panel-os-distr-active').attr('data-os-group'),
                            'Промокод': $('#csPromocode').val(),
                            'Тип клиента': $('#user-type-fl').parent().parent().contents().filter(function() {return this.nodeType == 3;}).text()
                        });
                        $('input[id*="Name"][name*="name-full"]').each(function() {
                            if ($(this).is(':visible')) {
                                var nameVal = $(this).val();
                            }
                        });
                        $('input[name="fl-phone-full"]').each(function() {
                            if ($(this).is(':visible')) {
                                var phoneVal = $(this).val();
                            }
                        });
                        $('input[type="email"]').each(function() {
                            if ($(this).is(':visible')) {
                                var emailVal = $(this).val();
                            }
                        });
                        carrotquest.identify([{op: 'update_or_create', key: '$name', value: nameVal}]);
                        carrotquest.identify([{op: 'update_or_create', key: '$phone', value: phoneVal}]);
                        carrotquest.identify([{op: 'update_or_create', key: '$email', value: emailVal}]);
                    };
                });
            };

            // Раздел: Страница Cloud VPS
            if (location.pathname == '/vps/cloud/') {
                $('.form-submit-key *').on('click', function() {
                    carrotquest.track('Выбрал - Cloud VPS', {
                        'Ядра процессора': $('#procCoreTo').val(),
                        'Оперативная память': $('#memoryTo').val(),
                        'Дисковое пространство': $('#diskSpaceTo').val(),
                        'Количество IP-адресов': $('#ipTo').val(),
                        'Операционная система': $('input[name="paciOs"]:checked').parent().next().text().trim(),
                        'Ссылка': location.href,
                        'Название услуги': 'Cloud VPS'
                    });
                });
            };

            // Раздел: Страница оформления Cloud VPS
            if (location.origin + location.pathname == 'https://store.pa.infobox.ru/index.php') {
                $('#checkoutForm').on('submit', function() {
                    if ($('#AgreementID').is(':checked') && $('.widgetErroneous input').length == 0) {
                        carrotquest.track('Оформил заказ - Cloud VPS', {
                            'Корзина': $('.OrderRowTD td').text().trim(),
                            'Авторизация': $('input[name="AuthMode"]:checked').parent().contents().filter(function() {return this.nodeType == 3;}).text().trim(),
                            'Тип клиента': $('input[name="AccMode"]:checked').next().text().trim(),
                            'Способ оплаты': $('#NewCardTypeID option:selected').text().trim(),
                            'Город': $('#CityID').val(),
                            'Страна': $('#CountryID option:selected').text(),
                            'Область': $('#StateID option:selected').text(),
                            'Индекс': $('#ZipID option:selected').text()
                        });
                        carrotquest.identify([{op: 'update_or_create', key: '$name', value: $('#FirstNameID').val()}]);
                        carrotquest.identify([{op: 'update_or_create', key: '$phone', value: $('#country_Phone').val() + $('#area_Phone').val() + $('#number_Phone').val() + $('#extension_Phone').val()}]);
                    };
                });
            };

            // Раздел: Страница аренды сервера
            if (location.pathname == '/servers/dedicated/') {
                $('form[action="/order/dedicated_sale_custom/"] input[type="submit"]').on('click', function() {
                    carrotquest.track('Выбрал - Брендовую конфигурацию', {
                        'Конфигурация': $(this).parent().parent().prev().prev().text(),
                        'Цена': $(this).parent().parent().prev().children('span').text(),
                        'Ссылка': location.href,
                        'Название услуги': 'Аренда сервера'
                    });
                });

                $('form[action="/order/dedicated_sale/"] input[type="submit"]').on('click', function() {
                    carrotquest.track('Выбрал - Из доступных конфигураций', {
                        'CPU': $(this).parents('tr').children('td').eq(0).children('div').text(),
                        'RAM': $(this).parents('tr').children('td').eq(1).text(),
                        'HDD': $(this).parents('tr').children('td').eq(2).text(),
                        'Цена': $(this).parents('tr').children('td').eq(3).children('span').text(),
                        'Ссылка': location.href,
                        'Название услуги': 'Аренда сервера'
                    });
                });

                $('form[action="/servers/dedicated/do/order-custom-server.php"]').on('submit', function() {
                    if ($(this).find('input[name="name"]').val() != '' && $(this).find('input[name="phone"]').val() != '') {
                        carrotquest.identify([{op: 'update_or_create', key: '$name', val: $(this).find('input[name="name"]').val()}]);
                        carrotquest.identify([{op: 'update_or_create', key: '$email', val: $(this).find('input[name="email"]').val()}]);
                        carrotquest.identify([{op: 'update_or_create', key: '$phone', val: $(this).find('input[name="phone"]').val()}]);
                        carrotquest.track('Оставил заявку на конфигурацию', {
                            'Компания': $(this).find('input[name="company"]').val()
                        });
                    };
                });
            };

            // Раздел: Размещение серверов
            if (location.pathname == '/servers/colocation/') {
                $('form[action="/order/colocation/"]').on('submit', function() {
                    carrotquest.track('Выбрал размещение сервера', {
                        'Название услуги': 'Размещение сервера',
                        'Ссылка': location.href,
                        'Тип корпуса': $(this).parents('tr').children('td').eq(0).text(),
                        'IP-адреса': $(this).parents('tr').children('td').eq(1).text(),
                        'Полоса': $(this).parents('tr').children('td').eq(2).text(),
                        'Цена': $(this).parents('tr').children('td').eq(3).text(),
                    });
                });
            };

            // Раздел: Размещение майнеров
            if (location.pathname == '/servers/mining/') {
                $('.table-plan-info .ibx-button').on('click', function() {
                    carrotquest.track('Выбрал размещение майнеров', {
                        'Название услуги': 'Размещение майнера',
                        'Ссылка': location.href,
                        'Количество устройств': $(this).parents('tr').children('td').eq(0).text(),
                        'Стоимость 1кВт/мес': $(this).parents('tr').children('td').eq(1).text(),
                        'Стоимость размещения': $(this).parents('tr').children('td').eq(2).text()
                    });
                });
            };

            // Раздел: Почта Exchange
            if (location.pathname == '/mail/') {
                $('.o365-table .button-order').eq(0).on('click', function() {
                    carrotquest.track('Выбрал - Microsoft Exchange Online', {
                        'План': 'Стандартный',
                        'Цена': '350 руб/мес',
                        'Ссылка': location.href,
                        'Название услуги': 'Электронная почта Microsoft Exchange Online'
                    });
                });
                $('.o365-table .button-order').eq(1).on('click', function() {
                    carrotquest.track('Выбрал - Microsoft Exchange Online', {
                        'План': 'Бизнес',
                        'Цена': '600 руб/мес',
                        'Ссылка': location.href,
                        'Название услуги': 'Электронная почта Microsoft Exchange Online'
                    });
                });
                $('.o365-table .button-order').eq(2).on('click', function() {
                    carrotquest.track('Выбрал - Microsoft Exchange Online', {
                        'План': 'Бизнес премиум',
                        'Цена': '870 руб/мес',
                        'Ссылка': location.href,
                        'Название услуги': 'Электронная почта Microsoft Exchange Online'
                    });
                });
            };

            // Раздел: Страница тарифов
            if (location.pathname == '/office/pricing/business/' || location.pathname == '/office/pricing/enterprise/') {
                $('.price-column-desktop .button-order span').on('click', function() {
                    if ($(this).attr('id') == 'officeGetEntE1') {
                        var planName = 'Office Корпоративный E1'
                    }
                    else if ($(this).attr('id') == 'officeGetEntE3') {
                        var planName = 'Office Корпоративный E3'
                    }
                    else if ($(this).attr('id') == 'officeGetEntProPlus') {
                        var planName = 'Office Профессиональный плюс'
                    }
                    else if ($(this).attr('id') == 'officeGetBusBase') {
                        var planName = 'Office Бизнес Базовый'
                    }
                    else if ($(this).attr('id') == 'officeGetBusPremium') {
                        var planName = 'Office Бизнес Премиум'
                    }
                    else if ($(this).attr('id') == 'officeGetBus') {
                        var planName = 'Office Бизнес'
                    };
                    carrotquest.track('Выбрал - Microsoft Office', {
                        'План': planName,
                        'Цена': $(this).parents('td').children('span').text(),
                        'Ссылка': location.href,
                        'Название услуги': 'Microsoft Office'
                    });
                });
            };

            $('#csUserFlPhone').on('blur', function() {
                carrotquest.identify([{op: 'update_or_create', key: '$phone', value: $(this).val()}]);
            });
        };
    }; //end of infobox.ru
} catch (err) {

    console.log("CC: custom scenario bug. Please, mail to ytrukhin@infobox.ru");

}
