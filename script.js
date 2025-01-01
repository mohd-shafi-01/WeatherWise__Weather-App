const apiKey = "adde123e21ed970a81c69a45cfa8feee"; // API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // API URL

const searchBar = document.querySelector("#search-bar"); // Search bar
const searchBtn = document.querySelector("#search-btn"); // Search button
const weatherIcon = document.querySelector(".weather-icon"); // Weather icon

async function checkWeather(city) { // Async function to fetch the data from the API
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // Fetch the data from the API

  /**************************Error Handling***************************/

        if(response.status === 404) { // Not Found | if the location is not found
            document.querySelector(".weather-icon").src = "images/errorCloud.png" // Display error image
            let errorType = document.querySelector(".temp") // Display error message
                errorType.innerHTML = "404"; 

            let errorMsg = document.querySelector(".condition"); // Display error message
                errorMsg.innerHTML = "Location not found!"; 
                errorMsg.style.fontSize = "20px";
                
            document.querySelector(".location-box").style.display = "none";
            document.querySelector(".more-info").style.display = "none";
        } 
        /* else if(response.status === 400) { // Bad Request | if the input field is empty
          alert("Please enter a valid location!");
        } */
        else{ // If the location is found
 
          const data = await response.json(); // Convert the data into JSON format

          /*  console.log(data);*/ // Display the data in the console 
              
            
          document.querySelector(".location").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
          document.querySelector(".condition").innerHTML = data.weather[0].main;
          document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
          document.querySelector(".wind").innerHTML = data.wind.speed+" km/h";

          if(data.weather[0].main =="Clear") { // Display the weather icon based on the weather condition
            weatherIcon.src = "images/clear.png";
          } 
          else if(data.weather[0].main =="Clouds") {
            weatherIcon.src = "images/clouds.png";
          }
          else if(data.weather[0].main =="Rain") {
            weatherIcon.src = "images/rain.png";
          }
          else if(data.weather[0].main =="Drizzle") {
            weatherIcon.src = "images/drizzle.png";
          }
          else if(data.weather[0].main =="Mist") {
            weatherIcon.src = "images/mist.png";
          }
          else if(data.weather[0].main =="Snow") {
            weatherIcon.src = "images/snow.png";
          }
              
        
          document.querySelector(".condition").style.fontSize = "27px";
          document.querySelector(".location-box").style.display = "block";
          document.querySelector(".more-info").style.display = "flex";
        }

}

searchBtn.addEventListener("click", () => { // Event listener for the search button
  if(searchBar.value.trim() === "") {
    searchBar.reportValidity(); // Show the browser's built-in required message
  } 
  else {
    checkWeather(searchBar.value); // Call the function if input is not empty
  }
})

document.addEventListener('keydown', (event) => { // Event listener for the Enter key
  if(event.key === 'Enter') {
    if(searchBar.value.trim() === "") {
      searchBar.reportValidity(); // Show the browser's built-in required message
    } 
    else {
      checkWeather(searchBar.value); // Call the function if input is not empty
    }
  }
})

