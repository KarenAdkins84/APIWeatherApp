//  This is the api for search by city name: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let weather = {
    fetchWeather: function (city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=55a6954f12cc210afa8e25673eee2695"
    )
    .then((response)=> response.json()) 
    .then((data)=>{ 
        console.log(data)
        this.displayWeather(data)})
    
    },
    displayWeather: function(data) {
        const {name} = data;
        const {date} = (new Date(data.dt).toLocaleString("en-US"));
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".date").innerText = date;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp +"°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-box").value);

    }

};

function getCoords() {
    const cityName = document.querySelector(".search-box").value;
    fetch ("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName +"&appid=55a6954f12cc210afa8e25673eee2695")
    .then((response)=> response.json())
    .then((data)=> getForecast(data[0].lat, data[0].lon))
};

var forecastContainer = document.querySelector(".fiveDayForecast")

function getForecast(lat, lon) {
    fetch ("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + lon +"&cnt=6&exclude=minutely,hourly,alerts,current&units=imperial&appid=612a96a9d9c09ffb1dd59c3b543a8e1f")
    .then((response)=> response.json())
    .then((data)=> {
        console.log(data)
        showForecast(data.list)
    })
};

//trying to get UV//
function getUVI(lat, lon) {
    fetch ("https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat +"&lon=" + lon +"&appid=55a6954f12cc210afa8e25673eee2695")
    .then((response)=> response.json())
    .then((data)=> {
        console.log(data)
    })
};

function showForecast(data)
{
    const row = document.createElement("div");
    row.classList.add("col-sm")
    for (var i=1; i < 6; i++) {
        const col = document.createElement("div");
        col.classList.add("col-sm");
        const date = document.createElement("div");
        date.classList.add("date1");
        date.textContent = `date: ${data[i].dt_txt}`;
        col.appendChild(date);
        const img = document.createElement("img");
        img.classList.add("icon");
        img.setAttribute("src", `https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`);
        col.appendChild(img);
        const temp = document.createElement("div");
        temp.classList.add("temp1");
        temp.textContent= `temp: ${data[i].main.temp}°`;
        col.appendChild(temp);
        const wind = document.createElement("div");
        wind.classList.add("wind1");
        wind.textContent = "Wind speed: " + data[i].wind.speed + "mp/h";
        col.appendChild(wind);
        const humidity = document.createElement("div");
        humidity.classList.add("humidity1");
        humidity.textContent = "Humidity: " + data[i].main.humidity + "%";
        col.appendChild(humidity);
        row.appendChild(col);


    }
    
    forecastContainer.appendChild(row)
};





//let inputValue = (document.getElementById("userInput").value);
   // localStorage.setItem("city", inputValue);
    //let storedSearch = localStorage.getItem("city");
    //console.log(storedSearch);

//var cityName = document.querySelector(".search-box").value;
//localStorage.setItem("city", cityName);
//document.getElementById("output").innerText = cityName;

//let UVIndex = {
   // fetchUVIndex: function(city) {
   //     fetch("https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&units=imperial&appid=55a6954f12cc210afa8e25673eee2695")
   //     .then((response)=> response.json()) 
   //     .then((data)=> this.displayUVIndex(data))
    //    console.log()
   // }

//};

//function displayCity() {
//    return localStorage.getItem("cityName");
//}

//function updateText() {
 //   var userOutput = displayCity();
 //   document.getElementById("output").innerText = userOutput;
//}

//function getInput() {
    //var userOutput = document.getElementById("search-box").value;
    //localStorage.setItem("cityName",userOutput );
    //updateText();
//}

//getInput();
//const userInput = document.getElementById("search-box");
//const getButton = document.getElementById("search-btn");
//const userOutput = document.getElementById("output");

//function displayCity() {
//    userOutput.innerText = userInput.value;
//};

//getButton.addEventListener("click", displayCity);

document.querySelector(".search-btn")
.addEventListener("click", function(event) {
    event.preventDefault();
    weather.search();
    getCoords()
});

document.querySelector(".search-box").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
        getCoords()
    }
});
//latest attempt to save searched cities to localStorage and display under search//
$(".search-btn").on("click", function() {
    let inputCity = (document.querySelector(".search-box").value);
    localStorage.setItem("city", inputCity);
})

//$(".output").val(localStorage.getItem("city"));
const savedSearchContainer = document.querySelector(".output");
const savedList = document.createElement("div");
savedList.classList.add("stored");
savedList.textContent = document.querySelector(".search-box").value;
savedSearchContainer.appendChild(savedList);




//document.getElementById("button").addEventListener("click", addCity);

weather.fetchWeather("Nashville");

