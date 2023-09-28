// Get the elements from the HTML form
const cityForm = document.getElementById("cityForm");
const cityInput = document.getElementById("cityInput");
const zipInput = document.getElementById("zipInput");
const getWeatherByCityButton = document.getElementById(
  "getWeatherByCityButton"
);
const getWeatherByZipButton = document.getElementById("getWeatherByZipButton");
const getWeatherByLocationButton = document.getElementById(
  "getWeatherByLocation"
);
const currentWeather = document.getElementById("currentWeather");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherDescription = document.getElementById("weatherDescription");
const errorMessage = document.getElementById("errorMessage");
const retryButton = document.getElementById("retryButton");

// Add an event listener to the "Get Weather" button
getWeatherByCityButton.addEventListener("click", () => {
  // Get the city name from the input field
  const cityName = cityInput.value;
  console.log(cityName);
  // Make an AJAX call to get the weather data for the city
  const apiKey = "68a56e892fc4bd3ed40aa79e8ab2823d";
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the request method and URL
  xhr.open("GET", apiUrl);

  // Set the request headers
  xhr.setRequestHeader("Content-Type", "application/json");

  // Send the request
  xhr.send();
  // Listen for the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Success!
      const weatherData = JSON.parse(xhr.responseText);
      displayWeatherData(weatherData);
    } else {
      // Error!
      console.error("Error fetching weather data:", xhr.statusText);
      errorMessage.textContent = `Sorry, there was an error fetching the weather data. Please Enter the correct city name.`;
      retryButton.addEventListener("click", function () {
        // Hide the retry button
        retryButton.style.display = "block";

        // Clear the error message
        errorMessageElement.textContent = "";

        // Retry the weather data fetch
        xhr.open("GET", apiUrl);
        xhr.send();
      });
    }
  };
});

getWeatherByZipButton.addEventListener("click", () => {
  // Get the city name from the input field
  const zipCode = zipInput.value;
  console.log(zipCode);

  // Make an AJAX call to get the weather data for the city
  const apiKey = "68a56e892fc4bd3ed40aa79e8ab2823d";
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&appid=${apiKey}&units=metric`;

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set the request method and URL
  xhr.open("GET", apiUrl);

  // Set the request headers
  xhr.setRequestHeader("Content-Type", "application/json");

  // Send the request
  xhr.send();

  // Listen for the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Success!
      const weatherData = JSON.parse(xhr.responseText);
      displayWeatherData(weatherData);
    } else {
      errorMessage.textContent = `Sorry, there was an error fetching the weather data. Please Enter the correct Zip Code.`;
    }
  };
});

// Add an event listener to the geolocation button
getWeatherByLocationButton.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Make an AJAX call to get the weather data for the user's location
        const apiKey = "68a56e892fc4bd3ed40aa79e8ab2823d";
        const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Set the request method and URL
        xhr.open("GET", apiUrl);

        // Set the request headers
        xhr.setRequestHeader("Content-Type", "application/json");

        // Send the request
        xhr.send();

        // Listen for the response
        xhr.onload = function () {
          if (xhr.status === 200) {
            // Success!
            const weatherData = JSON.parse(xhr.responseText);
            displayWeatherData(weatherData);
          } else {
            errorMessage.textContent = `Sorry, there was an error fetching the weather data for your location.`;
          }
        };
      },
      (error) => {
        // Handle geolocation error
        console.error("Geolocation error:", error);
        errorMessage.textContent = `Geolocation error: ${error.message}`;
      }
    );
  } else {
    errorMessage.textContent = "Geolocation is not supported by your browser.";
  }
});

// Add an event listener to the unit select dropdown
unitSelect.addEventListener("change", () => {
  // Get the selected unit from the dropdown
  const selectedUnit = unitSelect.value;
  console.log(selectedUnit);
  // Call the function to update the temperature display
  updateTemperatureDisplay(selectedUnit);
});

function updateTemperatureDisplay(unit) {
  // Extract the temperature value from the text content
  const temperatureText = temperature.textContent;
  const temperatureValue = parseFloat(
    temperatureText.match(/-?\d+(\.\d+)?/)[0]
  );

  console.log(temperature.textContent);

  if (unit === "metric") {
    // Convert Fahrenheit to Celsius and round to 2 decimal places
    const temperatureCelsius = (((temperatureValue - 32) * 5) / 9).toFixed(2);
    temperature.textContent = `Temperature: ${temperatureCelsius}°C`;
  } else if (unit === "imperial") {
    // Convert temperature to Fahrenheit
    const temperatureFahrenheit = ((temperatureValue * 9) / 5 + 32).toFixed(2);
    temperature.textContent = `Temperature: ${temperatureFahrenheit}°F`;
  }
}

function displayWeatherData(data) {
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
  weatherDescription.textContent = `City: ${data.name}`;
  errorMessage.textContent = ``;
  currentWeather.style.display = "block";
}
