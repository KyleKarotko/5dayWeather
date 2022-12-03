var searchFormEl = document.querySelector('#search-form');
var APIkey = "00a2ab0e16fa5ac0d1cd1818e2d4d52c";

// Function to search for city by name
function citySearch(event) {
    event.preventDefault();
    var searchInput = document.querySelector('#city-search').value;  
    if (!searchInput) {
      console.error('No city entered!');
      return;
    }
    convertCord(searchInput);
  
  }
  searchFormEl.addEventListener('submit', citySearch);


  
//Function to get Cord from city name
function convertCord (city){
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=5&appid=" + APIkey)
    .then(function(response){
    return response.json()
    }).then(function(data){
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      var cityName = data[0].name;
      getCurrentWeather(lat,lon,cityName)
    })
}

// function to get weather for city searched
  function getCurrentWeather(lat,lon,name){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`)
    .then(function(response){
      return response.json()
      }).then(function(data){
        console.log(data);
        console.log(name);
        var temp = data.main.temp;
        var humidity = data.main.humidity
        var wind = data.wind.speed
        var icon = data.weather[0].icon
        var weatherCard= document.createElement("div");
        weatherCard.setAttribute("class","card");
        var cardTitle = document.createElement("h3");
        cardTitle.setAttribute("class","card-title");
        cardTitle.textContent = name;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(cardTitle));
        var currentIcon = document.createElement('div')
        currentIcon.setAttribute('class', 'card-body');
        currentIcon.textContent = icon;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentIcon));
        var currentTemp = document.createElement('div');
        currentTemp.setAttribute('class', 'card-body');
        currentTemp.textContent = "Temperature: " + temp;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentTemp));
        var currentHumidity = document.createElement('div');
        currentHumidity.setAttribute('class', 'card-body');
        currentHumidity.textContent = "Humidity: " + humidity;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentHumidity));
        var currentWind= document.createElement('div');
        currentWind.setAttribute('class', 'card-body');
        currentWind.textContent = "Wind Speed: " + wind + "MPH";
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentWind));

       
      });
  }




function init(){

};




init();

