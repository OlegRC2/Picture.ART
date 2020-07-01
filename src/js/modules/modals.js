const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { // trigger - кнопка вызывающая окно, modal - селектор окна, close - крестик закрытия окна, closeClickOverlay - при клике на подложку окно будет закрыто
        const trigger = document.querySelectorAll(triggerSelector), // получаем кнопку вызова окна
              modal = document.querySelector(modalSelector),        // получаем само окно
              close = document.querySelector(closeSelector),        // получаем кнопку закрытия
              windows = document.querySelectorAll('[data-modal]'),  // берем все модальные окна по дата атрибуту
              scroll = calcScroll(),                                // вычисляем ширину полосы прокрутки
              htmlFontSize = calcGift(),                            // берем значение font-size html документа. Нужно т.к. значения положения не в px а в rem
              GiftElem = document.querySelector('.fixed-gift'),     // получаем элемент с подарком
              rightGift = +getComputedStyle(GiftElem).right.slice(0, 2); // получаем значение положения по Y элемента с подарком


        trigger.forEach(item => {                                   // т.к. получаем псевдомассив, то надо его перебрать и навесить обработчик на каждую кнопку открытия окна
            item.addEventListener('click', (e) => {                 // навешиваем обработчик клика на кнопку
                if (e.target) {                                     // проверяем что у элемента на который кликнули есть e.target (условия для клика по ссылке)
                    e.preventDefault();                             // отменяем стандартное поведение браузера
                }
                
                windows.forEach(item => {                           // перебираем все модальные окна
                    item.style.display = 'none';                    // скрываем их
                });

                modal.style.display = 'block';                      // показваем модальное окно
                document.body.style.overflow = 'hidden';            // запрет прокрутки страницы во время того как открыто модальное окно
                document.body.style.marginRight = `${scroll}px`;    // добавляем сдвиг всей страницы на ширину полосы прокрутки, чтобы страница не дергалась при открытии модального окна
                document.querySelector('.fixed-gift').style.right = `${(scroll + rightGift)/htmlFontSize}rem`; // добавляем сдвиг к элементу с подарком, чтобы он не дергался при открытии модального окна
            });
        });

        close.addEventListener('click', () => {                     // навешиваем обработчик на кнопку закрытия окна
            windows.forEach(item => {                               // перебираем все модальные окна
                item.style.display = 'none';                        // скрываем их
            });

            modal.style.display = 'none';                           // скрываем модальное окно
            document.body.style.overflow = '';                      // установка дефолтного значения на параметр прокрутки страницы
            document.body.style.marginRight = `0px`;                // убираем сдвиг всей страницы на ширину полосы прокрутки, чтобы страница не дергалась при закрытии модального окна
            let rightGiftOpen = +getComputedStyle(GiftElem).right.slice(0, 2);
            document.querySelector('.fixed-gift').style.right = `${(rightGiftOpen - scroll)/htmlFontSize}rem`;
        }); 

        modal.addEventListener('click', (e) => {                    // закрытие окна при клике вне окна
            if (e.target === modal && closeClickOverlay) {          // если место клика входит в родительский элемент окна, но не само окно (у него другой класс) и параметр closeClickOverlay = true
                windows.forEach(item => {                           // перебираем все модальные окна
                    item.style.display = 'none';                    // скрываем их
                });

                modal.style.display = 'none';                       // скрываем модальное окно
                document.body.style.overflow = '';                  // установка дефолтного значения на параметр прокрутки страницы
                document.body.style.marginRight = `0px`;            // убираем сдвиг всей страницы на ширину полосы прокрутки, чтобы страница не дергалась при закрытии модального окна
                let rightGiftOpen = +getComputedStyle(GiftElem).right.slice(0, 2);
                document.querySelector('.fixed-gift').style.right = `${(rightGiftOpen - scroll)/htmlFontSize}rem`;
            }
        });
    }

    function showModalByTime(selector, time) {                      // функция показа окна через время
        setTimeout(() => {
            let display;                                            // переменная для определения открыто ли модальное окно в данный момент

            document.querySelectorAll('[data-modal]').forEach(item => {     // берем все модальные окна
                if (getComputedStyle(item).display !== 'none') {    // если свойство display в текущих стилях не равно none, т.е. окно показано
                    display = 'block';                              // задаем переменной значение
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';   // показываем окно
                document.body.style.overflow = 'hidden';            // запрет прокрутки страницы во время того как открыто модальное окно

                let htmlFontSize = calcGift(),                      // берем значение font-size html документа. Нужно т.к. значения положения не в px а в rem
                    GiftElem = document.querySelector('.fixed-gift'), // получаем элемент с подарком
                    rightGift = +getComputedStyle(GiftElem).right.slice(0, 2), // получаем значение положения по Y элемента с подарком
                    scroll = calcScroll();                          // вычисляем ширину полосы прокрутки
                document.body.style.marginRight = `${scroll}px`;    // добавляем сдвиг всей страницы на ширину полосы прокрутки, чтобы страница не дергалась при открытии модального окна
                document.querySelector('.fixed-gift').style.right = `${(scroll + rightGift)/htmlFontSize}rem`; // добавляем сдвиг к элементу с подарком, чтобы он не дергался при открытии модального окна
            }
            
        }, time);                                                   // передаем время, через которое появится окно
    }

    function calcScroll() {                                         // функция для того чтобы страница не прыгала, когда открывается окно. Прыгает потому что убирается полоса прокрутки сбоку страницы
        let div = document.createElement('div');                    // создаем элемент

        div.style.width = '50px';                                   // задаем ширину блоку
        div.style.height = '50px';                                  // задаем высоту блоку
        div.style.overflowY = 'scroll';                             // задаем блоку скролл по Y
        div.style.visibility = 'hidden';                            // элемент остается на странице, но становится полностью прозрачным

        document.body.appendChild(div);                             // добавляем элемент в html документ
        let scrollWidth = div.offsetWidth - div.clientWidth;        // из общей ширины блока вычитаем ширину контента с паддингами и получаем ширину прокрутки
        div.remove();                                               // удаляем элемент со страницы

        return scrollWidth;                                         // возвращаем ширину полосы прокрутки
    }

    function calcGift() {                                           // функция для того, чтобы фиксированный подарок не прыгал во время открытия/закрытия модального окна 
        let a = document.getElementsByTagName('html'),              // берем весь html документ
            calcHtmlFontSize;
        a.forEach(item => {                                         // т.к. это псевдомассив используем forEach
            calcHtmlFontSize = +getComputedStyle(item).fontSize.slice(0, 2);  // получаем свойство font-size html документа
        });

        return calcHtmlFontSize;                                    // возвраoftv значение font-size
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');   // функция модального окна для кнопки "заказать дизайн"
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');   // функция модального окна для кнопки "подробнее об услуге"
    
    showModalByTime('.popup-consultation', 6000);                   // вызываем функцию открытия окна через определенное время
    
};

export default modals;