export async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            temperature: data.current_weather.temperature,
            windspeed: data.current_weather.windspeed
        };
    } catch (error) {
        console.error("Could not fetch weather data:", error);
        return null;
    }
}
