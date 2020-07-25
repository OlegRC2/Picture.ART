import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';




window.addEventListener('DOMContentLoaded', () => {                             // ждем пока загрузится вся DOM структура
    'use strict';

    modals();                                                                   // функция работы модальных окон
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');   // функция работы горизонтального слайдера
    sliders('.main-slider-item', 'vertical');                                   // функция работы вертикального слайдера
    forms();                                                                    // функция для работы с формами
    mask('[name="phone"]');                                                     // функция для работы маски инпута
    checkTextInputs('[name="name"]');                                           // функция для валидации инпута имени
    checkTextInputs('[name="message"]');                                        // функция для валидации инпута комментария
    















});