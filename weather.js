function convert(val) {//converts kelvin to celsius
    return (val - 273).toFixed(2);
  }
  
  let weather = {
    apiKey: "YOUR API KEY", //////////////////
    fetchWeather: function(city, icon) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          this.apiKey
      )
      .then((response) => {
        if (!response.ok) {
          alert("Wrong City Name");
          throw new Error("Wrong City Name");
        }
        return response.json();
       })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector("#city").innerHTML = "Weather in " + name;
      document.querySelector("#temp").innerHTML = convert(temp) + "°C";
      document.querySelector("#icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector("#description").innerHTML = description;
      document.querySelector("#humidity").innerHTML = "Humidity: " + humidity + "%";
      document.querySelector("#wind").innerHTML ="Wind speed: " + speed + "km/h";
    },
  };
  
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("input[type='submit']").addEventListener("click", function(event) {
      event.preventDefault();
      weather.fetchWeather(document.querySelector("#cityName").value);
      document.querySelector("#cityName").value = "";
      document.querySelectorAll(" #description, #humidity, #wind").forEach(function(element) {
          element.style.display = "block";
          element.style.margin = "auto";
          element.style.fontSize = "30px";
          element.style.fontWeight = "bold";
          element.style.fontFamily =  'Handlee', cursive;
      });
    });
  });
  