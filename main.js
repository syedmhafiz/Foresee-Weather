const api = "76a808a9f4a802a776b108b2aa82cd0c"

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+api)
     .then(weather => {
         return weather.json();
     }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = weather.name+", "+ weather.sys.country ;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = parseInt(weather.main.temp - 273)+"<span>&#176;</span>C";
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-lo');
    hilow.innerHTML = parseInt(weather.main.temp_min - 273)+"<span>&#176;</span>C / "+parseInt(weather.main.temp_max - 273)+"<span>&#176;</span>C";
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return day+" "+date+" "+month+" "+year;
}