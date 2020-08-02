const burger = (menuSelector, burgerSelector) => {                                                      // функция для работы бургер меню. burgerSelector - кнопка вызова меню, menuSelector - само меню
    const menuElem = document.querySelector(menuSelector),                                              // берем меню
          burgerElem = document.querySelector(burgerSelector);                                          // берем бургер
          
    menuElem.style.display = 'none';                                                                    // на всякий случай изначально скрываем меню, хотя оно и так скрыто

    burgerElem.addEventListener('click', () => {                                                        // навешиваем обработчик клика на бургер
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {                       // если меню скрыто и ширина экрана меньше 993 пикселей, то
            menuElem.style.display = 'block';                                                           // показываем меню
        } else {                                                                                        // если меню показано и ширина больше, то
            menuElem.style.display = 'none';                                                            // скрываем меню
        }
    });

    window.addEventListener('resize', () => {                                                           // вешаем обработчик изменения размера окна браузера
        if (window.screen.availWidth > 992) {                                                           // если ширина экрана больше 992
            menuElem.style.display = 'none';                                                            // скрываем меню
        }
    });
};

export default burger;