import { initTheme, initMobileMenu } from './modules/ui.js';
import { Calendar } from './modules/calendar.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    
    const calendar = new Calendar('#calendar-grid', '#month-year');
    calendar.render();

    document.getElementById('prev-month').addEventListener('click', () => calendar.prevMonth());
    document.getElementById('next-month').addEventListener('click', () => calendar.nextMonth());
});