import { initTheme, initMobileMenu, renderAllSchedules } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    renderAllSchedules();
});