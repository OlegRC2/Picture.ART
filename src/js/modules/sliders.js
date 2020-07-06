const sliders = (slides, dir, prev, next) => {                              // slides - сами слайды, dir - направление движениея слайдов (горизонтально или вертикально), prev и next стрелки 
    let slideIndex = 1,                                                     // переменная отображающая текущий слайд
        paused = false;                                                     // переменная для остановки автопереключения при наведении мыши на слайдер
    const items = document.querySelectorAll(slides);                        // получаем все слайды

    function showSlides(n) {                                                // функция показа слайдов, n - slideIndex - слайд, который показывается первым
        if (n > items.length) {                                             // если n выходит больше кол-ва слайдов
            slideIndex = 1;                                                 // сбрасываем slideIndex
        }

        if (n < 1) {                                                        // если долистали в обратную сторону
            slideIndex = items.length;                                      // ставим slideIndex в значение последнего слайда 
        }

        items.forEach(item => {                                             // перебираем все слайды
            item.classList.add('animated');                                 // добавляем каждому слайду класс для работы анимаций
            item.style.display = 'none';                                    // скрываем все слайды
        });

        items[slideIndex - 1].style.display = 'block';                      // показываем первый слайд
    }

    showSlides(slideIndex);                                                 // запускаем функцию для показа первого слайда

    function plusSlides(n) {                                                // функция переключения слайдов
        showSlides(slideIndex += n);                                        // присваиваем со сложением переменной slideIndex n (slideIndex = slideIndex + n) и вызываем с этим значением функцию
    }

    try {                                                                   // для исключения поломки кода используем конструкцию try/catch. Если кнопки не были переданы весь код не ляжет
        const prevBtn = document.querySelector(prev),                       // получаем кнопку назад
              nextBtn = document.querySelector(next);                        // получаем кнопку вперед

        prevBtn.addEventListener('click', () => {                           // навешиваем обработчик клика на кнопку назад
            plusSlides(-1);                                                 // когда нажимаем назад, то вычитаем из slideIndex 1
            items[slideIndex - 1].classList.remove('slideInLeft');          // удаляем класс анимации
            items[slideIndex - 1].classList.add('slideInRight');            // добавляем класс анимации
        });

        nextBtn.addEventListener('click', () => {                           // навешиваем обработчик клика на кнопку dgthtl
            plusSlides(1);                                                  // когда нажимаем вперед, то прибавляем к slideIndex 1
            items[slideIndex - 1].classList.remove('slideInRight');         // удаляем класс анимации
            items[slideIndex - 1].classList.add('slideInLeft');             // добавляем класс анимации
        });
    } catch(e){}                                                            // сюда можно добавить описание ошибки

    function activateAnimation() {                                          // функция для автопереключения
        if (dir === 'vertical') {                                           // если слайдер вертикальный
            paused = setInterval(function() {                               // переключение сладера автоматически, присваиваем переменной для последующей остановки
                plusSlides(1);                                              // переключаем слайд
                items[slideIndex - 1].classList.add('slideInDown');         // добавляем класс анимации
            }, 3000);                                                       // период переключения 3 сек
        } else {                                                            // иначе слайдер горизонтальный (можно передать любое значение)
            paused = setInterval(function() {                               // переключение сладера автоматически, присваиваем переменной для последующей остановки
                plusSlides(1);                                              // переключаем слайд
                items[slideIndex - 1].classList.remove('slideInRight');     // удаляем класс анимации
                items[slideIndex - 1].classList.add('slideInLeft');         // добавляем класс анимации
            }, 3000);
        }
    }

    activateAnimation();                                                    // вызываем функцию для автопереключения

    items[0].parentNode.addEventListener('mouseenter', () => {              // навешиваем обработчик наведения мыши на родителя слайда, т.е. на весь слайдер
        clearInterval(paused);                                              // останавливаем автопереключение
    });
    items[0].parentNode.addEventListener('mouseleave', () => {              // навешиваем обработчик отвода мыши с родителя слайда, т.е. на весь слайдер
        activateAnimation();                                                // запускаем автопереключение
    });
};

export default sliders;