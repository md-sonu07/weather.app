const apikey = "e4b12d432e8283b35e0cc312c02c7465";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const search_Box = document.querySelector(".search input");
const search_Btn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".Weather-icon");
const weatherText = document.querySelector(".weathers-text");

const errorPage = document.querySelector(".error-page");
const mainPage = document.querySelector(".main-page");
const defaultPage = document.querySelector(".default-page");

async function getweather(city) {
  // Fetch current weather data
  const response = await fetch(currentWeatherUrl + city + `&appid=${apikey}`);
  const data = await response.json();
  console.log(data);
  
  if (data.cod == "404") {
    errorPage.classList.remove("hidden");
    mainPage.classList.add("hidden");
    // return; // Stop further execution if city not found
  } else {
    errorPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
  }

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";
  document.querySelector(".weathers-text").innerHTML = data.weather[0].main;

  // Date
  const date = new Date();
  const dateString = date.toLocaleDateString();
  document.querySelector(".date").innerHTML = `${dateString}`;

  // Weather icon and description
  updateWeatherIcon(data.weather[0].main);

  // Fetch forecast for the next days
  getForecast(city);
}

async function getForecast(city) {
  // Fetch 5-day weather forecast data
  const forecastResponse = await fetch(forecastWeatherUrl + city + `&appid=${apikey}`);
  const forecastData = await forecastResponse.json();
  
  // Next day temperature (24 hours later, approximately the 8th item in the list)
  const nextTemp2 = document.querySelector(".next-temp2");
  const nextTemp3 = document.querySelector(".next-temp3");
  const nextTemp4 = document.querySelector(".next-temp4");
  const nextTemp5 = document.querySelector(".next-temp5");

  
 // Next day weather icons
  const nextWeatherIcon2 = document.querySelector(".next-weather-icon2");
  const nextWeatherIcon3 = document.querySelector(".next-weather-icon3");
  const nextWeatherIcon4 = document.querySelector(".next-weather-icon4");
  const nextWeatherIcon5 = document.querySelector(".next-weather-icon5");

  
  if (nextTemp2) {
    nextTemp2.innerHTML = Math.round(forecastData.list[8].main.temp) + "°C"; // Day 2 temp
    updateWeatherIcon(forecastData.list[8].weather[0].main, nextWeatherIcon2); // Day 2 icon
  }
  if (nextTemp3) {
    nextTemp3.innerHTML = Math.round(forecastData.list[16].main.temp) + "°C"; // Day 3 temp
    updateWeatherIcon(forecastData.list[16].weather[0].main, nextWeatherIcon3); // Day 3 icon
  }
  if (nextTemp4) {
    nextTemp4.innerHTML = Math.round(forecastData.list[24].main.temp) + "°C"; // Day 4 temp
    updateWeatherIcon(forecastData.list[24].weather[0].main, nextWeatherIcon4); // Day 4 icon
  }
    if (nextTemp5) {
    nextTemp5.innerHTML = Math.round(forecastData.list[32].main.temp) + "°C"; // Day 5 temp
    updateWeatherIcon(forecastData.list[24].weather[0].main, nextWeatherIcon5); // Day 5 icon
  }

  
  // Update the next days' dates
  updateNextDates();
}

function updateWeatherIcon(mainWeather, WeatherIcon = weatherText) {
  if (mainWeather == "Clouds") {
    WeatherIcon.src = "assets/weather/clouds.svg";
    weatherText.innerHTML = "Cloudy";
  } else if (mainWeather == "Clear") {
    WeatherIcon.src = "assets/weather/clear.svg";
    weatherText.innerHTML = "Clear";
  } else if (mainWeather == "Rain") {
    WeatherIcon.src = "assets/weather/rain.svg";
    weatherText.innerHTML = "Rainy";
  } else if (mainWeather == "Snow") {
    WeatherIcon.src = "assets/weather/snow.svg";
    weatherText.innerHTML = "Snowy";
  } else if (mainWeather == "Thunderstorm") {
    WeatherIcon.src = "assets/weather/thunderstorm.svg";
    weatherText.innerHTML = "Stormy";
  } else if (mainWeather == "Drizzle") {
    WeatherIcon.src = "assets/weather/drizzle.svg";
    weatherText.innerHTML = "Drizzling";
  } else if (mainWeather == "Mist") {
    WeatherIcon.src = "assets/weather/mist.svg";
    weatherText.innerHTML = "Misty";
  } else if (mainWeather == "Haze") {
    WeatherIcon.src = "assets/weather/haze.png";
    weatherText.innerHTML = "Hazy";
  } else if (mainWeather == "Smoke") {
    WeatherIcon.src = "assets/weather/smoke.png";
    weatherText.innerHTML = "Smoky";
  } else if (mainWeather == "Dust") {
    WeatherIcon.src = "assets/weather/haze.png";
    weatherText.innerHTML = "Dusty";
  } else if (mainWeather == "Fog") {
    WeatherIcon.src = "assets/weather/fog.png";
    weatherText.innerHTML = "Foggy";
  } else if (mainWeather == "Sand") {
    WeatherIcon.src = "assets/weather/fog.png";
    weatherText.innerHTML = "Sandy";
  } else if (mainWeather == "Ash") {
    WeatherIcon.src = "assets/weather/fog.png";
    weatherText.innerHTML = "Ashy";
  } else if (mainWeather == "Squall") {
    WeatherIcon.src = "assets/weather/squall.png";
    weatherText.innerHTML = "Squally";
  } else if (mainWeather == "Tornado") {
    WeatherIcon.src = "assets/weather/tornado.png";
    weatherText.innerHTML = "Tornadic";
  }
}

function updateNextDates() {
  function formatDate(date, daysToAdd) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysToAdd);
    const month = newDate.toLocaleString("default", { month: "short" });
    const day = newDate.getDate();
    return `${month} ${day}`;
  }

  document.querySelector(".next-date").innerHTML = formatDate(new Date(), 1);
  document.querySelector(".next-date2").innerHTML = formatDate(new Date(), 2);
  document.querySelector(".next-date3").innerHTML = formatDate(new Date(), 3);
  document.querySelector(".next-date4").innerHTML = formatDate(new Date(), 4);

}

function togglePages(success) {
  if (search_Box.value.trim() === "") {
    defaultPage.classList.remove("hidden");
    mainPage.classList.add("hidden");
    errorPage.classList.add("hidden");
  } else if (success) {
    defaultPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
    errorPage.classList.add("hidden");
  } else {
    defaultPage.classList.add("hidden");
    mainPage.classList.add("hidden");
    errorPage.classList.remove("hidden");
  }
}


// Event listener for search button click
search_Btn.addEventListener("click", function () {
  if (search_Box.value.trim() === "") {
    togglePages(false);
  } else {
    getweather(search_Box.value)
      .then(() => {
        togglePages(true);
      })
      .catch(() => {
        togglePages(false);
      });
  }
});

// Event listener for Enter key press
search_Box.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (search_Box.value.trim() === "") {
      togglePages(false);
    } else {
      getweather(search_Box.value)
        .then(() => {
          togglePages(true);
        })
        .catch(() => {
          togglePages(false);
        });
    }
  }
});

// Add smooth scrolling to x axis

const container = document.querySelector(".slider");

container.addEventListener("wheel", (event) => {
  event.preventDefault();
  container.scrollLeft += event.deltaY;
});

