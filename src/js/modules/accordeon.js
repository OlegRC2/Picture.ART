const accordeon = (head, textBlock) => {                                                    // функция для работы аккордеона. head - заголовки по которым кликают, textBlock - появляющийся текст

    const header = document.querySelectorAll(head),                                         // берем заголовки вкладок
          text = document.querySelectorAll(textBlock);                                      // текстовые блоки

    text.forEach(item => {                                                                  // перебираем все тексовые блоки 
        item.classList.add('animated');                                                     // добавляем класс анимации, чтобы потом его постоянно не добавлять
        item.style.display = 'none';                                                        // скрываем все текстовые блоки, т.к. по дефолту они показаны
    });  
      
    function closeText() {                                                                  // функция скрытия всех текстовых блоков
        text.forEach(p => {                                                                 // перебираем все текстовые блоки
            if (p.classList.contains('fadeInDown')) {                                       // если у блока уже есть класс анимации открытия, т.е. текстовый блок показан
                p.classList.remove('fadeInDown');                                           // удаляем класс анимации открытия с блока
                p.classList.add('fadeOutUp');                                               // добавляем класс анимации закрытия

                setTimeout(() => {                                                          // скрываем блок через 400 мс, время на глаз взято
                    p.style.display = 'none';
                    p.classList.remove('fadeOutUp');                                        // при скрытии блока так же удаляем класс анимации закрытия
                }, 400);                                                           
            }
        });
    }

    header.forEach((item, i) => {                                                           // перебираем все заголовки, получаем сам заголовок и его индекс
        item.addEventListener('click', () => {                                              // навешиваем обработчик клика на каждый заголовок                                   

            header.forEach(head => {                                                        // перебираем все заголовки
                head.querySelector('span').style.cssText = `                                
                    border-bottom: 2px dotted #333;
                    color: #333;
                `;                                                                          // меняем стиль заголовка на "закрытый"
            });

            closeText();                                                                    // запускаем функцию закрытия всех текстовых блоков

            if (item.classList.contains('accActive')) {                                     // если заголовок содержит класс активности
                header.forEach(head => {                                                    // перебираем все заголовки
                    head.querySelector('span').style.cssText = `                                      
                        border-bottom: 2px dotted #333;
                        color: #333;
                    `;                                                                      // меняем стиль заголовка на "закрытый"

                    head.classList.remove('accActive');                                     // удаляем класс активности
                });
    
                closeText();                                                                // запускаем функцию закрытия всех текстовых блоков
            } else {                                                                        // если заголовок не содержит класса активности
                item.querySelector('span').style.cssText = `                                    
                    border-bottom: none;
                    color: #c51abb;
                `;                                                                          // добавляем заголовку стиль активности

                text[i].classList.add('fadeInDown');                                        // берем текстовый блок соответствующий индексу заголовка и добавляем ему класс анимации открытия
                setTimeout(() => {                                                          // через 400 мс, время на глаз взято
                    text[i].style.display = 'block';                                        // показываем этот текстовый блок
                }, 400);

                header.forEach(head => {                                                    // перебираем все заголовки
                    head.classList.remove('accActive');                                     // удаляем класс активности
                });

                item.classList.add('accActive');                                            // добавляем текущему заголовку класс активности
            } 
        });
    });
};

export default accordeon;