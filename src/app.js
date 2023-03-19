function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}


function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector(".forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML +=

                `
      <div class="col-2">
        <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
                }@2x.png"
          alt=""
          width="42"
        />
        <div class="forecast-temperatures">
          <span class="forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                )}° </span>
          <span class="forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                )}° </span>
        </div>
      </div>
  `;
        }
    });

    forecastHTML += `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let cityElement = document.querySelector(".city");
    let temperatureElement = document.querySelector(".temperature");
    let descriptionElement = document.querySelector(".description");
    let humidityElement = document.querySelector(".humidify");
    let windElement = document.querySelector(".wind");
    let dateElement = document.querySelector(".date");
    let iconElement = document.querySelector(".icon");
    let realfeelElement = document.querySelector('.realfeel');
    let temperatureminElement = document.querySelector('.temperature-min');
    let temperaturemaxElement = document.querySelector('.temperature-max');

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    temperatureminElement.innerHTML = Math.round(response.data.main.temp_min);
    temperaturemaxElement.innerHTML = Math.round(response.data.main.temp_max);

    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    // console.log(response.data)
    realfeelElement.innerHTML = Math.round(response.data.main.feels_like);

    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function changecity(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#inputsearch");
    search(cityInputElement.value);
}


let form = document.querySelector("#form");
form.addEventListener('submit', changecity);

search('New York');
