import { schedules } from '../data/schedules.js';
import { updateText, renderTodaySchedule } from './ui.js';

let countdownInterval;

function getScheduleForToday() {
    const dayOfWeek = dayjs().day(); // Sunday = 0, Saturday = 6
    switch (dayOfWeek) {
        case 1: // Monday
        case 4: // Thursday
            return schedules.A;
        case 2: // Tuesday
        case 5: // Friday
            return schedules.B;
        case 3: // Wednesday
            return schedules.W;
        default: // Saturday, Sunday
            return schedules.NONE;
    }
}

function formatTime(seconds) {
    if (seconds < 0) seconds = 0;
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateCountdown() {
    const now = dayjs();
    const todaySchedule = getScheduleForToday();

    if (todaySchedule.periods.length === 0) {
        updateText('#countdown-status', 'No Classes Today!');
        updateText('#countdown-period', 'Enjoy your day off!');
        updateText('#countdown-timer', '00:00:00');
        return;
    }

    const firstPeriodStart = dayjs(todaySchedule.periods[0].start, 'H:mm');
    if (now.isBefore(firstPeriodStart)) {
        const diff = firstPeriodStart.diff(now, 'second');
        updateText('#countdown-status', 'School Starts In');
        updateText('#countdown-period', `First period is ${todaySchedule.periods[0].name}`);
        updateText('#countdown-timer', formatTime(diff));
        return;
    }

    for (let i = 0; i < todaySchedule.periods.length; i++) {
        const period = todaySchedule.periods[i];
        const start = dayjs(period.start, 'H:mm');
        const end = dayjs(period.end, 'H:mm');

        if (now.isAfter(start) && now.isBefore(end)) {
            const diff = end.diff(now, 'second');
            updateText('#countdown-status', `${period.name} Ends In`);
            const nextPeriod = todaySchedule.periods[i + 1];
            updateText('#countdown-period', nextPeriod ? `Next: ${nextPeriod.name}` : 'School is over after this');
            updateText('#countdown-timer', formatTime(diff));
            return;
        }

        const nextPeriod = todaySchedule.periods[i + 1];
        if (nextPeriod) {
            const nextStart = dayjs(nextPeriod.start, 'H:mm');
            if (now.isAfter(end) && now.isBefore(nextStart)) {
                const diff = nextStart.diff(now, 'second');
                updateText('#countdown-status', 'Passing Period Ends In');
                updateText('#countdown-period', `Next: ${nextPeriod.name}`);
                updateText('#countdown-timer', formatTime(diff));
                return;
            }
        }
    }

    const lastPeriodEnd = dayjs(todaySchedule.periods[todaySchedule.periods.length - 1].end, 'H:mm');
    if (now.isAfter(lastPeriodEnd)) {
        updateText('#countdown-status', 'School Is Over!');
        updateText('#countdown-period', 'See you tomorrow!');
        updateText('#countdown-timer', '00:00:00');
        return;
    }
}

export function initCountdown() {
    const todaySchedule = getScheduleForToday();
    document.getElementById('today-schedule-type').textContent = todaySchedule.name;
    renderTodaySchedule(todaySchedule);
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}