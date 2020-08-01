import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';




window.addEventListener('DOMContentLoaded', () => {                             // ждем пока загрузится вся DOM структура
    'use strict';

    modals();                                                                   // функция работы модальных окон
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');   // функция работы горизонтального слайдера
    sliders('.main-slider-item', 'vertical');                                   // функция работы вертикального слайдера
    forms();                                                                    // функция для работы с формами
    mask('[name="phone"]');                                                     // функция для работы маски инпута
    checkTextInputs('[name="name"]');                                           // функция для валидации инпута имени
    checkTextInputs('[name="message"]');                                        // функция для валидации инпута комментария
    showMoreStyles('.button-styles', '#styles .row');                           // функция подгрузки карточек (в блоке с id=syle есть блок с классом row)
    calc('#size', '#material', '#options', '.promocode', '.calc-price');        // функция для работы калькулятора
    filter();                                                                   // функция для работы фильтра
    pictureSize('.sizes-block');                                                // функция для работы блока с размерами картин
    accordion('.accordion-heading', '.accordion-block');                        // функция для работы аккордеона
    















});