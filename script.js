document.getElementById('fetch-btn').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      showMap(latitude, longitude);
      fetchWeatherData(latitude, longitude);
    },
    error => {
      console.error('Error fetching location:', error);
      alert('Unable to fetch your location.');
    }
  );
});

function showMap(lat, lon) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng: lon },
    zoom: 10
  });

  new google.maps.Marker({
    position: { lat, lng: lon },
    map: map
  });
}

function fetchWeatherData(lat, lon) {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeatherData(data) {
  const weatherDetails = document.getElementById('weather-details');
  const { temp } = data.current;
  const { description } = data.current.weather[0];
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_speed;

  weatherDetails.innerHTML = `
    <h2>Weather Details</h2>
    <p>Temperature: ${temp} °C</p>
    <p>Description: ${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}
