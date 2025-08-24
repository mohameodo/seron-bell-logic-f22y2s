const calendarModule = (() => {
    let currentDate = dayjs();

    const DOMElements = {
        monthYear: document.getElementById('month-year'),
        calendarGrid: document.getElementById('calendar-grid'),
        prevMonthBtn: document.getElementById('prev-month'),
        nextMonthBtn: document.getElementById('next-month'),
    };

    const renderCalendar = () => {
        if (!DOMElements.calendarGrid) return;

        DOMElements.monthYear.textContent = currentDate.format('MMMM YYYY');
        DOMElements.calendarGrid.innerHTML = '';

        const today = dayjs();
        const firstDayOfMonth = currentDate.startOf('month').day();
        const daysInMonth = currentDate.daysInMonth();

        // Day names header
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayNameEl = document.createElement('div');
            dayNameEl.className = 'calendar-day-name';
            dayNameEl.textContent = day;
            DOMElements.calendarGrid.appendChild(dayNameEl);
        });

        // Blank days for the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const blankDay = document.createElement('div');
            blankDay.className = 'calendar-day other-month';
            DOMElements.calendarGrid.appendChild(blankDay);
        }

        // Actual days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            
            const dayNumber = document.createElement('span');
            dayNumber.className = 'day-number';
            dayNumber.textContent = i;
            dayEl.appendChild(dayNumber);

            if (currentDate.date(i).isSame(today, 'day')) {
                dayEl.classList.add('today');
            }

            DOMElements.calendarGrid.appendChild(dayEl);
        }
    };

    const setupEventListeners = () => {
        if(DOMElements.prevMonthBtn) {
            DOMElements.prevMonthBtn.addEventListener('click', () => {
                currentDate = currentDate.subtract(1, 'month');
                renderCalendar();
            });
        }
        if(DOMElements.nextMonthBtn) {
            DOMElements.nextMonthBtn.addEventListener('click', () => {
                currentDate = currentDate.add(1, 'month');
                renderCalendar();
            });
        }
    };

    const init = () => {
        renderCalendar();
        setupEventListeners();
    };

    return { init };

})();

window.calendarModule = calendarModule;