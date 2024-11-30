

const apiKey = "Replace with your OpenWeatherMap API key";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

document.querySelector("button").addEventListener("click", () => {
    const city = document.querySelector("input").value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

function fetchWeather(city) {
    const url = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => updateWeatherUI(data))
        .catch((error) => {
            alert(error.message);
        });
}

function updateWeatherUI(data) {
    
    document.querySelector(".City").textContent = data.name;

    
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;

   
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;

    document.querySelector(".Wind").textContent = `${data.wind.speed} km/h`;

   
    const weatherIcon = document.querySelector(".weather-icon");
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
}
