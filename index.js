const time = document.getElementById('time'),
    greating = document.getElementById('greating'),
    uName = document.getElementById('name'),
    focus = document.getElementById('focus'),
    icon = document.querySelector('.icon'),
    degree = document.querySelector('.deg'),
    timeZone = document.querySelector('.time-zone')

let lat;
let long;
// Show Time 
function showTime() {
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    
    // Set AM or PM
    const ampm = hour > 12 ? 'AM' : 'PM'

    // 12 Hour Format
    hour = hour % 12 || 12;

    // show up time
    time.innerHTML = `${addZeros(hour)}<span>:</span>${addZeros(min)}<span>:</span>${addZeros(sec)}`

    // time
    setTimeout(showTime, 1000)
}

// Add Zeros
function addZeros(n) {
    return (n < 10 ? '0' : '') + n
}

// Set Backgorund and Greating 
function bgGrate() {
    let today = new Date(),
    hour = today.getHours();

    if (hour < 12) {
        greating.textContent = 'Good Morning'
        document.body.style.backgroundImage = 'url(./olivier-miche-CDzTgaSI86U-unsplash.jpg)'
    }else if (hour < 18)
    { 
        greating.textContent = 'Good AfterNoon'
        document.body.style.backgroundImage = 'url(./dawid-zawila--G3rw6Y02D0-unsplash.jpg)'
        document.body.style.color = 'white'
    }else 
    {
        greating.textContent = 'Good Evening'
        document.body.style.backgroundImage = 'url(./nathan-anderson-L95xDkSSuWw-unsplash.jpg)'
        document.body.style.color = 'white'
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        uName.textContent = '[Enter Name]'
    }else
    {
        uName.textContent = localStorage.getItem('name')
    }
}

// Set Name 
function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.charCode == 13) {
            localStorage.setItem('name', e.target.textContent)
            uName.blur()
        }
    }else localStorage.setItem('name', e.target.textContent)
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]'
    }else
    {
        focus.textContent = localStorage.getItem('focus')
    }
}

// Set focus 
function setFocus(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.charCode == 13) {
            localStorage.setItem('focus', e.target.textContent)
            focus.blur()
        }
    }else localStorage.setItem('focus', e.target.textContent)
}

// Weather Object 
const weather = {
    temperature: {
        unit : 'celsius'
    }
}
// Weather API Key
const key = "0c2d1c5d856a58f686e5e1079f143492";
// Set Weather
function setWeather() {
    // Adress   
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            long = position.coords.longitude

            // Set The API
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`

            //get weather
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    weather.temperature.value = Math.floor(data.main.temp - 273)
                    weather.icon = data.weather[0].icon
                    weather.city = data.name
                    weather.country = data.sys.country
                    console.log(data)
                })
                .then(() => {
                    displayWeather()
                })
        })
    }
}
function displayWeather() {
    icon.innerHTML = `<img src="icons/${weather.icon}w.png"/>`
    degree.innerHTML = `${weather.temperature.value}°C`
    timeZone.innerHTML = `${weather.city}, ${weather.country}`
}

// Run
uName.addEventListener('keypress', setName)
uName.addEventListener('blur', setName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)
showTime();
bgGrate();
getName()
getFocus()
setWeather()