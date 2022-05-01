//So many variables
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

//checking local storage for past searched cities and adding them to the page if any exist
if (localStorage.getItem("listySto")) {
    var listySto = JSON.parse(localStorage.getItem("listySto"));
    for (i = 0; i < listySto.length; i++) {
        var listy = document.querySelector("#listy");
        var liAdd = document.createElement("li");    
        listy.appendChild(liAdd);
        var lastAddedLi = listy.lastElementChild;
        var btnAdd = document.createElement("button");
        btnAdd.textContent = listySto[i];
        btnAdd.setAttribute("class", "useFull");
        btnAdd.addEventListener("click", function() {
            btnClickHandler(this.textContent);
        })
        lastAddedLi.appendChild(btnAdd);
        var brAdd = document.createElement("br");
        listy.appendChild(brAdd);
    }
}
//if there isn't anything in local storage, start from scratch with an empty array
else {
    var listySto = [];
}

//Run btnClickHandler() when the search button is clicked
btn.addEventListener("click", function() {
    btnClickHandler(document.querySelector("#city").value, false);
});


function btnClickHandler(city) {
    //build and call geocoding API call - this gives us the latitutde and longitude for the current weather api call
    place.textContent = city;
    var geo = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apikey;
    var lat;
    var lon;
    fetch(geo)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //build and call current weather API call
        lat = data[0].lat;
        lon = data[0].lon;
        var openweather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apikey;
        fetch(openweather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //update current weather html
            tempT.textContent = data.current.temp;
            windT.textContent = data.current.wind_speed;
            humidityT.textContent = data.current.humidity;
            uvT.textContent = data.current.uvi;
            if (uvT.textContent < 2) {
                uvT.setAttribute("style", "background-color: greenyellow"); 
            }
            if (uvT.textContent > 2) {
                uvT.setAttribute("style", "background-color: orange");
            }
            if (uvT.textContent > 6) {
                uvT.setAttribute("style", "background-color: red");
            }
            weatherIconT.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
            //update todays date
            dateT.textContent = moment().format("M/D/YYYY");
            //get 5 day forecast using openweather 5 day forecast api call
            var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apikey;
            fetch(fiveDayWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
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
                weatherIconTwo.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png");
                weatherIconThree.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[13].weather[0].icon + "@2x.png");
                weatherIconFour.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[21].weather[0].icon + "@2x.png");
                weatherIconFive.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[29].weather[0].icon + "@2x.png");
                weatherIconSix.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[37].weather[0].icon + "@2x.png");
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

                //make rightSec appear after everything has been loaded in
                rightSec.style.display = "block";
            })
        })
    })

    updateListAndStore(city);
};

function updateListAndStore(place) {
    //update list on left side and local storage list
    //first check if the list already has the current city so that there aren't duplicates
    var hasCity = false;
    for (i = 0; i < listySto.length; i++) {
        if (listySto[i] == place) {
            hasCity = true;
        }
    }
    //if not a duplicate, add it to the list and the local storage list
    if (!(hasCity)) {
        var listy = document.querySelector("#listy");
        var liAdd = document.createElement("li");    
        listy.appendChild(liAdd);
        var lastAddedLi = listy.lastElementChild;
        var btnAdd = document.createElement("button");
        btnAdd.textContent = place;
        btnAdd.setAttribute("class", "useFull");
        btnAdd.addEventListener("click", function() {
            btnClickHandler(btnAdd.textContent);
        })
        lastAddedLi.appendChild(btnAdd);
        var brAdd = document.createElement("br");
        listy.appendChild(brAdd);

        listySto.push(place);
    }
    localStorage.setItem("listySto", JSON.stringify(listySto));
}