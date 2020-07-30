const pictureSize = (imgSelector) => {                                                  // функция работы блока с наведением мыши на картины. imgSelector - сами блоки
    const blocks = document.querySelectorAll(imgSelector);                              // берем все блоки 

    function showImg (block) {                                                          // функция показа картинки при наведении
        const img = block.querySelector('img');                                         // берем картинку внутри блока по тегу
        // something.png => something-1.png
        img.src = img.src.slice(0, -4) + '-1.png';                                      // методом slice вырезаем кусок строки, берем начало (0) и отрезаем 4 символа с конца (-4). Затем добавляем постфикс и задаем его в src
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {                      // берем все параграфы и перебираем их. :not(.sizes-hit) - возмет все, кроме класса в скобках
            p.style.display = 'none';                                                   // скрываем эти элементы
        });
    }

    function hideImg (block) {                                                          // функция скрытия картинки при наведении
        const img = block.querySelector('img');                                         // берем картинку внутри блока по тегу
        // something-1.png => something.png
        img.src = img.src.slice(0, -6) + '.png';                                        // методом slice вырезаем кусок строки, берем начало (0) и отрезаем 6 символов с конца (-6).
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {                      // берем все параграфы и перебираем их. :not(.sizes-hit) - возмет все, кроме класса в скобках
            p.style.display = 'block';                                                  // показываем эти элементы
        });
    }

    blocks.forEach(block => {                                                           // перебираем все блоки
        block.addEventListener('mouseover', () => {                                     // навешиваем обработчик наведения мыши на каждый блок
            showImg(block);                                                             // вызываем функцию показа картинки
        });

        block.addEventListener('mouseout', () => {                                      // навешиваем обработчик отведения мыши с блока
            hideImg(block);                                                             // вызываем функцию скрытия картинки
        });
    });
};

export default pictureSize;