import { initTheme, initMobileMenu } from './modules/ui.js';
import { initCountdown } from './modules/countdown.js';
import { fetchWeather } from './modules/weather.js';
import { displayQuote } from './modules/quote.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components that are on every page
    initTheme();
    initMobileMenu();

    // Page-specific initializations
    if (document.getElementById('countdown-timer')) {
        initCountdown();
        fetchWeather();
        displayQuote();
    }
});
