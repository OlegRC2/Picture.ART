const sliders = (slideOne, time, slideTwo, next, prev) => {                 // slideOne - слайды первого слайдера, time - время через которое слайды будут сами меняться, slideTwo - слайды второго слайдера, next - стрелка вперед, prev - стрелка назад                                       

    // Первый слайдер
    const slides = document.querySelectorAll(slideOne);                     // передаем сюда слайды для первого слайдера

    let count = 0;                                                          // задаем переменную счетчика слайдов

    function slideHide() {                                                  // функция скрытия всех слайдов
        slides.forEach(item => {                                            // т.к. получаем псевдомассив, то используем forEach
            item.classList.add('hide');                                     // добавляем класс скрытия из bootstrap.css
            item.classList.remove('show');                                  // удаляем класс показа
        });
    }

    function slideShow(i = 0) {                                             // функция показа одного элемента. Задаем i=0 по дефолту, чтобы сначала был активен первый слайд
        slides[i].classList.add('show', 'animated', 'slideInDown');         // добавляем первому элементу класс показа с анимацией
        slides[i].classList.remove('hide');                                 // удаляем с первого элемента класс скрытия
    }
    
    slideHide();                                                            // скрываем все слайды
    slideShow();                                                            // показываем первый слайд

    function slideStep() {                                                  // функция переключения слайда
        slideHide();                                                        // скрываем все слайды
        count++;                                                            // добавляем к счетчику слайдов +1
        slideShow(count);                                                   // показываем следующий слайд
    }

    setInterval(() => {                                                     // функция автоматического переключения слайдов
        if (count + 1 >= slides.length) {                                   // если счетчик выходит за пределы кол-ва слайдов
            count = -1;                                                     // сбрасываем счетчик на -1, т.к. на кажом шаге прибавляется 1, а первый элемент это 0
        }
        slideStep();                                                        // выполняем функцию переключения слайда
    }, time);                                                               // сюда передается время для автопереключения
        

    // Второй слайдер
    const nextSlide = document.querySelector(next),                         // получаем кнопку дальше
          prevSlide = document.querySelector(prev),                         // получаем кнопку назад
          slidesTwo = document.querySelectorAll(slideTwo);                  // передаем сюда слайды для второго слайдера

    let countTwo = 0,                                                       // задаем переменную счетчика слайдов
        intervalId = 0;                                                     // переменная для остановки автоматического переключения слайдера

    function slideHideTwo() {                                               // функция скрытия всех слайдов
        slidesTwo.forEach(item => {                                         // т.к. получаем псевдомассив, то используем forEach
            item.classList.add('hide');                                     // добавляем класс скрытия из bootstrap.css
            item.classList.remove('show');                                  // удаляем класс показа
            item.classList.remove('slideInRight');                          // удаляем класс анимации вправо
            item.classList.remove('slideInLeft');                           // удаляем класс анимации влево
        });
    }

    function slideShowNext(i = 0) {                                         // функция показа элемента при нажатии next. Задаем i=0 по дефолту, чтобы сначала был активен первый слайд
        slidesTwo[i].classList.add('show', 'animated', 'slideInRight');     // добавляем первому элементу класс показа с анимацией
        slidesTwo[i].classList.remove('hide');                              // удаляем с первого элемента класс скрытия
    }

    function slideShowPrev(i) {                                             // функция показа элемента при нажатии prev
        slidesTwo[i].classList.add('show', 'animated', 'slideInLeft');      // добавляем первому элементу класс показа с анимацией
        slidesTwo[i].classList.remove('hide');                              // удаляем с первого элемента класс скрытия
    }

    slideHideTwo();                                                         // скрываем все слайды
    slideShowNext();                                                        // показываем первый слайд

    function slideStepTwo() {                                               // функция автоматического переключения слайда
        slideHideTwo();                                                     // скрываем все слайды
        countTwo++;                                                         // добавляем к счетчику слайдов +1
        slideShowNext(countTwo);                                            // показываем следующий слайд
    }

    function interval() {                                                   // функция автоматического переключения слайдов через заданное время
        intervalId = setInterval(() => {                                    // записываем в переменную значение setInterval
            if (countTwo + 1 >= slidesTwo.length) {                         // если счетчик выходит за пределы кол-ва слайдов
                countTwo = -1;                                              // сбрасываем счетчик на -1, т.к. на кажом шаге прибавляется 1, а первый элемент это 0
            }
            slideStepTwo();                                                 // выполняем функцию переключения слайда
        }, time);

        return intervalId;                                                  // возвращаем id функции setInerval для последующей остановки
    }
    
    intervalId = interval();                                                // запускаем автопереключение

    nextSlide.addEventListener('click', () => {                             // навешиваем обработчик события на кнопку дальше
        if (countTwo + 1 >= slidesTwo.length) {                             // если счетчик выходит за пределы кол-ва слайдов
            countTwo = -1;                                                  // сбрасываем счетчик на -1, т.к. на кажом шаге прибавляется 1, а первый элемент это 0
        }
        slideStepTwo();                                                     // переключаем слайд

        clearInterval(intervalId);                                          // останавливаем автопереключение

        setTimeout(() => {                                                  // запускаем функцию для запуска автопереключения 
            intervalId = interval();                                        // запускаем автопереключение
        }, time / time);                                                    // чтобы следующий слайд переключился через то же время, передаем сюда 1
    });

    prevSlide.addEventListener('click', () => {                             // навешиваем обработчик события на кнопку назад
        countTwo--;                                                         // уменьшаем счетчик на 1
        if (countTwo + 1 == 0) {                                            // если счетчик дошел до первого слайда
            countTwo = slidesTwo.length -1 ;                                // задаем счетчику значение последнего слайда
        }
        slideHideTwo();                                                     // скрываем все слайды
        
        slideShowPrev(countTwo);                                            // переключаем слайд

        clearInterval(intervalId);                                          // останавливаем автопереключение

        setTimeout(() => {                                                  // запускаем функцию для запуска автопереключения 
            intervalId = interval();                                        // запускаем автопереключение
        }, time / time);                                                    // чтобы следующий слайд переключился через то же время, передаем сюда 1
    });
};

export default sliders;