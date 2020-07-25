const moreCards = (btnSelector, cardSelector) => {                              // функция для подгрузки карточек

    const btn = document.getElementById(btnSelector),                           // берем кнопку, при нажатии которой будут появляться элементы
          cards = document.querySelectorAll(cardSelector);                      // берем карточки, которые в данный момент скрыты

    btn.addEventListener('click', () => {                                       // навешиваем обработчик клика на кнопку

        cards.forEach(item => {                                                 // перебираем все карточки
            item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');  // убираем классы скрытия
            item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');  // добавляем классы отображения
        });

        btn.style.display = 'none';                                             // скрываем кнопку
    });
}

export default moreCards;