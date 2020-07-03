const sliders = (slideOne, time) => {                                       // slideOne - слайды первого слайдера, time - время через которое слайды будут сами меняться                                       

    const slides = document.querySelectorAll(slideOne);                     // передаем сюда слайды для первого слайдера

    let count = 0;                                                          // задаем переменную счетчика слайдов

    function slideHide() {                                                  // функция скрытия всех слайдов
        slides.forEach(item => {                                            // т.к. получаем псевдомассив, то используем forEach
            item.classList.add('hide');                                     // добавляем класс скрытия из bootstrap.css
            item.classList.remove('show');                                  // удаляем класс показа
        });
    }

    function slideShow(i = 0) {                                             // функция показа одного элемента. Задаем i=0 по дефолту, чтобы сначала был активен первый слайд
        slides[i].classList.add('show', 'animated', 'slideInDown');          // добавляем первому элементу класс показа с анимацией
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
        



};

export default sliders;