import { SCHEDULES, QUOTES, API_URL, ALERTS } from './config.js';
import { updateCountdownDisplay, updateTodaySchedule, updateAlert, updateQuote, updateWeatherDisplay } from './ui.js';
import { fetchWeather } from './weather.js';

// --- THEME MANAGEMENT ---
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
});

// --- COUNTDOWN LOGIC ---

function getCurrentSchedule() {
    const now = dayjs();
    const dayOfWeek = now.day(); // Sunday = 0, Monday = 1, etc.

    switch (dayOfWeek) {
        case 1: // Monday
        case 4: // Thursday
            return { name: 'A Day', periods: SCHEDULES.A_DAY };
        case 2: // Tuesday
        case 5: // Friday
            return { name: 'B Day', periods: SCHEDULES.B_DAY };
        case 3: // Wednesday
            return { name: 'Wednesday', periods: SCHEDULES.WEDNESDAY };
        default: // Saturday, Sunday
            return { name: 'Weekend', periods: [] };
    }
}

function getCountdownState() {
    const now = dayjs();
    const { name, periods } = getCurrentSchedule();

    if (periods.length === 0) {
        return { title: 'Enjoy the Weekend!', period: 'No classes today', timeLeft: '00:00:00', progress: 100, scheduleName: name };
    }

    for (const period of periods) {
        const startTime = dayjs(period.start, 'HH:mm');
        const endTime = dayjs(period.end, 'HH:mm');

        // Check if we are currently in this period
        if (now.isAfter(startTime) && now.isBefore(endTime)) {
            const totalDuration = endTime.diff(startTime, 'second');
            const elapsed = now.diff(startTime, 'second');
            const remaining = endTime.diff(now, 'second');
            const progress = (elapsed / totalDuration) * 100;

            return {
                title: `Time left in ${period.name}`,
                period: `Ends at ${period.end}`,
                timeLeft: formatTime(remaining),
                progress: progress,
                scheduleName: name,
                currentPeriod: period.name
            };
        }

        // Check if this is the next period
        if (now.isBefore(startTime)) {
            const remaining = startTime.diff(now, 'second');
            return {
                title: `Next up: ${period.name}`,
                period: `Starts at ${period.start}`,
                timeLeft: formatTime(remaining),
                progress: 0,
                scheduleName: name,
                currentPeriod: null
            };
        }
    }

    // If loop finishes, it's after the last class
    return { title: 'School is Over!', period: 'See you tomorrow!', timeLeft: '00:00:00', progress: 100, scheduleName: name };
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function startCountdown() {
    setInterval(() => {
        const state = getCountdownState();
        updateCountdownDisplay(state);
    }, 1000);
}

// --- INITIALIZATION ---
function initializeDashboard() {
    // Initial setup
    const schedule = getCurrentSchedule();
    updateTodaySchedule(schedule.name, schedule.periods, getCountdownState().currentPeriod);
    updateAlert(ALERTS.SCHEDULED_MAINTENANCE); // Example alert
    updateQuote(QUOTES);
    fetchWeather(API_URL).then(weatherData => {
        updateWeatherDisplay(weatherData);
    });

    // Start live updates
    startCountdown();
}

// Run the app
initializeDashboard();