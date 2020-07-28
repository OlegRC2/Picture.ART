const filter = (tabBtn, tabHeader, tabContent, portfolio, active) => {                              // функция для блока с фильтром. tabBtn - кнопки фильтра (табы), tabHeader - блок в котором находятся кнопки, нужен для клика не только в саму кнопку, но и в область рядом, tabContent - контент, portfolio - элемент, выводимый при отсутствии контента, active - класс активности кнопки

    const btn = document.querySelectorAll(tabBtn),                                                  // получаем все кнопки табов
          header = document.querySelector(tabHeader),                                               // получаем блок, в котором находятся кнопки
          content = document.querySelectorAll(tabContent),                                          // получаем весь контент
          noPortfolio = document.querySelector(portfolio);                                          // получаем блок, выводимый при отсутствии контента


    function hide() {                                                                               // функция скрытия всего контента
        btn.forEach(item => {                                                                       // перебираем все табы
            item.classList.remove(active);                                                          // убираем класс активности со всех табов
        });

        content.forEach(item => {                                                                   // перебираем весь контент
            item.style.display = 'none';                                                            // скрываем каждый элемент
        });

        noPortfolio.style.display = 'none';                                                         // скрываем элемент, выводимый при отсутствии контента
    }

    header.addEventListener('click', (e) => {                                                       // навешиваем обработчик клика на элемент со всеми кнопками
        const target = e.target;                                                                    // элемент в который кликнули
            
        btn.forEach((item, i) => {                                                                  // перебираем все кнопки с получением ее индекса
            if (target == item) {                                                                   // если клик был в текущую перебираемую кнопку
                hide();                                                                             // скрываем весь контент и класс активности кнопки
                btn[i].classList.add(active);                                                       // добавляем класс активности текущей кнопке

                let contentArr = [];                                                                // создаем пустой массив для определения того, найден ли контент по текущему табу. В него будет добавляться весь найденный контент. Если массив пустой - значит контента нет и выводится соответствующий блок

                content.forEach(pic => {                                                            // перебираем контент

                    if (pic.classList[2] === target.classList[1]) {                                 // если класс перебираемого контента равен классу нажатой кнопки, то
                        contentArr.push(pic);                                                       // добавляем найденый контент в массив
                        pic.style.display = 'block';                                                // показываем этот контент
                    } else if (pic.classList[1] === target.classList[1]) {                          // иначе если выбран весь контент (этот класс содержит каждый элемент, поэтому индекс 1)
                        contentArr.push(pic);                                                       // добавляем найденый контент в массив
                        pic.style.display = 'block';                                                // показываем этот контент
                    }
                });

                if (contentArr.length == 0) {                                                       // если после перебора всего контента массив оказался пустой, то
                    noPortfolio.style.display = 'block';                                            // выводим блок об отсутствии портфолио
                }
            }
        }); 
    });
};

export default filter;