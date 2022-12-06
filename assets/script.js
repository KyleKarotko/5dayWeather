var searchFormEl = document.querySelector('#search-form');
var APIkey = "00a2ab0e16fa5ac0d1cd1818e2d4d52c";
var city = document.getElementById('city-search');
const searchedCitiesEl = document.getElementById('searched-cities');
const card = document.getElementById('fiveDayFor');

// Function to search for city by name
function citySearch(event) {
    event.preventDefault();
    var searchInput = document.querySelector('#city-search').value;  
    if (!searchInput) {
      console.error('No city entered!');
      return;
    }
    convertCord(searchInput);
    addSearchedCity(searchInput)
  
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
        // vars for current weather display
        var temp = data.main.temp;
        var humidity = data.main.humidity
        var wind = data.wind.speed
        var icon = data.weather[0].icon
        //sets city at card header
        var weatherCard= document.createElement("div");
        weatherCard.setAttribute("class","card");
        var cardTitle = document.createElement("h3");
        cardTitle.setAttribute("class","card-title");
        cardTitle.textContent = name;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(cardTitle));
        //displays current weather conditon icon
        var currentIcon = document.createElement('img');
        currentIcon.setAttribute('class', 'card-body');
        currentIcon.textContent = icon;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentIcon));
        //somehow use the below to add the icon. need to follow up and ask
        //attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
        //displays current Tempature
        var currentTemp = document.createElement('div');
        currentTemp.setAttribute('class', 'card-body');
        currentTemp.textContent = "Temperature: " + temp;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentTemp));
        //displays current humidity
        var currentHumidity = document.createElement('div');
        currentHumidity.setAttribute('class', 'card-body');
        currentHumidity.textContent = "Humidity: " + humidity;
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentHumidity));
        //displays current wind speed
        var currentWind= document.createElement('div');
        currentWind.setAttribute('class', 'card-body');
        currentWind.textContent = "Wind Speed: " + wind + "MPH";
        document.querySelector("#current-box").appendChild(weatherCard.appendChild(currentWind));

       fiveDayForecast(lat,lon,name);
      });
  }

  //function to get five day forecast and set them to cards
  function fiveDayForecast(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`)
    .then(function(response){
      return response.json()
      }).then(function(data){
        console.log(data);
        var resultArray = data.list;
        for ( var i = 0; i < resultArray.length; i++) {
          if (resultArray[i].dt_txt.split(' ')[1] === '12:00:00') {
            console.log(resultArray[i]);
            var temp = data.list[i].main.temp;
            var humidity = data.list[i].main.humidity
            var wind = data.list[i].wind.speed
            var date = data.list[i].dt_txt.split(' ')[0];
            //var icon = data.weather[0].icon
            var fiveWeatherCard= document.createElement("container");
            fiveWeatherCard.setAttribute("class","card");
            //Date for 5 day cards
            var fiveDayDate = document.createElement('h5');
            fiveDayDate.setAttribute('class', '5card-body');
            fiveDayDate.textContent = date;
            document.querySelector(".fiveCardDate").appendChild(fiveWeatherCard.appendChild(fiveDayDate));
            //Temp for 5 day cards
            var fiveDayTemp = document.createElement('p');
            fiveDayTemp.setAttribute('class', '5card-body');
            fiveDayTemp.textContent = "Temperature: " + temp;
            document.querySelector(".fiveCardDate").appendChild(fiveDayDate.appendChild(fiveDayTemp));
            //Humidity for 5 day cards
            var fiveDayHumidity = document.createElement('p');
            fiveDayHumidity.setAttribute('class', '5card-body');
            fiveDayHumidity.textContent = "Humidity: " + humidity;
            document.querySelector(".fiveCardDate").appendChild(fiveDayDate.appendChild(fiveDayHumidity));
           //displays wind speed for 5 day
            var fiveDayWind = document.createElement('p');
            fiveDayWind.setAttribute('class', 'card-body');
            fiveDayWind.textContent = "Wind Speed: " + wind + "MPH";
            document.querySelector(".fiveCardDate").appendChild(fiveDayHumidity.appendChild(fiveDayWind));
          }
        }

      });
  }



function addSearchedCity(city) {
  let cities = JSON.parse(localStorage.getItem('cities'))
  if (!cities) {
    cities = []
  }
  cities.push(city)
  localStorage.setItem('cities', JSON.stringify(cities))
  renderCityButtons(cities)
}

function renderCityButtons(cities) {
  var htmlContainer = '';
  cities.forEach((city) => {
    htmlContainer += `<button class="city-button" data-city="${city}">${city}</button>`
  })
  searchedCitiesEl.innerHTML = htmlContainer
  // to the container from the dom append this list htmlContainer
  // add event listener to each element with class .city-button
}
