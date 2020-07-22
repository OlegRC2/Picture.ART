// import checkNumInputs from './checkNumInputs';                                      // импортируем файл с функцией проверки инпутов на ввод цифр

const forms = () => {                                                               

    const form = document.querySelectorAll('form'),                                 // берем все формы
          inputs = document.querySelectorAll('input'),                              // берем все инпуты
          upload = document.querySelectorAll('[name="upload"]');                    // берем все инпуты для загрузки файлов

    // checkNumInputs('input[name="user_phone"]');                                     // разрешаем вводить в инпут только цифры

    const message = {                                                               // объект с сообщениями пользователю
        loading: 'Загрузка...',
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',                                          // путь к спиннеру
        ok: 'assets/img/ok.png',                                                    // путь к картинке ок
        fail: 'assets/img/fail.png'                                                 // путь к картинке fail
    };

    const path = {
        designer: 'assets/server.php',                                              // путь для отправки сообщения с картинкой пользователя
        question: 'assets/question.php'                                             // путь для отправки сообщения с вопросом
    }

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
        upload.forEach(item => {                                                    // берем каждый инпут для загрузки файлов
            item.previousElementSibling.textContent = 'Файл не выбран';             // задаем ему нужное значение
        });
    };

    upload.forEach(item => {                                                        // перебираем все инпуты для загрузки файлов
        item.addEventListener('input', () => {                                      // навешиваем на каждый инпут обработчик, который страбатывает при "вводе" чего-либо в инпут, в данном случае при загрузке файла
            console.log(item.files[0]);                                             // выводим первый файл, загруженный в инпут
            let dots;                                                               // переменная либо будет содержать ... либо нет
            const arr = item.files[0].name.split('.');                              // берем имя первого файла и split делим его на 2 части, разделитель деления . Образуется массив с 2 значениями
            arr[0].length > 6 ? dots = '...' : dots = '.';                          // берем первое значение массива и проверяем его длину. Если длина больше 5 символов, то dots равно ..., если меньше 6 символов, то dots = . точка нужна, т.к. в процессе появления массива от split . теряется  
            const name =  arr[0].substring(0, 6) + dots + arr[1];                   // берем первую часть от разделения split и вырезаем первые 5 символов, далее добавляем dots - это либо ... либо . и добавляем вторую часть от split - это расширение файла
            item.previousElementSibling.textContent = name;                         // берем предыдущий соседний элемент и заменяем его контент нужным значением
        });
    });

    form.forEach(item => {                                                          // перебираем все формы
        item.addEventListener('submit', (e) => {                                    // навешиваем на каждую форму обработчик срабатывающий при подтверждении формы
            e.preventDefault();                                                     // отменяем стандартное поведение браузера (перезагрузку страницы)

            let statusMessage = document.createElement('div');                      // создаем элемент, который потом будет выводится пользователю с сообщением с картинкой
            statusMessage.classList.add('status');                                  // задаем класс стилизации новому элементу
            item.parentNode.appendChild(statusMessage);                             // добавили новый элемент в родителя формы, т.к. сама форма будет скрываться

            item.classList.add('animated', 'fadeOutUp');                            // скрываем форму при помощи анимации
            setTimeout(() => {
                item.style.display = 'none';                                        // полностью скрываем форму из модального окна
            }, 400);                                                                // значение 400мс подобрано на глаз

            let statusImg = document.createElement('img');                          // создаем элемент img, в нем будет изображение отображающее статус отправки
            statusImg.setAttribute('src', message.spinner);                         // добавляем путь к картинке в элемент img
            statusImg.classList.add('animated', 'fadeInUp');                        // элемент будет появляться с анимацией
            statusMessage.appendChild(statusImg);                                   // помещаем элемент с картинкой в созданный div

            let textMessage = document.createElement('div');                        // создаем элемент, который потом будет выводится пользователю с текстовым сообщением
            textMessage.textContent = message.loading;                              // добавили в новый элемент текстовое сообщение
            statusMessage.appendChild(textMessage);                                 // помещаем элемент с текстом в ранее созданный div

            const formData = new FormData(item);                                    // создаем переменную по классу FormData. Этот класс собирает данные, которые отправить надо. У инпутов в формах должен быть обязательно быть атрибут "name", без него работать не будет
            let api;                                                                // переменная для динамического пути отправки
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;     // если текущая форма содержит в любом из родителей-прародителей класс popup-design, то closest вернет этот элемент, т.е. true. Если такой класс не будет найдет, то вернет false или форма содержит класс calc_form. ? означает действие при true, : действие при false. По сути таким образом записано уcловие if 

            postData(api, formData)                                                 // отправялем запрос по адресу api      
                .then(res => {                                                      // при успешной отправке
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);                      // подставляем адрес изображения ок вместо спиннера
                    textMessage.textContent = message.success;                      // меняем сообщение о загрузке на сообщение об успешной отправке
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);                    // подставляем адрес изображения fail вместо спиннера
                    textMessage.textContent = message.failure;                      // при ошибке выводим сообщение об ошибке
                })           
                .finally(() => {                                                    // выполняется в любом случае
                    clearInputs();                                                  // очищаем поля формы
                    setTimeout(() => {
                        statusMessage.remove();                                     // удаляем сообщение
                        item.style.display = 'block';                               // возвращаем форму в окно
                        item.classList.remove('fadeOutUp');                         // удаляем класс анимации, который используется для скрытия
                        item.classList.add('fadeInUp');                             // добавляем класс анимации для появления формы
                    }, 5000);                                                       // через 5 сек
                }); 
        });     
    });

};

export default forms;