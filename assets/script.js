//  This is the api for search by city name: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let weather = {
    "apiKey": "55a6954f12cc210afa8e25673eee2695",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
      )
      .then((response)=> response.json()) 
      .then((data)=> this.displayWeather(data))
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp +"°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-box").value);

    }

};

function displayCity() {
    return localStorage.getItem("cityName");
}

function updateText() {
    var userOutput = displayCity();
    document.getElementById("output").innerText = userOutput;
}

function getInput() {
    var userOutput = document.getElementById("search-box").value;
    localStorage.setItem("cityName",userOutput );
    updateText();
}

getInput();
//const userInput = document.getElementById("search-box");
//const getButton = document.getElementById("search-btn");
//const userOutput = document.getElementById("output");

//function displayCity() {
//    userOutput.innerText = userInput.value;
//};

//getButton.addEventListener("click", displayCity);

document.querySelector(".search-btn")
.addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-box").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});


//document.getElementById("button").addEventListener("click", addCity);

weather.fetchWeather("Nashville");

