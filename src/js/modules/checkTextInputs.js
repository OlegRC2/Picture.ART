const checkTextInputs = (selector) => {                                         // функция для валидации инпутов имени и комментария
    const txtInputs = document.querySelectorAll(selector);                      // берем все нужные инпуты

    txtInputs.forEach(input => {                                                // перебираем все инпуты
        input.addEventListener('keypress', function(e) {                        // навешиваем обработчик нажатия кнопки, передаем объект события в функцию
            if (e.key.match(/[^а-яё 0-9]/ig)) {                                 // e.key - кнопка, которую нажали. match - ищем соответсвие на регулярное выражение, весь русский алфавит (буква ё стоит в нем после я) и цифры. Флаг i - в любом регистре. ^ - значение этого символа в [] скобках - отрицание
                e.preventDefault();                                             // отменяем стандартное поведение браузера
            }
        });

        input.addEventListener('input', () => {                                 // навешиваем обработчик собития инпут
            if (input.value.match(/[a-z]/ig)) {                                 // если в инпуте каким-то образом появились латинские буквы, например автозаполнение, то 
               input.value = '';                                                // очищаем инпут
            }
        });
    });
};

export default checkTextInputs;