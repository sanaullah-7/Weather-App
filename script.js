const ApiKey = "80d9b2aa5baac24446a3e44e58e4d1ad";
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const Invalid = document.querySelector(".Invalid");
const showWeather = document.querySelector(".container")
const City = document.getElementById("city")
const Country = document.getElementById("country")
const Temperature = document.getElementById("Temperature")
const Description = document.getElementById("description")
const Cloudy = document.getElementById("cloud")
const Humidity = document.getElementById("humidity")
const Wind = document.getElementById("wind")
const ImageIcon = document.getElementById("icon")
const Flag = document.getElementById("flag")


const weatherIcons = {
    Clear: "☀️",          // Clear sky
    Clouds: "☁️",         // Cloudy
    Rain: "🌧️",           // Rain
    Drizzle: "🌦️",        // Light rain
    Thunderstorm: "⛈️",   // Thunderstorm
    Snow: "❄️",           // Snow
    Mist: "🌫️",           // Light mist
    Smoke: "💨",          // Smoke in air
    Haze: "🌁",           // Hazy/foggy
    Dust: "🌪️",           // Dusty condition
    Fog: "🌫️",            // Fog
    Sand: "🏜️",           // Desert/sandy weather
    Ash: "🌋",            // Volcanic ash
    Squall: "🌬️",         // Sudden wind
    Tornado: "🌪️",        // Tornado
}

async function clickSeacrh() {
    const cityValue = document.getElementById("input").value;
    if (cityValue == "") {
        alert("Enter City Name");
        return;
    }

    try {
        const response = await fetch(URL + cityValue + `&appid=${ApiKey}`);
        const data = await response.json();

        console.log('data: ', data);
        City.innerHTML = data.name + ",",
            Country.innerHTML = data.sys.country;
        Temperature.innerHTML = data.main.temp + "°";
        Description.innerHTML = data.weather[0].description;
        Cloudy.innerHTML = data.clouds.all + "%";
        Humidity.innerHTML = data.main.humidity + "%";
        Wind.innerHTML = data.wind.speed + "m/s";
        ImageIcon.innerHTML = weatherIcons[data.weather[0].main];
        Flag.src = `https://flagsapi.com/${data.sys.country}/flat/64.png
`

        if (cityValue.toLowerCase() === data.name.toLowerCase()) {
            showWeather.style.display = "block";
            Invalid.style.display = "none"; // Hide error if previously shown
        } else {
            Invalid.style.display = "block";
            showWeather.style.display = "none"; // Hide weather info on error
        }
        showWeather.style.display = "block";
        Invalid.style.display = "none";

    } catch (error) {
        console.error("Error fetching data:", error);
        Invalid.style.display = "block";
        showWeather.style.display = "none";
    }
}
