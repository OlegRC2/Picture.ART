const scrolling = (upSelector) => {                                                     // функция для плавного скроллинга на сайте. upSelector - стрелка вверх в углу страницы
    const upElem = document.querySelector(upSelector);                                  // получаем стрелку вверх

    window.addEventListener('scroll', () => {                                           // вешаем событие скролла на окно
        if (document.documentElement.scrollTop > 1650) {                                // если расстояние, которое проскроллено сверху больше 1650 пикселей, то
            upElem.classList.add('animated', 'fadeIn');                                 // отображаем стрелку с анимацией
            upElem.classList.remove('fadeOut');                                         // удаляем класс скрытия
        } else {                                                                        // если пользователь проскрорлил обратно и расстояние стало менее 1650 пикселей, то
            upElem.classList.add('fadeOut');                                            // скрываем стрелку с анимацией
            upElem.classList.add('fadeIn');                                             // удаляем класс показа
        }
    });

    // SCROLL НА REQUEST ANIMATION FRAME

    let links = document.querySelectorAll('[href^="#"]'),                               // берем все ссылки начинающиеся с #
        speed = 0.7;                                                                    // скорость прокрутки

    links.forEach(link => {                                                             // перебираем все ссылки
        link.addEventListener('click', function(event) {                                // навешиваем обработчик клика
            event.preventDefault();                                                     // отменяем стандартное поведение браузера

            let widthTop = document.documentElement.scrollTop,                          // значение сколько уже пролистано
                hash = this.hash,                                                       // получаем хэш текущего элемента
                toBlock = document.querySelector(hash).getBoundingClientRect().top,     // получаем верхнюю границу элемента к которому будет прокрутка
                start = null;                                                           // начальная позиция откуда скроллим

            requestAnimationFrame(step);                                                // функция анимации

            function step(time) {                                                       // функция для создания анимации
                if (start === null) {                                                   // если это первый запуск, то
                    start = time;                                                       
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));  // кол-во пикселей на которое надо пролистать в течении всей анимациии и в какую сторону
                
                document.documentElement.scrollTo(0, r);                                // скроллим до рассчитанного r

                if (r != widthTop + toBlock) {                                          // если еще скролл не дошел до нужного элемента, то
                    requestAnimationFrame(step);                                        // продолжаем выполнение анимации
                } else {                                                                // если значения стали равны, значит анимация должна закончится
                    location.hash = hash;
                }
            }
        });
    });


    // СКРОЛЛ НА ЧИСТОМ JS

    // const element = document.documentElement,                                           // для сокращения записи создаем переменные. 2 переменные нужны для того, т.к. в разных браузерах используются разные свойства, где-то documentElement, а где-то body
    //       body = document.body;       

    // const calcScroll = () => {                                                          // функция для рассчета скролла
    //     upElem.addEventListener('click', function(event) {                              // навешиваем обработчик клика на кнопку
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);            // создаем переменную и помещаем в нее значение сколько уже пролистано. Смотря какой браузер - то значение и будет использоваться

    //         if (this.hash !== '') {                                                     // если хэш текущего элемента не равен пустой строке
    //             event.preventDefault();                                                 // отменяем стандартное поведение браузера
    //             let hashElement = document.querySelector(this.hash),                    // берем элемент по хэшу. Header был назначен id совпадающий с хэшем стрелки, на которую жмем, соответсвенно hashElement - это header
    //                 hashElementTop = 0;                                                 // переменная в которую будет записываться сколько нужно прокрутить до элемента с этим хэшем. Изначально 0

    //             while (hashElement.offsetParent == true) {                              // offsetParent - элемент, относительно которого позиционируется hashElement (его родитель). Пока этот элемент (родитель) будет существовать будут выполняться следующие действия
    //                 hashElementTop += hashElement.offsetTop;                            // offsetTop - позволяет понять сколько пикселей осталось до родительского элемента. Прибавляем это значение к текущему   
    //                 hashElement = hashElement.offsetParent;                             // перебор всех родителей друг за другом, если их несколько, в данном случае только 1 родитель body
    //             }
    //             console.log(hashElement.offsetParent);
    //             hashElementTop = Math.round(hashElementTop);                            // округляем получившееся значение на всякий случай
    //             smoothScroll(scrollTop, hashElementTop, this.hash);                     // вызываем функцию плавной прокрутки
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {                                          // функция плавной прокрутки. from - откуда, to - куда, hash - хэш элемента
    //     let timeInterval = 1,                                                           // время прокрутки
    //         prevScrollTop,                                                              // переменная для контроля того, сколько осталось двигаться
    //         speed;                                                                      // скорость анимации

    //     if (to > from) {                                                                // если движение сверху вниз
    //         speed = 30;                                                                 // задаем скорость
    //     } else {                                                                        // если движение снизу вверх
    //         speed = -30;                                                                // задаем скорость
    //     }

    //     let move = setInterval(function() {                                             // для создания анимации создаем переменную и записываем в нее id setInterval
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);            // создаем переменную и помещаем в нее значение сколько уже пролистано. Смотря какой браузер - то значение и будет использоваться

    //         if (
    //             prevScrollTop === scrollTop ||                                          // если прокрутили до куда нужно или 
    //             (to > from && scrollTop >= to) ||                                       // если движение сверху вниз и текущее положение больше или равно началу
    //             (to > from && scrollTop <= to)                                          // если движение снизу вверх и текущее положение меньше или равно началу
    //         ) {
    //             clearInterval(move);                                                    // останавливаем анимацию
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);     // в адресной сроке убираем # и добавляем hash
    //         } else {
    //            body.scrollTop += speed;                                                 // двигаем страницу на значение скорости
    //            element.scrollTop += speed;                                              // двигаем страницу на значение скорости
    //            prevScrollTop = scrollTop;                                               // чтобы знать сколько осталось двигаться задаем текущее значение 
    //         }
    //     }, timeInterval);                                                               // задаем время повтора (интервал) всех действий
    // };

    // calcScroll();                                                                       // вызываем функцию для рассчета скролла

};

export default scrolling;