import { updateText } from './ui.js';

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=33.42&longitude=-111.82&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph";

export async function fetchWeather() {
    const weatherContainer = document.getElementById('weather-container');
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        
        weatherContainer.innerHTML = `
            <p class="text-5xl font-bold">${temp}<span class="text-3xl">°F</span></p>
            <p class="text-slate-500 dark:text-slate-400">Feels like a great day!</p>
        `;

    } catch (error) {
        console.error("Failed to fetch weather:", error);
         weatherContainer.innerHTML = `
            <p class="text-2xl font-bold">N/A</p>
            <p class="text-slate-500 dark:text-slate-400">Could not load weather.</p>
        `;
    }
}