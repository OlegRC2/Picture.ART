const calc = (size, material, options, promocode, result) => {                                  // функция для калькулятора. size - select размера картины, material - select материала, options - select доп. услуг, promocode - инпут для промокод, result - окно для вывода итоговой цены
    const sizeBlock = document.querySelector(size),                                             // берем select размера картины                           
          materialBlock = document.querySelector(material),                                     // берем select материала
          optionsBlock = document.querySelector(options),                                       // берем select доп. услуг
          promocodeBlock = document.querySelector(promocode),                                   // берем инпут для промокода
          resultBlock = document.querySelector(result);                                         // берем окно для показа итоговой цены

    let sum = 0;                                                                                // переменная для рассчетной суммы

    const calcFunction = () => {                                                                // функция для рассчета суммы
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));  // формула для рассчета, + для того, чтобы преобразовать в число, т.к. value - это строка

        if (sizeBlock.value == '' || materialBlock.value == '') {                               // если первый селект равен дефолтному значению (пустая строка) или второй, то
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';         // выводим сообщение пользователю
        } else if (promocodeBlock.value === 'IWANTPOPART') {                                    // если пользователь ввел промокод
            resultBlock.textContent = Math.round(sum * 0.7);                                    // выводим цену со скидкой
        } else {                                                                                // если промокод не введен
            resultBlock.textContent = sum;                                                      // выводим сумму          
        }
    };

    sizeBlock.addEventListener('change', calcFunction());                                       // вешаем обработчик изменения на селект размера и запускаем в нем функцию расчета
    materialBlock.addEventListener('change', calcFunction());                                   // вешаем обработчик изменения на селект материала и запускаем в нем функцию расчета
    optionsBlock.addEventListener('change', calcFunction());                                    // вешаем обработчик изменения на селект доп. услуг и запускаем в нем функцию расчета
    promocodeBlock.addEventListener('input', calcFunction());                                   // вешаем обработчик инпута на инпут промокода и запускаем в нем функцию расчета
};

export default calc;