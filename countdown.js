const countdownModule = (() => {
    dayjs.extend(window.dayjs_plugin_customParseFormat);
    dayjs.extend(window.dayjs_plugin_duration);

    let countdownInterval = null;

    const getCurrentSchedule = () => {
        const now = dayjs();
        const dayOfWeek = now.day(); // 0=Sun, 1=Mon, ..., 6=Sat

        switch (dayOfWeek) {
            case 1: // Monday
            case 4: // Thursday
                return window.schedules.aDay;
            case 2: // Tuesday
            case 5: // Friday
                return window.schedules.bDay;
            case 3: // Wednesday
                return window.schedules.wednesday;
            default: // Saturday, Sunday
                return window.schedules.weekend;
        }
    };

    const findCurrentState = (schedule) => {
        const now = dayjs();
        let currentState = { type: 'ended', period: null, nextPeriod: schedule.periods[0] };

        if (!schedule || schedule.periods.length === 0) {
            return { type: 'weekend', period: null, nextPeriod: null };
        }

        for (let i = 0; i < schedule.periods.length; i++) {
            const period = schedule.periods[i];
            const start = dayjs(period.start, "h:mm A");
            const end = dayjs(period.end, "h:mm A");

            if (now.isBefore(start)) {
                currentState = { type: 'before_school', period: null, nextPeriod: schedule.periods[0] };
                break;
            }

            if (now.isAfter(start) && now.isBefore(end)) {
                currentState = { type: 'in_progress', period: period, nextPeriod: schedule.periods[i + 1] || null };
                break;
            }
        }
        
        if(currentState.type === 'ended'){
             const lastPeriodEnd = dayjs(schedule.periods[schedule.periods.length - 1].end, "h:mm A");
             if(now.isAfter(lastPeriodEnd)){
                 currentState = { type: 'after_school', period: null, nextPeriod: null };
             }
        }

        return currentState;
    };

    const update = () => {
        const schedule = getCurrentSchedule();
        const state = findCurrentState(schedule);
        const now = dayjs();

        let title = '', subtitle = '', targetTime = null, totalDuration = 0;

        switch (state.type) {
            case 'in_progress':
                targetTime = dayjs(state.period.end, "h:mm A");
                title = `${state.period.name} ends in:`;
                subtitle = `Next: ${state.nextPeriod ? state.nextPeriod.name : 'School Ends'}`;
                const periodStart = dayjs(state.period.start, "h:mm A");
                totalDuration = targetTime.diff(periodStart, 'second');
                break;
            case 'before_school':
                targetTime = dayjs(state.nextPeriod.start, "h:mm A");
                title = `School starts in:`;
                subtitle = `First period: ${state.nextPeriod.name}`;
                break;
            case 'after_school':
                title = 'School is over for the day!';
                subtitle = 'Enjoy your evening!';
                break;
            case 'weekend':
                title = 'It\'s the weekend!';
                subtitle = 'No classes today.';
                break;
            default: // ended
                 title = 'School is over for the day!';
                 subtitle = 'Enjoy your evening!';
        }

        window.uiModule.renderTodaySchedule(schedule, state.period ? state.period.name : null);

        if (targetTime) {
            const remaining = targetTime.diff(now, 'second');
            if (remaining < 0) {
                // If time is negative, force an update in a second
                setTimeout(update, 1000);
                return;
            }
            const duration = dayjs.duration(remaining, 'seconds');
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            window.uiModule.renderCountdown(title, subtitle, minutes, seconds);

            if (state.type === 'in_progress' && totalDuration > 0) {
                const elapsed = totalDuration - remaining;
                const percentage = (elapsed / totalDuration) * 100;
                window.uiModule.updateProgressBar(percentage);
            } else {
                 window.uiModule.updateProgressBar(0);
            }
        } else {
            window.uiModule.renderCountdown(title, subtitle, 0, 0);
            window.uiModule.updateProgressBar(100);
        }
    };

    const start = () => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        update(); // initial call
        countdownInterval = setInterval(update, 1000);
    };

    return {
        init: start
    };
})();

window.countdownModule = countdownModule;