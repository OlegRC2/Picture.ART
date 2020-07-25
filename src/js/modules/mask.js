const mask = (selector) => {                                        // функция маски номера телефона

    let setCursorPosition = (pos, elem) => {                        // функция для установки курсора в нужное место. pos - позиция, elem - элемент, на котором будут срабатывать
        elem.focus();                                               // установили фокус на элементе

        if (elem.setSelectionRange) {                               // если у элемента есть метод setSelectionRange. В старых браузерах его нет, это так сказать самописный полифилл
            elem.setSelectionRange(pos, pos);                       // метод setSelectionRange производит выделение текста. Если указать в начальной и конечной позиции одно и то же, то в это место просто встанет курсор
        } else if (elem.createTextRange) {                          // если элемент поддерживает метод createTextRange. По сути то же самое, что и setSelectionRange
            let range = elem.createTextRange();                     // создали диапазон

            range.collapse(true);                                   // collapse - соединяет 2 точки диапазона, начальную и конечную
            range.moveEnd('character', pos);                        // задали конечную точку
            range.moveStart('character', pos);                      // задали начальную точку
            range.select();                                         // установили курсор
        }
    };

    function createMask(event) {                                    // функция создания маски, внутрь передается событие из обработчика
        let matrix = '+7 (___) ___ __ __',                          // маска номера телефона
            i = 0,                                                  // итератор 
            def = matrix.replace(/\D/g, ''),                        // заменяем в маске все "не цифры" (/\D/g) пустой строкой
            val = this.value.replace(/\D/g, '');                    // заменяем в самом инпуте все "не цифры" (/\D/g) пустой строкой

        if (def.length >= val.length) {                             // если длина строки def больше или равна строке val, то (для того, если пользователь удаляет маску, она возвращалась)
            val = def;                                              // передаем в val исходное значение
        }

        this.value = matrix.replace(/./g, function(a) {             // передаем в инпут, в текущий символ, значение маски. В ней берем каждый символ (/./g) и выполняем функцию. В а будет подставляться каждый символ из /./g
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;  // /[_\d]/.test(a) - вернет true или false, символ а должен соответствовать _ и не букве. i < val.length ? val.charAt(i++) - если i меньше длины всего, что в инпуте, то возвращаем следующий символ. i >= val.length ? '' - если i больше длины всего, что в инпуте, то возвращаем пустую строку. : a - если условия не выполнились, то возвращаем а.
        });

        if (event.type === 'blur') {                                // если событие равоно blur - т.е. пользователь вышел из фокуса инпута (нажал вне инпута)
            if (this.value.length == 2) {                           // если в инпуте 2 символа, то
                this.value = '';                                    // очищаем инпут
            }
        } else {                                                    // если тип события другой (фокус, инпут)
            setCursorPosition(this.value.length, this);             // функция для установки курсора в нужное место
        }
    }

    let inputs = document.querySelectorAll(selector);               // берем нужные инпуты

    inputs.forEach(input => {                                       // перебираем все инпуты
        input.addEventListener('input', createMask);                // навешиваем обработчик инпута и выполняем в нем функцию маски
        input.addEventListener('focus', createMask);                // навешиваем обработчик фокуса и выполняем в нем функцию маски
        input.addEventListener('blur', createMask);                 // навешиваем обработчик блюра и выполняем в нем функцию маски
        input.addEventListener('click', createMask);                // навешиваем обработчик клика и выполняем в нем функцию маски (нужен чтобы при клике в начало инпута нельзя было заменить начало маски +7 (см. урок 15, ~20 минута))
    });
};

export default mask;                                                // экспортируем функцию