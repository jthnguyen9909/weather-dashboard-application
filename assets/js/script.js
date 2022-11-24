var searchButton = document.querySelector(".search-button");
var citySelected = document.querySelector("#city-selected");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHum = document.querySelector("#current-hum");
var currentWeather = document.querySelector("#current-weather");
var searchHistory = [];
var searchHistoryContainer = document.querySelector(".search-history");
var forecastContainer = document.querySelector(".forecast-container");

// dayjs server api to display date as well as upcoming 5 days on page
var today = dayjs();
var day1 = today.add(1, "days").format("MM/DD/YYYY");
var day2 = today.add(2, "days").format("MM/DD/YYYY");
var day3 = today.add(3, "days").format("MM/DD/YYYY");
var day4 = today.add(4, "days").format("MM/DD/YYYY");
var day5 = today.add(5, "days").format("MM/DD/YYYY");

// Searches for coordinates and weather forecast for input value on form
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var cityName = document.querySelector(".search-input").value;
  getCoords(cityName);
  appendToHistory(cityName);
});

// renders local storage search history values
function renderSearchHistory() {
  // creates a new button for each search history item in local storage on page load
  for (i = 0; i < searchHistory.length; i++) {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    // adds classes to buttons that are dynamically created by javascript for styling
    btn.classList.add("btn", "btn-primary", "border", "mt-2", "mx-2");
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);

    // adds a click event to fetch forecast data for local storage generated button
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      var cityClick = event.target.textContent;
      getCoords(cityClick);
    });
  }
}
// adds a button for each search and saves to local storage; renders onto page
function appendToHistory(cityName) {
  searchHistory.push(cityName);
  var btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.classList.add("btn", "btn-primary", "border", "mt-2", "mx-2");
  btn.textContent = cityName;
  searchHistoryContainer.append(btn);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));

  // click event for dynamically rendered buttons
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    var cityClick = event.target.textContent;
    getCoords(cityClick);
  });
}

// function for fetch request on coordinates of search form
function getCoords(cityName) {
  var coordinates =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&appid=d94b396ad8a40ab56c235a99912e7f2e";

  // returns latitude and longitude
  fetch(coordinates)
    .then(function (response) {
      return response.json();
    })
    .then(function (coordinates) {
      var lat = coordinates[0].lat;
      var lon = coordinates[0].lon;

      // fetch request for generated lat and lon of requested city name for current weather data
      function getCurrentWeather() {
        var currentWeatherURL =
          "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=d94b396ad8a40ab56c235a99912e7f2e";

        fetch(currentWeatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // dynamically renders data for current weather onto page
            citySelected.textContent = data.name;
            currentWeather.textContent = data.weather[0].main;
            currentTemp.textContent = data.main.temp + "°F";
            currentWind.textContent = data.wind.speed + "mph";
            currentHum.textContent = data.main.humidity + "%";
          });
      }

      // fetch request for the generated lat and lon for get data of 5 day forecast data
      function getFutureWeather() {
        var futureWeatherURL =
          "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=d94b396ad8a40ab56c235a99912e7f2e";

        fetch(futureWeatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // 6, 14, 22, 30, 38 are the numbered arrays for upcoming 5 days forecast at 12pm each day
            // dynamically renders weather data properties from data object of fetch request
            document.querySelector("#day-1").textContent = day1;
            forecastContainer.children[0].children[1].textContent =
              "Weather :" + data.list[6].weather[0].main;
            forecastContainer.children[0].children[2].textContent =
              "Temp: " + data.list[6].main.temp + "°F";
            forecastContainer.children[0].children[3].textContent =
              "Wind: " + data.list[6].wind.speed + "mph";
            forecastContainer.children[0].children[4].textContent =
              "Humidity " + data.list[6].main.humidity + "%";

            document.querySelector("#day-2").textContent = day2;
            forecastContainer.children[1].children[1].textContent =
              "Weather :" + data.list[14].weather[0].main;
            forecastContainer.children[1].children[2].textContent =
              "Temp: " + data.list[14].main.temp + "°F";
            forecastContainer.children[1].children[3].textContent =
              "Wind: " + data.list[14].wind.speed + "mph";
            forecastContainer.children[1].children[4].textContent =
              "Humidity " + data.list[14].main.humidity + "%";

            document.querySelector("#day-3").textContent = day3;
            forecastContainer.children[2].children[1].textContent =
              "Weather :" + data.list[22].weather[0].main;
            forecastContainer.children[2].children[2].textContent =
              "Temp: " + data.list[22].main.temp + "°F";
            forecastContainer.children[2].children[3].textContent =
              "Wind: " + data.list[22].wind.speed + "mph";
            forecastContainer.children[2].children[4].textContent =
              "Humidity " + data.list[22].main.humidity + "%";

            document.querySelector("#day-4").textContent = day4;
            forecastContainer.children[3].children[1].textContent =
              "Weather :" + data.list[30].weather[0].main;
            forecastContainer.children[3].children[2].textContent =
              "Temp: " + data.list[30].main.temp + "°F";
            forecastContainer.children[3].children[3].textContent =
              "Wind: " + data.list[30].wind.speed + "mph";
            forecastContainer.children[3].children[4].textContent =
              "Humidity " + data.list[30].main.humidity + "%";

            document.querySelector("#day-5").textContent = day5;
            forecastContainer.children[4].children[1].textContent =
              "Weather :" + data.list[38].weather[0].main;
            forecastContainer.children[4].children[2].textContent =
              "Temp: " + data.list[38].main.temp + "°F";
            forecastContainer.children[4].children[3].textContent =
              "Wind: " + data.list[38].wind.speed + "mph";
            forecastContainer.children[4].children[4].textContent =
              "Humidity " + data.list[38].main.humidity + "%";
          });
      }
      // call to both current weather and forecast functions
      getCurrentWeather();
      getFutureWeather();
    });
}

// on page load renders local storage search history buttons to page
function initSearchHistory() {
  var storedHistory = localStorage.getItem("search-history");
  if (storedHistory) {
    searchHistory = JSON.parse(storedHistory);
  }
  renderSearchHistory();
}
initSearchHistory();
