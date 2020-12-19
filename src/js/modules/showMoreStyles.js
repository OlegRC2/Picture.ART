import {getResourse} from '../services/requests';                                           // импортируем функцию отправки запроса на получение данных с сервера

const showMoreStyles = (trigger, wrapper) => {                                               // функция показа скрытых карточек, trigger - кнопка, styles - карточки (для первого варианта вместо wrapper), wrapper - обертка куда будут помещаться карточки
    const btn = document.querySelector(trigger);                                            // получаем кнопку

    // ПРОСТОЙ ВАРИАНТ, ЕСЛИ БЛОКИ ПРОСТО СКРЫТЫ В HTML ДОКУМЕНТЕ (блоки закомментированы в html)

    // const cards = document.querySelectorAll(styles);                                        // получаем карточки

    // cards.forEach(card => {                                                                 // перебираем все карточки
    //     card.classList.add('animated', 'fadeInUp');                                         // добавляем классы анимации карточкам
    // });

    // btn.addEventListener('click', () => {                                                   // навешиваем обработчик клика на кнопку 
    //     cards.forEach(card => {                                                             // перебираем все карточки
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');      // удаляем классы скрытия
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');  // добавляем классы показа карточкам
    //     });
    //     btn.style.display = 'none';                                                         // скрываем кнопку
    // });

    btn.addEventListener('click', function() {                                                  // навешиваем обработчик клика на кнопку, внутри используем именно function, чтобы срабатывал контекст вызова кнопки 
        getResourse('assets/db.json')                                             // получаем данные с нужного адреса (нужно включить json-server) можно сразу прописать конечный адрес базы данных, который будет использоваться в готовом проекте. Gulp переместит файл базы данных в assets/db.json - это и можно прописать в адресе, но далее в следующей строке потребуется изменить createCards(res.styles). Урок 17, 23 минута
        .then(res => createCards(res.styles))                                                          // при положительном ответе сервера выполняем функцию создания карточек
        .catch(error => console.log(error));                                                    // при ошибке выводим ошибку в консоль

        this.remove();                                                                          // удаляем кнопку, в обработчике прописана не стрелочная функция, т.к. контекст в стрелочной не сработает
    });

    function createCards(response) {                                                            // функция создания карточек. response - данные, полученные с сервера
        response.forEach(item => {                                                              // перебираем ответ с сервера, т.к. это массив
            let card = document.createElement('div');                                           // создаем элемент для карточки

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');  // добавляем классы карточкам (классы взяты у уже существующих карточек из html документа). Так же добавляем классы анимации для появления

            card.innerHTML = `
                <div class="styles-block">
         		    <img src=${item.src} alt="style">
         		    <h4>${item.title}</h4>
         		    <a href=${item.link}>Подробнее</a>
         	    </div>
            `;                                                                                  // создаем структуру карточки, взята из html документа

            document.querySelector(wrapper).appendChild(card);                                  // добавляем карточку на страницу
        });
    }
};

export default showMoreStyles;