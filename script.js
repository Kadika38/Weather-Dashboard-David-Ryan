var apikey = "252073c6764ac35c1362884795439edf";

var btn = document.querySelector("#searchButton");
var rightSec = document.querySelector("#rightSec");
var place = document.querySelector("#place");
var tempT = document.querySelector("#tempToday");
var windT = document.querySelector("#windToday");
var humidityT = document.querySelector("#humidityToday");
var uvT = document.querySelector("#uvIndexToday");
var dateT = document.querySelector("#dateToday");
var weatherIconT = document.querySelector("#weatherIconToday");

var dateTwo = document.querySelector("#dateTwo");
var weatherIconTwo = document.querySelector("#weatherIconTwo");
var tempTwo = document.querySelector("#tempTwo");
var windTwo = document.querySelector("#windTwo");
var humidityTwo = document.querySelector("#humidityTwo");

var dateThree = document.querySelector("#dateThree");
var weatherIconThree = document.querySelector("#weatherIconThree");
var tempThree = document.querySelector("#tempThree");
var windThree = document.querySelector("#windThree");
var humidityThree = document.querySelector("#humidityThree");

var dateFour = document.querySelector("#dateFour");
var weatherIconFour = document.querySelector("#weatherIconFour");
var tempFour = document.querySelector("#tempFour");
var windFour = document.querySelector("#windFour");
var humidityFour = document.querySelector("#humidityFour");

var dateFive = document.querySelector("#dateFive");
var weatherIconFive = document.querySelector("#weatherIconFive");
var tempFive = document.querySelector("#tempFive");
var windFive = document.querySelector("#windFive");
var humidityFive = document.querySelector("#humidityFive");

var dateSix = document.querySelector("#dateSix");
var weatherIconSix = document.querySelector("#weatherIconSix");
var tempSix = document.querySelector("#tempSix");
var windSix = document.querySelector("#windSix");
var humiditySix = document.querySelector("#humiditySix");

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
            weatherIconT.setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
            //update todays date
            dateT.textContent = moment().format("M/D/YYYY");
            //get 5 day forecast
            var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apikey;
            fetch(fiveDayWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                //5 13 21 29 37
                //getting, formatting, and displaying dates
                dateTwoOrig = data.list[5].dt_txt;
                dateTwoOrig = dateTwoOrig.split(' ')[0];
                dateTwoOrig = moment(dateTwoOrig).format("M/D/YYYY");
                dateThreeOrig = data.list[13].dt_txt;
                dateThreeOrig = dateThreeOrig.split(' ')[0];
                dateThreeOrig = moment(dateThreeOrig).format("M/D/YYYY");
                dateFourOrig = data.list[21].dt_txt;
                dateFourOrig = dateFourOrig.split(' ')[0];
                dateFourOrig = moment(dateFourOrig).format("M/D/YYYY");
                dateFiveOrig = data.list[29].dt_txt;
                dateFiveOrig = dateFiveOrig.split(' ')[0];
                dateFiveOrig = moment(dateFiveOrig).format("M/D/YYYY");
                dateSixOrig = data.list[37].dt_txt;
                dateSixOrig = dateSixOrig.split(' ')[0];
                dateSixOrig = moment(dateSixOrig).format("M/D/YYYY");
                dateTwo.textContent = dateTwoOrig;
                dateThree.textContent = dateThreeOrig;
                dateFour.textContent = dateFourOrig;
                dateFive.textContent = dateFiveOrig;
                dateSix.textContent = dateSixOrig;
                //getting and displaying weather icons
                weatherIconTwo.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png");
                weatherIconThree.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[13].weather[0].icon + "@2x.png");
                weatherIconFour.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[21].weather[0].icon + "@2x.png");
                weatherIconFive.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[29].weather[0].icon + "@2x.png");
                weatherIconSix.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[37].weather[0].icon + "@2x.png");
                //getting and displaying temp, wind, and humidity
                tempTwo.textContent = data.list[5].main.temp;
                windTwo.textContent = data.list[5].wind.speed;
                humidityTwo.textContent = data.list[5].main.humidity;
                tempThree.textContent = data.list[13].main.temp;
                windThree.textContent = data.list[13].wind.speed;
                humidityThree.textContent = data.list[13].main.humidity;
                tempFour.textContent = data.list[21].main.temp;
                windFour.textContent = data.list[21].wind.speed;
                humidityFour.textContent = data.list[21].main.humidity;
                tempFive.textContent = data.list[29].main.temp;
                windFive.textContent = data.list[29].wind.speed;
                humidityFive.textContent = data.list[29].main.humidity;
                tempSix.textContent = data.list[37].main.temp;
                windSix.textContent = data.list[37].wind.speed;
                humiditySix.textContent = data.list[37].main.humidity;
            })
        })
    })

    //make rightSec appear
    rightSec.style.display = "block";
};