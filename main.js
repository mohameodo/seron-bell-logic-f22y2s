document.addEventListener('DOMContentLoaded', () => {
    dayjs.extend(window.dayjs_plugin_customParseFormat);
    dayjs.extend(window.dayjs_plugin_relativeTime);

    // DOM Elements
    const countdownTitleEl = document.getElementById('countdown-title');
    const countdownPeriodEl = document.getElementById('countdown-period');
    const countdownTimerEl = document.getElementById('countdown-timer');
    const currentTimeEl = document.getElementById('current-time');
    const schedulePreviewEl = document.getElementById('schedule-preview');
    const lockdownAlertEl = document.getElementById('lockdown-alert');
    const allClearAlertEl = document.getElementById('all-clear-alert');

    // --- CONFIGURATION ---
    // Set to true to display alerts
    const SHOW_LOCKDOWN_ALERT = false;
    const SHOW_ALL_CLEAR_ALERT = true;

    function updateAlerts() {
        if (lockdownAlertEl) lockdownAlertEl.classList.toggle('hidden', !SHOW_LOCKDOWN_ALERT);
        if (allClearAlertEl) allClearAlertEl.classList.toggle('hidden', !SHOW_ALL_CLEAR_ALERT || SHOW_LOCKDOWN_ALERT);
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    function updateCountdown() {
        const now = dayjs();
        if (currentTimeEl) {
            currentTimeEl.textContent = `Current Time: ${now.format('h:mm:ss A')}`;
        }

        const todaySchedule = schedules.regular; // For simplicity, using regular schedule
        let currentPeriod = null;
        let nextPeriod = null;

        for (const period of todaySchedule) {
            const startTime = dayjs(period.start, 'HH:mm');
            const endTime = dayjs(period.end, 'HH:mm');

            if (now.isAfter(startTime) && now.isBefore(endTime)) {
                currentPeriod = { ...period, start: startTime, end: endTime };
                break;
            }
            if (now.isBefore(startTime) && !nextPeriod) {
                nextPeriod = { ...period, start: startTime, end: endTime };
            }
        }

        if (currentPeriod) {
            const secondsRemaining = currentPeriod.end.diff(now, 'second');
            countdownTitleEl.textContent = `Time Remaining In`;
            countdownPeriodEl.textContent = currentPeriod.name;
            countdownTimerEl.textContent = formatTime(secondsRemaining);
        } else if (nextPeriod) {
            const secondsUntil = nextPeriod.start.diff(now, 'second');
            countdownTitleEl.textContent = `Time Until`;
            countdownPeriodEl.textContent = nextPeriod.name;
            countdownTimerEl.textContent = formatTime(secondsUntil);
        } else {
            countdownTitleEl.textContent = 'School is Over';
            countdownPeriodEl.textContent = 'Have a great day!';
            countdownTimerEl.textContent = 'See You!';
        }
    }

    function renderSchedulePreview() {
        if (!schedulePreviewEl) return;
        schedulePreviewEl.innerHTML = '';
        const now = dayjs();
        let upcomingCount = 0;

        schedules.regular.forEach(period => {
            const startTime = dayjs(period.start, 'HH:mm');
            const endTime = dayjs(period.end, 'HH:mm');
            let statusClass = 'bg-gray-100 dark:bg-gray-700';
            let statusText = 'Upcoming';

            if (now.isAfter(endTime)) {
                statusClass = 'bg-gray-100 dark:bg-gray-700 opacity-50';
                statusText = 'Finished';
            } else if (now.isAfter(startTime) && now.isBefore(endTime)) {
                statusClass = 'bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-500';
                statusText = 'In Progress';
            } else if (upcomingCount < 3) {
                statusClass = 'bg-green-100 dark:bg-green-900/50';
                upcomingCount++;
            }

            const periodEl = document.createElement('div');
            periodEl.className = `p-4 rounded-lg flex items-center justify-between ${statusClass}`;
            periodEl.innerHTML = `
                <div>
                    <p class="font-bold text-gray-800 dark:text-white">${period.name}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${startTime.format('h:mm A')} - ${endTime.format('h:mm A')}</p>
                </div>
                <div class="text-sm font-semibold text-right">${statusText}</div>
            `;
            schedulePreviewEl.appendChild(periodEl);
        });
    }

    // Initial setup
    if (countdownTimerEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    updateAlerts();
    renderSchedulePreview();
});