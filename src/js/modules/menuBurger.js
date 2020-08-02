const menuBurger = (burgerBtn, burgerMenu) => {                                                     // функция для работы бургер меню. burgerBtn - кнопка вызова меню, burgerMenu - само меню
    const btn = document.querySelector(burgerBtn),                                                  // получаем кнопку
          menu = document.querySelector(burgerMenu);                                                // получаем меню
    
    menu.classList.add('animated');                                                                 // добавляем класс анимации

    btn.addEventListener('click', () => {                                                           // навешиваем обработчик клика на кнопку
        if (document.documentElement.clientWidth <= 992) {
            showHideMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (document.documentElement.clientWidth > 992) {
            menu.classList.remove('fadeInDown');                                                    // удаляем класс анимации появления
            menu.classList.add('fadeOutUp');                                                        // добавляем класс анимации закрытия

            setTimeout(() => {                                                                      // ставим свойство display меню в none через 0,5 сек
                menu.style.display = 'none';
            }, 500);
            
        }
    });

    function showHideMenu() {                                                                       // функция показа меню
        if (menu.style.display == 'none' || menu.style.display == '') {                             // если css свойство display меню равно none или пустой строке, т.е. меню в данный момент не показано, то
            menu.classList.remove('fadeOutUp');                                                     // удаляем класс анимации закрытия
            menu.classList.add('fadeInDown');                                                       // добавляем класс анимации появления
            menu.style.display = 'block';                                                           // показываем меню
        } else {                                                                                    // если меню в данный момент показано
            menu.classList.remove('fadeInDown');                                                    // удаляем класс анимации появления
            menu.classList.add('fadeOutUp');                                                        // добавляем класс анимации закрытия

            setTimeout(() => {                                                                      // ставим свойство display меню в none через 0,5 сек
                menu.style.display = 'none';
            }, 500);
        }
    }
};

export default menuBurger;