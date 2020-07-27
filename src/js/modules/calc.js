const calc = (size, material, options, promo, price, priceCode) => {                    // функция для калькулятора. size - select размера картины, material - select материала, options - select доп. услуг, promo - инпут для промокода, price - окно для вывода итоговой цены, priceCode - промокод

    const sizePic = document.getElementById(size),                                      // берем select размера картины
          matPic = document.getElementById(material),                                   // берем select материала
          optPic = document.getElementById(options),                                    // берем select доп. услуг
          promocode = document.querySelector(promo),                                    // берем инпут для промокода
          windowSumPrice = document.querySelector(price);                               // берем окно для показа итоговой цены

    let sizeValue = 0, matValue = 0, optValue = 0;                                      // переменные для значений value
    
    sizePic.addEventListener('change', function() {                                     // навешиваем обработчик, срабатывающий при изменении, на select размера картины
        sizeValue = this.value;                                                         // получаем выбранное значение
        showPrice();                                                                    // запускаем функцию расчета и показа цены
    });

    matPic.addEventListener('change', function() {                                      // навешиваем обработчик, срабатывающий при изменении, на select материала картины
        matValue = this.value;                                                          // получаем выбранное значение
        showPrice();                                                                    // запускаем функцию расчета и показа цены
    });

    optPic.addEventListener('change', function() {                                      // навешиваем обработчик, срабатывающий при изменении, на select доп. услуг
        optValue = this.value;                                                          // получаем выбранное значение
        showPrice();                                                                    // запускаем функцию расчета и показа цены
    });

    function showPrice() {                                                              // функция показа цены

        if (sizeValue != 0 && matValue != 0) {                                          // показываем цену только если выбраны первые два селекта. По дефолту они равны 0 
            let sum = +sizeValue * +matValue + +optValue;                               // расчет общей суммы

            if (!promocode.value && sizeValue !== 0 && matValue !== 0) {                // если в поле промокода ничего нет и выбраны первые 2 селекта
                windowSumPrice.textContent = `Цена составляет ${sum} рублей`;           // выводим цену на экран
            }

            promocode.addEventListener('input', function() {                            // навешиваем обработчик на инпут промокода
                
                if (promocode.value === priceCode && sizeValue !== 0 && matValue !== 0) {   // если введен нужный промокод и выбраны первые 2 селекта
                    sum = Math.floor(sum * 0.7);                                            // уменьшаем цену на 30% и округляем до минимального целого
                    windowSumPrice.textContent = `Цена составляет ${sum} рублей`;           // выводим цену на экран
                } else if (promocode.value !== priceCode && sizeValue !== 0 && matValue !== 0) {    // если введено что-либо отличное от промокода и выбраны первые 2 селекта
                    sum = +sizeValue * +matValue + +optValue;                               // расчет общей суммы
                    windowSumPrice.textContent = `Цена составляет ${sum} рублей`;           // выводим цену на экран
                }
            });                                                                 
        }
    }
};

export default calc;