var apikey = "252073c6764ac35c1362884795439edf";

var btn = document.querySelector("#searchButton");
var rightSec = document.querySelector("#rightSec");
var place = document.querySelector("#place");
var tempT = document.querySelector("#tempToday");
var windT = document.querySelector("#windToday");
var humidityT = document.querySelector("#humidityToday");
var uvT = document.querySelector("#uvIndexToday");

btn.addEventListener("click", function() {
    btnClickHandler();
});

function btnClickHandler() {
    //build geocoding API call
    var input = document.querySelector("#city");
    var city = input.value;
    place.textContent = city;
    var geo = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apikey;
    var lat;
    var lon;
    fetch(geo)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //build current weather API call
        lat = data[0].lat;
        lon = data[0].lon;
        var openweather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apikey;
        console.log(openweather);
        fetch(openweather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //update current weather html
            tempT.textContent = data.current.temp;
            windT.textContent = data.current.wind_speed;
            humidityT.textContent = data.current.humidity;
            uvT.textContent = data.current.uvi;
        })
    })

    //make rightSec appear
    rightSec.style.display = "block";
};

//EXAMPLE
/* var testy = "https://api.openweathermap.org/data/2.5/weather?lat=33&lon=116&appid=252073c6764ac35c1362884795439edf";
    fetch(testy)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data)
    }); */

/* key: 252073c6764ac35c1362884795439edf  */