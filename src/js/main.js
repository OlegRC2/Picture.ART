import modals from './modules/modals';
import sliders from './modules/sliders';




window.addEventListener('DOMContentLoaded', () => {                             // ждем пока загрузится вся DOM структура
    'use strict';

    modals();                                                                   // функция работы модальных окон
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');   // функция работы горизонтального слайдера
    sliders('.main-slider-item', 'vertical');                                   // функция работы вертикального слайдера
    















});