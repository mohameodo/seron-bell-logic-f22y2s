const uiModule = (() => {
    const DOMElements = {
        countdownTitle: document.getElementById('countdown-title'),
        countdownSubtitle: document.getElementById('countdown-subtitle'),
        minutesSpan: document.getElementById('minutes'),
        secondsSpan: document.getElementById('seconds'),
        progressBar: document.getElementById('progress-bar'),
        todayScheduleContainer: document.getElementById('today-schedule-container'),
        alertContainer: document.getElementById('alert-container'),
        weatherContainer: document.getElementById('weather-container'),
        quoteContainer: document.getElementById('quote-container'),
    };

    const renderCountdown = (title, subtitle, minutes, seconds) => {
        if (DOMElements.countdownTitle) DOMElements.countdownTitle.textContent = title;
        if (DOMElements.countdownSubtitle) DOMElements.countdownSubtitle.textContent = subtitle;
        if (DOMElements.minutesSpan) DOMElements.minutesSpan.textContent = String(minutes).padStart(2, '0');
        if (DOMElements.secondsSpan) DOMElements.secondsSpan.textContent = String(seconds).padStart(2, '0');
    };

    const updateProgressBar = (percentage) => {
        if (DOMElements.progressBar) {
            DOMElements.progressBar.style.width = `${percentage}%`;
        }
    };

    const renderTodaySchedule = (schedule, currentPeriodName) => {
        if (!DOMElements.todayScheduleContainer) return;
        if (!schedule || schedule.periods.length === 0) {
            DOMElements.todayScheduleContainer.innerHTML = `<p class="text-gray-500 dark:text-gray-400">${schedule.name} - No classes today!</p>`;
            return;
        }

        const scheduleHtml = schedule.periods.map(period => {
            const isCurrent = period.name === currentPeriodName;
            const isPassing = period.name.toLowerCase().includes('passing');
            if(isPassing) return ''; // Don't show passing periods in the summary

            return `
                <div class="flex justify-between items-center p-3 rounded-lg ${isCurrent ? 'bg-primary/10 dark:bg-accent/20' : ''}">
                    <div class="flex items-center">
                        ${isCurrent ? '<i class="fas fa-clock fa-spin mr-3 text-primary dark:text-accent"></i>' : '<i class="far fa-clock mr-3 text-gray-400"></i>'}
                        <span class="font-semibold ${isCurrent ? 'text-primary dark:text-accent' : ''}">${period.name}</span>
                    </div>
                    <span class="text-sm text-gray-600 dark:text-gray-300">${period.start} - ${period.end}</span>
                </div>
            `;
        }).join('');

        DOMElements.todayScheduleContainer.innerHTML = scheduleHtml;
    };

    const renderFullSchedule = (schedule, container) => {
        if (!container) return;
        const scheduleHtml = schedule.periods.map(period => {
             const isPassing = period.name.toLowerCase().includes('passing');
             if(isPassing) return ''; // Don't show passing periods in full view
            return `
                 <div class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span class="font-semibold">${period.name}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-300">${period.start} - ${period.end}</span>
                </div>
            `;
        }).join('');
        container.innerHTML = scheduleHtml;
    }

    const renderAlert = (type, message) => {
        if (!DOMElements.alertContainer) return;
        let bgColor, icon;
        switch (type) {
            case 'lockdown':
                bgColor = 'bg-red-600';
                icon = 'fa-lock';
                break;
            case 'maintenance':
                bgColor = 'bg-yellow-500';
                icon = 'fa-exclamation-triangle';
                break;
            default:
                bgColor = 'bg-blue-500';
                icon = 'fa-info-circle';
        }
        DOMElements.alertContainer.innerHTML = `
            <div class="${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center">
                <i class="fas ${icon} text-2xl mr-4"></i>
                <p class="font-semibold">${message}</p>
            </div>
        `;
    };

    const renderWeather = (data) => {
        if (!DOMElements.weatherContainer) return;
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        DOMElements.weatherContainer.innerHTML = `
            <div class="flex items-center justify-between w-full">
                <div>
                    <h3 class="text-lg font-bold">${data.name}, AZ</h3>
                    <p class="text-4xl font-bold">${Math.round(data.main.temp)}°F</p>
                    <p class="capitalize text-gray-500 dark:text-gray-400">${data.weather[0].description}</p>
                </div>
                <img src="${iconUrl}" alt="Weather icon" class="w-20 h-20">
            </div>
        `;
    };

     const renderWeatherError = () => {
        if (!DOMElements.weatherContainer) return;
        DOMElements.weatherContainer.innerHTML = `
            <div class="text-center w-full">
                 <i class="fas fa-exclamation-circle text-red-500 text-2xl"></i>
                 <p class="mt-2 text-sm">Could not load weather data.</p>
                 <p class="text-xs text-gray-500">Check API key.</p>
            </div>
        `;
    };

    const renderQuote = (quote) => {
        if (!DOMElements.quoteContainer) return;
        DOMElements.quoteContainer.innerHTML = `
            <p class="italic">"${quote.text}"</p>
            <p class="text-right mt-2 font-semibold">- ${quote.author}</p>
        `;
    };

    return {
        renderCountdown,
        updateProgressBar,
        renderTodaySchedule,
        renderFullSchedule,
        renderAlert,
        renderWeather,
        renderWeatherError,
        renderQuote
    };
})();

window.uiModule = uiModule;