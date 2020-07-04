import modals from './modules/modals';
import sliders from './modules/sliders';




window.addEventListener('DOMContentLoaded', () => {                             // ждем пока загрузится вся DOM структура
    'use strict';

    let clickButton = false;                                                    // флаг нажатия хотя бы 1 кнопки. Изначально ни одна кнопка не нажата, соответственно false

    modals();                                                                   // функция работы модальных окон
    sliders('.main-slider-item', 5000, '.feedback-slider-item', '.main-next-btn', '.main-prev-btn');    // функция для работы слайдеров

    















});