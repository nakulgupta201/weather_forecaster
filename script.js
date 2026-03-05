const apiKey = "YOUR_API_KEY";

function searchCity(){

let city = document.getElementById("cityInput").value;

localStorage.setItem("city", city);

window.location.href = "weather.html";

}

window.onload = function(){

if(document.getElementById("cityName")){

let city = localStorage.getItem("city");

getWeather(city);

}

if(document.getElementById("favList")){

showFavCities();

}

}

function getWeather(city){

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)

.then(res => res.json())

.then(data => {

document.getElementById("cityName").innerText = data.name;

document.getElementById("temperature").innerText =
"Temperature: " + data.main.temp + " °C";

document.getElementById("description").innerText =
"Weather: " + data.weather[0].description;

})

}

function addFavourite(){

let city = localStorage.getItem("city");

let fav = JSON.parse(localStorage.getItem("favCities")) || [];

if(!fav.includes(city)){

fav.push(city);

}

localStorage.setItem("favCities", JSON.stringify(fav));

alert("City added to favourites");

}

function showFavCities(){

let fav = JSON.parse(localStorage.getItem("favCities")) || [];

let list = document.getElementById("favList");

list.innerHTML = "";

fav.forEach((city,index)=>{

let li = document.createElement("li");

li.innerHTML =
`<span onclick="openCity('${city}')" style="cursor:pointer;color:blue">
${city}
</span>
<button onclick="deleteCity(${index})">Delete</button>`;

list.appendChild(li);

});

}

function openCity(city){

localStorage.setItem("city", city);

window.location.href = "weather.html";

}

function deleteCity(index){

let fav = JSON.parse(localStorage.getItem("favCities"));

fav.splice(index,1);

localStorage.setItem("favCities", JSON.stringify(fav));

showFavCities();


}
