
const weatherApiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

export const GetWeatherForecast = async (location) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey} &q=${location}&days=5&aqi=no&alerts=no&lang=sv`;

    return await fetch(url).then(response => response.json());
}

export const LoadAutoComplete = async (searchInput) => {
    if (searchInput.length >= 3) {
        const url = `http://api.weatherapi.com/v1/search.json?key=${weatherApiKey} &q=${searchInput}&lang=sv`;
        return await fetch(url).then(response => response.json());
    }
}