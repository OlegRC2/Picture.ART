const forms = () => {                                                               // функция для работы с формами

    const form = document.querySelectorAll('form'),                                 // берем все формы
          inputs = document.querySelectorAll('input'),                              // берем все инпуты
          textarea = document.querySelectorAll('textarea'),                         // берем все области для ввода текста
          content = document.querySelectorAll('.popup-content');

    const message = {                                                               // объект с сообщениями пользователю
        loadingSpinner: 'assets/img/spinner/Spinner-1s-150px.svg',                  // спиннер
        checkMark:  'assets/img/modalMessage/check-mark.svg',                       // иконка успешной отправки
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
    };


    const postData = async (url, data) => {                                         // функция отправки на сервер
        let res = await fetch(url, {                                                // отправялем запрос на сервер
            method: 'POST',                                                         // метод запроса
            body: data                                                              // отправляемые данные
        });              
        
        return await res.text();                                                    // ждем пока данные преобразуются в текст .text(). Так же говорим, что дальше скрипт не выполнялся, пока не выполнится res (await)
    };

    const clearInputs = () => {                                                     // функция очистки полей форм

        inputs.forEach(item => {                                                    // берем каждый инпут
            item.value = '';                                                        // задаем ему пустую строку
        });
        textarea.forEach(item => {                                                  // берем каждую область для ввода текста
            item.value = '';                                                        // задаем ей пустую строку
        });
    };

    function clearModal() {                                                         // функция удаления контента из модального окна

        content.forEach(item => {                                                   // т.к. получили контент с 2 форм, то перебираем каждую               
            for (let i = item.children.length - 1; i > 0; i--) {                    // i - количество элементов в блоке (-1 чтобы взять индекс), пока i не равно первому элементу
                item.children[i].style.display = 'none';                            // скрываем все элементы
            }
        });
    }

    function showModal() {                                                          // функция показа контента в модальном окне после того как оно было скрыто

        content.forEach(item => {                                                   // т.к. получили контент с 2 форм, то перебираем каждую               
            for (let i = item.children.length - 1; i > 0; i--) {                    // i - количество элементов в блоке (-1 чтобы взять индекс), пока i не равно первому элементу
                item.children[i].style.display = 'block';                           // показываем все элементы
            }
        });
    }

    function loadingModal() {                                                       // функция показа сообщения отправки
 
        content.forEach(item => {                                                   // т.к. получили контент с 2 форм, то перебираем каждую
            const statusMessageSpnr = document.createElement('img'),                // создаем новый элемент на странице для показа его пользователю в котором будет спиннер
                  statusMessageText = document.createElement('div');                // создаем новый элемент на странице для показа его пользователю в котором будет div с текстом
                  statusMessageSpnr.src = message.loadingSpinner;                   // добавляем новому элементу атрибут src
            statusMessageSpnr.style.cssText = `
                display: block;
                margin: 0 auto;
            `;                                                                      // добавили стили картинке, чтобы встала по центру
            statusMessageText.textContent = message.loading;                        // добавили в новый div сообщение с текстом

            statusMessageSpnr.classList.add('spinner-new');                         // добавляем класс спиннеру, чтобы потом его удалить
            statusMessageText.classList.add('modal-text-new');                      // добавляем класс элементу с текстом, чтобы потом его удалить

            item.append(statusMessageSpnr);                                         // добавляем спиннер в модальное окно
            item.append(statusMessageText);                                         // добавляем текст в модальное окно
        });
    }

    function deleteLoading() {                                                      // функция удаления сообщения о загрузке

        const spinner = document.querySelectorAll('.spinner-new'),                  // берем все спиннеры, их много, т.к. создавались под каждую форму
              messageLoading = document.querySelectorAll('.modal-text-new');        // берем все текстовые сообщения, их много, т.к. создавались под каждую форму

        spinner.forEach(item => {                                                   // перебираем все спиннеры
            item.remove();                                                          // удаляем спиннеры
        });

        messageLoading.forEach(item => {                                            // перебираем все текстовые сообщения
            item.remove();                                                          // удаляем текстовые сообщения
        });
    }

    function success() {                                                            // функция показа сообщения об успешной отправке

        content.forEach(item => {                                                   // т.к. получили контент с 2 форм, то перебираем каждую
            const successMessageCheck = document.createElement('img'),              // создаем новый элемент на странице для показа его пользователю в котором будет иконка
                  successMessageText = document.createElement('div');               // создаем новый элемент на странице для показа его пользователю в котором будет div с текстом
            successMessageCheck.src = message.checkMark;                            // добавляем новому элементу атрибут src
            successMessageCheck.style.cssText = `
                display: block;
                margin: 0 auto;
            `;                                                                      // добавили стили картинке, чтобы встала по центру
            successMessageText.textContent = message.success;                       // добавили в новый div сообщение с текстом

            item.append(successMessageCheck);                                       // добавляем иконку в модальное окно
            item.append(successMessageText);                                        // добавляем текст в модальное окно

            setTimeout(() => {
                successMessageCheck.remove();                                       // удаляем сообщение
                successMessageText.remove();                                        // удаляем сообщение
            }, 3000);                                                               // через 3 сек
        });

        setTimeout(() => {                                                          
            showModal();                                                            // возвращаем контент модального окна
        }, 3001);                                                                   // через 3,001 сек   
    }

    function fail() {                                                               // функция показа сообщения при ошибке отправки

        content.forEach(item => {                                                   // т.к. получили контент с 2 форм, то перебираем каждую
            const failMessageText = document.createElement('div');                  // создаем новый элемент на странице для показа его пользователю в котором будет div с текстом

            failMessageText.textContent = message.failure;                          // добавили в новый div сообщение с текстом
            item.append(failMessageText);                                           // добавляем текст в модальное окно

            setTimeout(() => {
                failMessageText.remove();                                           // удаляем сообщение
            }, 3000);                                                               // через 3 сек
        });

        setTimeout(() => {                                                          
            showModal();                                                            // возвращаем контент модального окна
        }, 3001);  
    }

    form.forEach(item => {                                                          // перебираем все формы
        item.addEventListener('submit', (e) => {                                    // навешиваем на каждую форму обработчик срабатывающий при подтверждении формы
            e.preventDefault();                                                     // отменяем стандартное поведение браузера (перезагрузку страницы)

            clearModal();                                                           // очищаем модальное окно
            loadingModal();                                                         // показываем сообщение об отправке

            const formData = new FormData(item);                                    // создаем переменную по классу FormData. Этот класс собирает данные, которые отправить надо. У инпутов в формах должен быть обязательно быть атрибут "name", без него работать не будет

            postData('assets/server.php', formData)                                 // отправляем запрос      
                .then(res => {
                    console.log(res);                                               // выводим в консоль инфу с формы
                    deleteLoading();                                                // очищаем модальное окно
                    success();
                })
                .catch(err => {
                    console.log(err);
                    deleteLoading();                                                // очищаем модальное окно
                    fail();                                                         // выводим сообщение об ошибке 
                })                                                                  // при ошибке выводим сообщение об ошибке
                .finally(() => {                                                    // выполняется в любом случае
                    clearInputs();                                                  // очищаем поля формы
                }); 
        });     
    });
};

export default forms;