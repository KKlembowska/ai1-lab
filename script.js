document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('pogoda').addEventListener('click', () => {
      current();
      forecast();
  });

  function formatDateString(dateString) {
      const dateObject = new Date(dateString);
      const day = String(dateObject.getDate()).padStart(2, '0');
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const year = dateObject.getFullYear();
      return `${day}.${month}.${year}`;
  }

  function createWeatherBlock(date, temperature, feelsLike, iconCode, description) {
      const block = document.createElement('div');
      block.classList.add('weather-block');

      const currentInfo = `Data: ${date}<br>Temperatura: ${temperature}°C<br>temperatura odczuwalna: ${feelsLike}°C<br>opis: ${description}`;
      const imgUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

      block.innerHTML = `<p>${currentInfo}</p>
          <img src="${imgUrl}">`;

      return block;
  }

  function displayWeatherInfo(data, isForecast = false) {
      let date, temperature, feelsLike, iconCode, description;

      if (isForecast) {
          date = formatDateString(data.dt_txt);
          temperature = data.main.temp;
          feelsLike = data.main.feels_like;
          iconCode = data.weather[0].icon;
          description = data.weather[0].description;
      } else {
          date = formatDateString(new Date()); 
          temperature = data.getElementsByTagName('temperature')[0].getAttribute('value');
          feelsLike =data.getElementsByTagName('feels_like')[0].getAttribute('value');
          iconCode = data.getElementsByTagName('weather')[0].getAttribute('icon');
          description = data.getElementsByTagName('weather')[0].getAttribute('value');
      }

      const weatherInfoElement = isForecast ? document.getElementById('weatherInfo2') : document.getElementById('weatherInfo');
      const block = createWeatherBlock(date, temperature, feelsLike, iconCode, description);
      weatherInfoElement.appendChild(block);
  }

  function forecast() {
      let miasto = document.getElementById("miasto").value;
      let apiKey = '7ded80d91f2b280ec979100cc8bbba94';
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${miasto}&appid=${apiKey}&units=metric&lang=pl`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
              const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
              dailyData.forEach(dayData => {
                  displayWeatherInfo(dayData, true);
              });
          })
          
          
  }

  function current() {
      let miasto = document.getElementById("miasto").value;
      let apiKey = '7ded80d91f2b280ec979100cc8bbba94';
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=${apiKey}&units=metric&mode=xml&lang=pl`;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
              const xmlDoc = xhttp.responseXML;
            //   console.log(xmlDoc);
              displayWeatherInfo(xmlDoc);
              
          }
      };

      xhttp.open('GET', url, true);
      xhttp.send();
      
  }
});
