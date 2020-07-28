const filter = () => {                                                                              // функция для работы блока с фильтрами
    const menu = document.querySelector('.portfolio-menu'),                                         // все необходимые переменные
          items = menu.querySelectorAll('li'),
          btnAll = menu.querySelector('.all'),
          btnLovers = menu.querySelector('.lovers'),
          btnChef = menu.querySelector('.chef'),
          btnGirl = menu.querySelector('.girl'),
          btnGuy = menu.querySelector('.guy'),
          btnGrandmother = menu.querySelector('.grandmother'),
          btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          markGirl = wrapper.querySelectorAll('.girl'),
          markLovers = wrapper.querySelectorAll('.lovers'),
          markChef = wrapper.querySelectorAll('.chef'),
          markGuy = wrapper.querySelectorAll('.guy'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {                                                              // функция скрытия и показа всех элементов
        markAll.forEach(mark => {                                                                   // перебираем все элементы контента
            mark.style.display = 'none';                                                            // скрываем каждый элемент
            mark.classList.remove('animated', 'fadeIn');                                            // удаляем классы анимации
        });

        no.style.display = 'none';                                                                  // скрываем блок, выводимый при отсутствии контента
        no.classList.remove('animated', 'fadeIn');                                                  // удаляем классы анимации

        if(markType) {                                                                              // если в функцию передано то, что хотим отобразить, то
            markType.forEach(mark => {                                                              // перебираем эти элементы
                mark.style.display = 'block';                                                       // показываем элемент
                mark.classList.add('animated', 'fadeIn');                                           // добавляем классы анимации
            });
        } else {                                                                                    // если в функцию ничего не передано, то
            no.style.display = 'block';                                                             // показываем элемент отсутствия контента
            no.classList.add('animated', 'fadeIn');                                                 // добавляем классы анимации
        }
    };

    btnAll.addEventListener('click', () => {                                                        // навешиваем на кнопку всего контента обработчик клика
        typeFilter(markAll);                                                                        // запускаем функцию с аргументом всего контента
    });

    btnLovers.addEventListener('click', () => {                                                     // навешиваем на кнопку обработчик клика
        typeFilter(markLovers);                                                                     // запускаем функцию с нужным аргументом
    });

    btnChef.addEventListener('click', () => {                                                       // навешиваем на кнопку обработчик клика
        typeFilter(markChef);                                                                       // запускаем функцию с нужным аргументом
    });

    btnGuy.addEventListener('click', () => {                                                        // навешиваем на кнопку обработчик клика
        typeFilter(markGuy);                                                                        // запускаем функцию с нужным аргументом
    });

    btnGirl.addEventListener('click', () => {                                                       // навешиваем на кнопку обработчик клика
        typeFilter(markGirl);                                                                       // запускаем функцию с нужным аргументом
    });

    btnGrandmother.addEventListener('click', () => {                                                // навешиваем на кнопку обработчик клика
        typeFilter();                                                                               // запускаем функцию без аргументов, т.к. для нее нет контента
    });

    btnGranddad.addEventListener('click', () => {                                                   // навешиваем на кнопку обработчик клика
        typeFilter();                                                                               // запускаем функцию без аргументов, т.к. для нее нет контента
    });

    menu.addEventListener('click', (e) => {                                                         // навешиваем на блок с кнопками обработчик клика
        let target = e.target;                                                                      // сокращаем запись цели события
        
        if (target && target.tagName == 'LI') {                                                     // если событие существует и блок в который кликнули li (обязательно в верхнем регистре)
            items.forEach(btn => btn.classList.remove('active'));                                   // перебираем все кнопки и убираем у каждой класс активности
            target.classList.add('active');                                                         // добавляем класс активности текущей кнопке
        }
    });
};

export default filter;