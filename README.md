# Weather Dashboard

## Description

This application is a weather forecast webpage that displays weather conditions for a city searched using the OpenWeather Server API. The application is built using mainly using JavaScript to create a dynamically updated webpage featuring various weather conditions for a specific city including a 5-day forecast, with styling created using the Bootstrap CSS framework. The webpage also includes a search history feature that allows the user to view their past searches and easily revisit weather information about cities they've searched before.

## Usage

When the user first arrives on the page, they can search for a city name using the search form on the top left of the webpage. Once the user clicks on the search button, the webpage will then render the city name, information about the city's current weather conditions in the today's weather section, the same type of information for the upcoming 5 days of that city. Each search the user makes will create and save a button to the search history for them to click on and easily search for and display that city's weather data again. The search history will save to local storage so the searched cities will load when the page is refreshed or revisited.