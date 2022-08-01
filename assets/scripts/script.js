// adding the list when the page is loaded
updateList()

//function to get geo location
$('#searchBtn').on('click',function(){
  //the url that will be pulled based of the users search
  let geoSearchAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${$('#input').val()}&limit=1&appid=9f866a68e0422889c1291ae7065748b3`
  //setting varables for searching the weather
let lat;
let lon;

fetch(geoSearchAPI)
.then(response => response.json())
.then(data=>{
  //assigning our variables
  lat = data[0].lat
  lon = data[0].lon
  //updating the text for location
  $('#location').text(data[0].name)
  //making the url to get the weather based on the lat and lon we searched for
  let weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=3eafd41a5ac2edac126aa9adf492b047`

  //fetching the weather
  fetch(weatherApi)
  .then(response => response.json())
  .then(data=>{
    //running the function to show all of the info we got for the weather
    displayInfo(data)
    //updating the list of searches if they went through
    updateList($('#input').val())
    $('#input').val("")
  }).catch(function(error){
    //letting the user know something went wrong
    alert("invalid input")
  })
}).catch(function() {
  alert("invalid input");
});

})



function displayInfo(data){
  //getting todays weather and day
  let currentDay =data.daily[0]
  let currentDate = new Date()
  //setting the date for today in the html
  $('#day').text(`(${currentDate.getMonth()}/${currentDate.getDate()})`)
  //setting all of the weather info for today 
  $('#temp').text(`temp:${data.current.temp}`)
  $('#wind').text(`wind:${data.current.wind_speed}`)
  $('#humidity').text(`humidity${data.current.humidity}`)

  // getting the next 5 days weather in an array
  let fiveDay = [data.daily[1],data.daily[2],data.daily[3],data.daily[4],data.daily[5]]

  //clearing the weather cards, if there were previous ones
  $('.card-deck').html("")

  //looping through each of our weather days
  fiveDay.forEach(e=>{
    //creating a card to hold them
    let card = $('<div>')
    card.addClass('card col-2')

    //giving the card a body
    let cardBody = $('<div>')
    cardBody.addClass('card-body')

    //giving the card a date and the weather
    let date = new Date(e.dt*1000)
    let cardContent = `<p>${date.getMonth()}/${date.getDate()}</p>
    <img src="https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" alt="weather image">
    <p>temp:${e.temp.day}</p>
    <p>wind:${e.wind_speed}</p>
    <p>humidity:${e.humidity}</p>`

    //putting the info into the card
    cardBody.html(cardContent)
    card.append(cardBody)
    //putting the card on the html
    $('.card-deck').append(card)
  })
}



function updateList(search){
  //clearing the list each time it is ran
  $('.list-group').text("")

  //pulling the list from the local storage
  let weatherHistory = JSON.parse(localStorage.getItem("weatherH"))
  //if there is no list, create a new empty array
  if(weatherHistory == null){
    weatherHistory = []
  }
  
  //if we actually got a result, and its not a repeat, add the search to the list
  if(search != null && !(weatherHistory.includes(search))){
    weatherHistory.push(search)
  }

  //loop through the array and create a new list item
  weatherHistory.forEach(e=>{
    let listContainer = $('<li>')
    listContainer.addClass("list-group-item")
    listContainer.text(e)

    $('.list-group').append(listContainer)
  })

  //push the new list to the local storage
  localStorage.setItem("weatherH",JSON.stringify(weatherHistory))
}