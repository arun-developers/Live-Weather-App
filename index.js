const apiKey = "c79f51196b8ad1d924c6c9583a622733";

let container = document.getElementById("container");

async function getData() {
    let value = document.getElementById("name").value;
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`);
        let data = await res.json();
        // console.log(data);
        displayData(data);

    }
    catch (err) {

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`);

        let data = await res.json();

        notFound(data);
    }
}
function notFound(data) {

    container.innerText = null;

    let code = document.createElement("h4");

    code.innerText = `Error ${data.cod} : ${data.message}`;

    container.append(code);
}
function displayData(data) {

    container.innerText = null;

    let cityName = document.createElement("h3");
    cityName.innerText = `City Name : ${data.name} (${data.sys.country})`;

    const milliseconds = data.sys.sunrise;
    const hours = `0${new Date(milliseconds).getHours() - 1}`.slice(-2);
    const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
    const seconds = `0${new Date(milliseconds).getSeconds()}`.slice(-2);
    const timesunrise = `${hours}:${minutes}:${seconds}`

    let sunrise = document.createElement("p");
    sunrise.innerText = `Sunrise : ${timesunrise} AM`;

    const millisecondsunset = data.sys.sunset;
    const hour = `0${new Date(millisecondsunset).getHours() - 1}`.slice(-2);
    const minute = `0${new Date(millisecondsunset).getMinutes()}`.slice(-2);
    const second = `0${new Date(millisecondsunset).getSeconds()}`.slice(-2);
    const timesunset = `${hour}:${minute}:${second}`

    let sunset = document.createElement("p");
    sunset.innerText = `Sunset : ${timesunset} PM`;

    let humidity = document.createElement("p");
    humidity.innerText = `Humidity : ${data.main.humidity}`;

    let normalTemp = document.createElement("p");
    normalTemp.innerText = `Normal Temperature : ${(data.main.temp - 273.15).toFixed(2)}°C`

    let maxTemp = document.createElement("p");
    maxTemp.innerText = `Maximum Temperature : ${(data.main.temp_max - 273.15).toFixed(2)}°C`;

    let minTemp = document.createElement("p");
    minTemp.innerText = `Minimum Temperature : ${(data.main.temp_min - 273.15).toFixed(2)}°C`;

    let Weather = document.createElement("p");
    Weather.innerText = `Weather : ${data.weather[0].description}`;

    container.append(cityName, sunrise, humidity, Weather, normalTemp, maxTemp, minTemp, sunset);

    let iframe = document.getElementById("gmap_canvas");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}

async function getLiveWeather(lat, lon) {

    try {

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        let data = await res.json();

        displayDataLiveLocation(data);

        // console.log(data);

    } catch (error) {

        console.log(error);

        // myasur coordinates --> lat --> 12.2958 , lon -->76.6394
    }
}
function displayDataLiveLocation(data) {

    container.innerText = null;

    let cityName = document.createElement("h3");
    cityName.innerText = `City Name : ${data.name} (${data.sys.country})`;

    const milliseconds = data.sys.sunrise;
    const hours = `0${new Date(milliseconds).getHours() - 1}`.slice(-2);
    const minutes = `0${new Date(milliseconds).getMinutes()}`.slice(-2);
    const seconds = `0${new Date(milliseconds).getSeconds()}`.slice(-2);
    const timesunrise = `${hours}:${minutes}:${seconds}`

    let sunrise = document.createElement("p");
    sunrise.innerText = `Sunrise : ${timesunrise} AM`;

    const millisecondsunset = data.sys.sunset;
    const hour = `0${new Date(millisecondsunset).getHours() - 1}`.slice(-2);
    const minute = `0${new Date(millisecondsunset).getMinutes()}`.slice(-2);
    const second = `0${new Date(millisecondsunset).getSeconds()}`.slice(-2);
    const timesunset = `${hour}:${minute}:${second}`

    let sunset = document.createElement("p");
    sunset.innerText = `Sunset : ${timesunset} PM`;

    let humidity = document.createElement("p");
    humidity.innerText = `Humidity : ${data.main.humidity}`;

    let normalTemp = document.createElement("p");
    normalTemp.innerText = `Normal Temperature : ${(data.main.temp - 273.15).toFixed(2)}°C`

    let maxTemp = document.createElement("p");
    maxTemp.innerText = `Maximum Temperature : ${(data.main.temp_max - 273.15).toFixed(2)}°C`;

    let minTemp = document.createElement("p");
    minTemp.innerText = `Minimum Temperature : ${(data.main.temp_min - 273.15).toFixed(2)}°C`;

    let Weather = document.createElement("p");
    Weather.innerText = `Weather : ${data.weather[0].description}`;

    container.append(cityName, sunrise, humidity, Weather, normalTemp, maxTemp, minTemp, sunset);


    let iframe = document.getElementById("gmap_canvas");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}


function getLiveLocationWeather() {

    navigator.geolocation.getCurrentPosition(success);

    function success(position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getLiveWeather(latitude, longitude);
    }
}
// --------------------------------------------------------------------------------------------------------->
function getLiveLocationWeatherSevendays() {

    navigator.geolocation.getCurrentPosition(success);

    function success(position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getSevetDaysData(latitude, longitude);

    }
}
getLiveLocationWeatherSevendays()
async function getSevetDaysData(lat, lon) {

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=0e49ba7824798668adc4d16f77cf87d8`);
        let data = await response.json();
        // console.log("seven", data);
        appendSevenDaysWeatherData(data.daily);
    }
    catch (error) {
        console.log(error);
    }

}
let weekArr = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
function appendSevenDaysWeatherData(data) {
    let sevenDaysContainer = document.getElementById("weekDiv");
    sevenDaysContainer.style.display = "flex";
    data.map(function (el) {

        let div = document.createElement("div");
        div.setAttribute("class", "sunChildDiv");
        div.style.width = "12%";
        div.style.height = "157px";
        div.style.margin = "auto";
        div.style.border = "1px solid green"
        div.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";

        let day = document.createElement("p");
        let Arr = [];
        for (let i = 0; i < weekArr.length; i++) {
            Arr.push(weekArr[i]);
            if (Arr.length === 1) {
                weekArr.shift();
                break;
            }
        }
        day.innerText = Arr.join(" ");
        day.style.textAlign = "center";

        let image = document.createElement("img");
        image.src = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
        image.style.marginLeft = "22px";

        let maxtemp = document.createElement("p");
        maxtemp.innerText = `${(el.temp.max - 273.15).toFixed(2)}°C`;
        maxtemp.style.textAlign = "center";

        div.append(day, image, maxtemp);

        sevenDaysContainer.append(div);
    })


}





