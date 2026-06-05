const topCities = [
  "Toronto",
  "Vancouver",
   "Winnipeg",
  "Quebec City",
  "Hamilton",
  "Halifax",
  "Victoria",
  "Edmonton",
  "Ottawa",
  "Kitchener"
];
const cName = document.getElementById("cName");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const weatherCode = document.getElementById("weatherCode");
const cInput = document.getElementById("cInput");
const vcBtn = document.getElementById("vcBtn");
const cList = document.getElementById("cList");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherBox = document.getElementById("weatherBox");


function showLoading() {
  loading.style.display = "block";
  error.style.display = "none";
  weatherBox.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
}

function showError(message) {
  error.innerText = message;
  error.style.display = "block";
  weatherBox.style.display = "none";
}

function showWeather(city, weather) {
  cName.innerText = city;
  temp.innerText = weather.temperature_2m + " °C";
  wind.innerText = weather.wind_speed_10m + " km/h";
  
  weatherBox.style.display = "block";
}

async function getWeather(city) {
  showLoading();

  try {
    const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1";
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results) {
      showError("City not found.");
      hideLoading();
      return;
    }

    const place = geoData.results[0];

    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      place.latitude +
      "&longitude=" +
      place.longitude +
      "&current=temperature_2m,wind_speed_10m,weather_code";

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    showWeather(place.name + ", " + place.country, weatherData.current);
  } catch (err) {
    showError("Something went wrong. Please try again.");
  }

  hideLoading();
}

vcBtn.addEventListener("click", function () {
  const city = cInput.value;

  if (city === "") {
    showError("Please enter a city.");
    return;
  }

  getWeather(city);
});

for (let i = 0; i < topCities.length; i++) {
  const li = document.createElement("li");
  li.innerText = topCities[i];

  li.addEventListener("click", function () {
    getWeather(topCities[i]);
  });

  cList.appendChild(li);
}