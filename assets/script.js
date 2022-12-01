var searchFormEl = document.querySelector('#search-form');
var APIkey = "00a2ab0e16fa5ac0d1cd1818e2d4d52c";
var city = "Nashville";
var lat ="";
var lon ="";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}";
var APIurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIkey;

// Function to search for city
function citySearch(event) {
    event.preventDefault();
    var searchInput = document.querySelector('#search-input').value;  
    if (!searchInput) {
      console.error('No city entered!');
      return;
    }
  
  
  }
  
  searchFormEl.addEventListener('submit', citySearch);




function init(){

};




init();

