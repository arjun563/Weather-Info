let appId = '8cbb417c50753ca32a5bef8dd565864b';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}& APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("https://www.pexels.com/photo/blue-sky-281260/")';
            break;
            
        case 'Clouds':
             document.body.style.backgroundImage = 'url("https://www.pexels.com/photo/grey-white-clouds-158163/")';
            break;
            
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("https://www.pexels.com/photo/road-between-pine-trees-39811/")';
            break;
            
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("https://www.pexels.com/photo/white-lightning-heating-mountain-53459/")';
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = 'url("https://www.pexels.com/photo/black-wooden-fence-on-snow-field-at-a-distance-of-black-bare-trees-65911/")';
            break;
        
        default:
            break;
    }
    
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg')
    
    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
    let resultDescription =resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice();
    
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
    
    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;
    
    weatherContainer.style.left = 'calc(50% - ${weatherContainerWidth/2}px)';
    weatherContainer.style.top = 'calc(50% - ${weatherContainerHeight/1.3}px)';
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click',() => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
      searchWeather(searchTerm);
})