const sizes = (blockSelector, hit) => {                                                     // функция работы блока с наведением мыши на картины. blockSelector - блоки, где будет меняться изображение, hit - класс надписи "хит продаж"

    const blocks = document.querySelectorAll(blockSelector);                                // берем все блоки, с которыми будут проводится действия 

    const newImg = [                                                                        // создаем массив с путями к изображениям, которые будут меняться
        'assets/img/sizes-1-1.png',
        'assets/img/sizes-2-1.png',
        'assets/img/sizes-3-1.png',
        'assets/img/sizes-4-1.png'
    ];

    const oldImg = [                                                                        // создаем массив с путями к изображениям, которые стоят по умолчанию
        'assets/img/sizes-1.png',
        'assets/img/sizes-2.png',
        'assets/img/sizes-3.png',
        'assets/img/sizes-4.png'
    ];

    blocks.forEach(block => {                                                               // перебираем все блоки
        overBlock(block);                                                                   // выполняем функцию, описывающую действия при наведении на блок
    });

    blocks.forEach(block => {                                                               // перебираем все блоки
        outBlock(block);                                                                    // выполняем функцию, описывающую действия когда убрали курсор с блока
    });
    
    function overBlock(elem) {                                                              // функция с действиями при наведении на блок

        elem.addEventListener('mouseover', (e) => {                                         // навешиваем на блок обработчик наведения мыши на блок
            const blockContent = elem.getElementsByTagName('p'),                            // берем контент внутри блока по тегу p
                  image = elem.getElementsByTagName('img');                                 // берем изображение, которое будем заменять

            blockContent.forEach(content => {                                               // перебираем контент
                if (!content.classList.contains(hit.replace(/\./, ''))) {                   // если контент не содержит надпись "хит продаж", то (т.к. hit это класс и передается с точкой - вырезаем точку)
                    content.style.display = 'none';                                         // скрываем этот контент
                }
            });

            image.forEach(img => {                                                          // т.к. image псевдомассив перебираем его даже если там 1 значение
                const index = img.classList;                                                // получаем класс текущего блока, класс имеет цифровой идентификатор блока

                img.src = newImg[`${index[0][5] - 1}`];                                     // заменяем src текущего изображения на нужное. Путь к изображению в массиве newImg: из класса выше вытаскиваем номер блока и по этому номеру - 1 получаем путь к нужному новому изображению. [0] - classlist возвращает классы в массиве, класс один и находится под индексом 0, далее вытаскиваем из класса номер блока (он под индексом 5)               
            });
        });
    }
    
    function outBlock(elem) {                                                               // функция с действиями когда убрали курсор с блока

        elem.addEventListener('mouseout', (e) => {                                          // навешиваем на блок обработчик, срабатывающий когда убрали курсор с блока
            const blockContent = elem.getElementsByTagName('p'),                            // берем контент внутри блока по тегу p
                  image = elem.getElementsByTagName('img');                                 // берем изображение, которое будем заменять

            image.forEach(img => {                                                          // т.к. image псевдомассив перебираем его даже если там 1 значение
                const index = img.classList;                                                // получаем класс текущего блока, класс имеет цифровой идентификатор блока

                img.src = oldImg[`${index[0][5] - 1}`];                                     // заменяем src текущего изображения на нужное. Путь к изображению в массиве newImg: из класса выше вытаскиваем номер блока и по этому номеру - 1 получаем путь к нужному новому изображению. [0] - classlist возвращает классы в массиве, класс один и находится под индексом 0, далее вытаскиваем из класса номер блока (он под индексом 5)               
            });

            blockContent.forEach(content => {                                               // перебираем контент
                content.style.display = 'block';                                            // показываем этот контент
            });
        });
    }
};

export default sizes;