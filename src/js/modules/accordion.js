const accordion = (triggersSelector, itemsSelector) => {                                            // функция работы аккордеона
    const btns = document.querySelectorAll(triggersSelector);                                       // получаем кнопки
          // blocks = document.querySelectorAll(itemsSelector);                                        // получаем текстовые блоки

    // ПЕРВЫЙ ВАРИАНТ АККОРДЕОНА (работает совместно с css стилями)

    // blocks.forEach(block => {                                                                       // перебираем все текстовые блоки
    //     block.classList.add('animated', 'fadeInDown');                                              // добавялем классы анимации блокам
    // });

    // btns.forEach(btn => {                                                                           // перебираем все кнопки
    //     btn.addEventListener('click', function() {                                                  // навешиваем обработчик клика на каждую кнопку и используем обычную функцию для работы контекста вызова this 
    //         if (!this.classList.contains('active')) {                                               // если текущий элемент btn не содержит класс active, то 
    //             btns.forEach(btn => {                                                               // перебираем все кнопки
    //                btn.classList.remove('active', 'active-style');                                  // удаляем класс активности с кнопки и класс стиля
    //             });
    //             this.classList.add('active', 'active-style');                                       // добавляем текущей кнопке класс активности и класс стиля                            
    //         }
    //     });
    // });

    btns.forEach(btn => {                                                                           // перебираем все кнопки
        btn.addEventListener('click', function() {                                                  // навешиваем обработчик клика на каждую кнопку и используем обычную функцию для работы контекста вызова this 
            this.classList.toggle('active-style');                                                  // если у элемента нет класса, то toggle его добавит, если есть, то удалит
            this.nextElementSibling.classList.toggle('active-content');                             // обращаемся к следующему после кнопки элементу и тоглим класс активности

            if (this.classList.contains('active-style')) {                                          // если кнопка содержит класс активности, то
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'; // следующему элементу после кнопки назначаем максимальную высоту равной его высоте + 80 (паддинги) и преобразуем все в строку (px)
            } else {                                                                                // если у кнопки нет класса активности, то
                this.nextElementSibling.style.maxHeight = '0px';                                    // скрываем элемент, задавая нулевую высоту
            } 
        });
    });








};

export default accordion;