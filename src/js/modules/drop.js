const drop = () => {                                                                                    // функция для возможности перетаскивания файлов в инпут
    // события drag and drop
    // dragenter - объект над dropArea
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает/двигается над dropArea
    // drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll('[name="upload"]');                                    // берем все нужные инпуты по имени

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {                               // создали массив событий и перебираем его
        fileInputs.forEach(input => {                                                                   // перебираем все инпуты
            inputs.addEventListener(eventName, preventDefaults, false);                                 // навешиваем на каждый инпут все события, выполняем функцию preventDefaults, false - это настройки событий
        });
    });

    function preventDefaults(e) {                                                                       // функция отмены стандартных действий браузера
        e.preventDefault();                                                                             // отменяем стандартное поведение браузера
        e.stopPropagation();                                                                            // отмена всплытия
    }

    function highlight(item) {                                                                          // функция для подсвечивания элемента при перетаскивании
        item.closest('.file_upload').style.border = '5px solid yellow';                                 // находим ближайший элемент с нужным классом и ставим у него рамку
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0 .7)';                          // находим ближайший элемент с нужным классом и меняем его фон

    }

    function unhighlight(item) {                                                                        // функция для обратная предыдущей, убираем стили
        item.closest('.file_upload').style.border = 'none';                                             // находим ближайший элемент с нужным классом и убираем рамку
        if (item.closest('.calc_form')) {                                                               // если в ближайших элементах есть элемент с классом calc_form, то
            item.closest('.file_upload').style.backgroundColor = '#fff';                                // находим ближайший элемент с нужным классом и меняем его фон (фоны на странице и в модальном окне разные)
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';                             // находим ближайший элемент с нужным классом и меняем его фон
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {                                                    // создали массив событий и перебираем его. На события, которые происходят над dropArea навешиваем обработчики и выделяем эту зону
        fileInputs.forEach(input => {                                                                   // перебираем все инпуты
            inputs.addEventListener(eventName, () => highlight(input), false);                          // навешиваем на каждый инпут все события, выполняем функцию highlight, false - это настройки событий
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {                                                        // создали массив событий и перебираем его. На события, когда отпускаем файл или уводим мышку навешиваем обработчик и убираем выделение этой области
        fileInputs.forEach(input => {                                                                   // перебираем все инпуты
            inputs.addEventListener(eventName, () => unhighlight(input), false);                        // навешиваем на каждый инпут все события, выполняем функцию unhighlight, false - это настройки событий
        });
    });

    fileInputs.forEach(input => {                                                                       // перебираем инпуты
        input.addEventListener('drop', (e) => {                                                         // навешиваем обработчик события, когда файл упал в инпут
            input.files = e.dataTransfer.files;                                                         // берем файл, который перетаскиваем и добавляем его в инпут

            let dots;                                                                                   // переменная либо будет содержать ... либо нет
            const arr = input.files[0].name.split('.');                                                 // берем имя первого файла и split делим его на 2 части, разделитель деления . Образуется массив с 2 значениями
            arr[0].length > 6 ? dots = '...' : dots = '.';                                              // берем первое значение массива и проверяем его длину. Если длина больше 5 символов, то dots равно ..., если меньше 6 символов, то dots = . точка нужна, т.к. в процессе появления массива от split . теряется  
            const name =  arr[0].substring(0, 6) + dots + arr[1];                                       // берем первую часть от разделения split и вырезаем первые 5 символов, далее добавляем dots - это либо ... либо . и добавляем вторую часть от split - это расширение файла
            input.previousElementSibling.textContent = name;                                            // берем предыдущий соседний элемент и заменяем его контент нужным значением
        });
    });
};

export default drop;