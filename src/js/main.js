import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import moreCards from './modules/moreCards';
import calc from './modules/calc';
import filter from './modules/filter';
import sizes from './modules/sizesBlock';
import accordeon from './modules/accordeon';
import menuBurger from './modules/menuBurger';




window.addEventListener('DOMContentLoaded', () => {                             // ждем пока загрузится вся DOM структура
    'use strict';

    let clickButton = false;                                                    // флаг нажатия хотя бы 1 кнопки. Изначально ни одна кнопка не нажата, соответственно false

    modals();                                                                   // функция работы модальных окон
    sliders('.main-slider-item', 5000, '.feedback-slider-item', '.main-next-btn', '.main-prev-btn');    // функция для работы слайдеров
    forms();                                                                    // функция для работы с формами
    moreCards('more-style', '.styles-2');                                       // функция для показа блока с карточками
    calc('size', 'material', 'options', '.promocode', '.calc-price', 'IWANTPOPART');    // функция для калькулятора
    filter('.tab-btn', '.portfolio-menu', '.portfolio-block', '.portfolio-no', 'active');    // функция для работы блока с фильтром
    sizes('.sizes-block', '.sizes-hit');                                        // функция для работы блока с размером картин
    accordeon('.accordion-heading', '.accordion-block');                        // функция для работы аккордеона
    menuBurger('.burger', '.burger-menu');                                      // функция для работы бургер-меню

    

    















});