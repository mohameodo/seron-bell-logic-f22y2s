import { schedules } from '../data/schedules.js';

// --- DOM Update Utility ---
export function updateText(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}

// --- Theme Management ---
const themeToggle = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('theme-icon-light');
const darkIcon = document.getElementById('theme-icon-dark');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    }
}

export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// --- Mobile Menu ---
export function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// --- Schedule Rendering ---
function createPeriodHTML(period) {
    return `
        <div class="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <span class="font-semibold">${period.name}</span>
            <span class="text-sm text-slate-500 dark:text-slate-400 font-mono">${period.start} - ${period.end}</span>
        </div>
    `;
}

export function renderTodaySchedule(schedule) {
    const listElement = document.getElementById('today-schedule-list');
    if (!listElement) return;

    if (schedule.periods.length === 0) {
        listElement.innerHTML = `<p class="text-center text-slate-500 dark:text-slate-400">No classes scheduled for today.</p>`;
        return;
    }

    listElement.innerHTML = schedule.periods.map(createPeriodHTML).join('');
}

export function renderAllSchedules() {
    const scheduleAEl = document.getElementById('schedule-a');
    const scheduleBEl = document.getElementById('schedule-b');
    const scheduleWEl = document.getElementById('schedule-w');

    if (scheduleAEl) scheduleAEl.innerHTML = schedules.A.periods.map(createPeriodHTML).join('');
    if (scheduleBEl) scheduleBEl.innerHTML = schedules.B.periods.map(createPeriodHTML).join('');
    if (scheduleWEl) scheduleWEl.innerHTML = schedules.W.periods.map(createPeriodHTML).join('');
}