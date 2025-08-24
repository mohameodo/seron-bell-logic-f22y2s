const weatherModule = (() => {
    // IMPORTANT: Replace "YOUR_API_KEY" with your actual OpenWeatherMap API key.
    const API_KEY = 'YOUR_API_KEY'; 
    const CITY = 'Mesa';
    const STATE_CODE = 'AZ';
    const COUNTRY_CODE = 'US';
    const UNITS = 'imperial'; // for Fahrenheit

    const fetchWeather = async () => {
        if (API_KEY === 'YOUR_API_KEY') {
            console.error("OpenWeatherMap API key is missing. Please add it to js/modules/weather.js");
            window.uiModule.renderWeatherError();
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${STATE_CODE},${COUNTRY_CODE}&appid=${API_KEY}&units=${UNITS}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            window.uiModule.renderWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            window.uiModule.renderWeatherError();
        }
    };

    return {
        init: fetchWeather
    };
})();

window.weatherModule = weatherModule;