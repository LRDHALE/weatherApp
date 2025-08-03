const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherBody = document.querySelector(".weather-body");
const locationNotFound = document.querySelector(".location-not-found");

const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherImg = document.querySelector(".weather-img");

const API_KEY = 'f0a4d9b122617da13f3f53d289e27bcf'; 

searchBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // prevent form submission

    const city = inputBox.value.trim();

    if (city === "") return;

    // Fetch API
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Show weather data
        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";

        temperature.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} Km/H`;

        const weatherCondition = data.weather[0].main.toLowerCase();

        switch (weatherCondition) {
            case "clouds":
                weatherImg.src = "/assets/cloud.png";
                weatherImg.alt = "Cloudy weather";
                break;
            case "clear":
                weatherImg.src = "/assets/clear.png";
                weatherImg.alt = "Clear sky";
                break;
            case "rain":
                weatherImg.src = "/assets/rain.png";
                weatherImg.alt = "Rainy weather";
                break;
            case "mist":
                weatherImg.src = "/assets/mist.png";
                weatherImg.alt = "Misty weather";
                break;
            case "snow":
                weatherImg.src = "/assets/snow.png";
                weatherImg.alt = "Snowy weather";
                break;
            default:
                weatherImg.src = "/assets/cloud.png";
                weatherImg.alt = "Weather image";
        }

    } catch (error) {
        weatherBody.style.display = "none";
        locationNotFound.style.display = "block";
    }
});
