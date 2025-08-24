// --- DOM Element Selectors ---
const countdownTitle = document.getElementById('countdown-title');
const countdownPeriod = document.getElementById('countdown-period');
const countdownTimer = document.getElementById('countdown-timer');
const progressBar = document.getElementById('progress-bar');
const todayScheduleContainer = document.getElementById('today-schedule-container');
const todayScheduleName = document.getElementById('today-schedule-name');
const alertBanner = document.getElementById('alert-banner');
const alertMessage = document.getElementById('alert-message');
const quoteWidget = document.getElementById('quote-widget');
const weatherWidget = document.getElementById('weather-widget');

// --- UI Update Functions ---

export function updateCountdownDisplay(state) {
    if (countdownTitle) countdownTitle.textContent = state.title;
    if (countdownPeriod) countdownPeriod.textContent = state.period;
    if (countdownTimer) countdownTimer.textContent = state.timeLeft;
    if (progressBar) progressBar.style.width = `${state.progress}%`;
    if (todayScheduleName) todayScheduleName.textContent = state.scheduleName;

    // Update active period highlight
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        if (item.dataset.periodName === state.currentPeriod) {
            item.classList.add('bg-primary-light', 'text-white', 'dark:bg-primary-dark');
            item.classList.remove('bg-gray-100', 'dark:bg-dark-card');
        } else {
            item.classList.remove('bg-primary-light', 'text-white', 'dark:bg-primary-dark');
            item.classList.add('bg-gray-100', 'dark:bg-dark-card');
        }
    });
}

export function updateTodaySchedule(name, periods, currentPeriodName) {
    if (!todayScheduleContainer) return;
    todayScheduleContainer.innerHTML = ''; // Clear previous content

    if (periods.length === 0) {
        todayScheduleContainer.innerHTML = `<p class="text-center text-gray-500">No classes scheduled for today. Enjoy your day!</p>`;
        return;
    }

    periods.forEach(period => {
        const isActive = period.name === currentPeriodName;
        const item = document.createElement('div');
        item.dataset.periodName = period.name;
        item.className = `schedule-item flex justify-between items-center p-4 rounded-lg transition-colors duration-300 ${isActive ? 'bg-primary-light text-white dark:bg-primary-dark' : 'bg-gray-100 dark:bg-dark-card'}`;
        item.innerHTML = `
            <span class="font-bold">${period.name}</span>
            <span class="text-sm font-mono">${period.start} - ${period.end}</span>
        `;
        todayScheduleContainer.appendChild(item);
    });
}

export function updateAlert(alert) {
    if (!alertBanner) return;
    if (alert && alert.active) {
        alertMessage.textContent = alert.message;
        // Reset classes
        alertBanner.className = 'p-4 mb-8 rounded-md shadow-lg';
        alert.class.split(' ').forEach(c => alertBanner.classList.add(c));
        alertBanner.classList.remove('hidden');
    } else {
        alertBanner.classList.add('hidden');
    }
}

export function updateQuote(quotes) {
    if (!quoteWidget) return;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteWidget.innerHTML = `
        <p class="italic text-gray-600 dark:text-gray-300">"${randomQuote.text}"</p>
        <cite class="block text-right mt-2 text-sm text-gray-500 dark:text-gray-400">- ${randomQuote.author}</cite>
    `;
}

export function updateWeatherDisplay(data) {
    if (!weatherWidget) return;
    if (data && data.temperature) {
        weatherWidget.innerHTML = `
            <p class="text-4xl font-bold">${Math.round(data.temperature)}°F</p>
            <p class="text-gray-500 dark:text-gray-400">Wind: ${Math.round(data.windspeed)} mph</p>
        `;
    } else {
        weatherWidget.innerHTML = `<p class="text-gray-500">Weather data unavailable.</p>`;
    }
}

export function populateScheduleList(elementId, periods) {
    const listElement = document.getElementById(elementId);
    if (!listElement) return;
    listElement.innerHTML = '';
    periods.forEach(period => {
        const listItem = document.createElement('li');
        listItem.className = 'flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg';
        listItem.innerHTML = `
            <span class="font-semibold">${period.name}</span>
            <span class="font-mono text-sm text-gray-600 dark:text-gray-300">${period.start} - ${period.end}</span>
        `;
        listElement.appendChild(listItem);
    });
}
