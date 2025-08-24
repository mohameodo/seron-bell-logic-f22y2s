export class Calendar {
    constructor(gridSelector, monthYearSelector) {
        this.grid = document.querySelector(gridSelector);
        this.monthYearEl = document.querySelector(monthYearSelector);
        this.currentDate = dayjs();
    }

    render() {
        this.grid.innerHTML = '';
        this.monthYearEl.textContent = this.currentDate.format('MMMM YYYY');

        const month = this.currentDate.month();
        const year = this.currentDate.year();

        const firstDayOfMonth = dayjs(new Date(year, month, 1));
        const daysInMonth = dayjs(new Date(year, month + 1, 0)).date();
        const startingDay = firstDayOfMonth.day(); // 0 for Sunday

        // Day names header
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(name => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day-name';
            dayEl.textContent = name;
            this.grid.appendChild(dayEl);
        });

        // Blank days at the start
        for (let i = 0; i < startingDay; i++) {
            const blankEl = document.createElement('div');
            this.grid.appendChild(blankEl);
        }

        // Actual days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = i;
            dayEl.className = 'calendar-date';
            
            const today = dayjs();
            if (i === today.date() && month === today.month() && year === today.year()) {
                dayEl.classList.add('current-day');
            }
            this.grid.appendChild(dayEl);
        }
    }

    prevMonth() {
        this.currentDate = this.currentDate.subtract(1, 'month');
        this.render();
    }

    nextMonth() {
        this.currentDate = this.currentDate.add(1, 'month');
        this.render();
    }
}