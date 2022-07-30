

//function to get geo location
$('#searchBtn').on('click',function(){

  let geoSearchAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${$('#input').val()}&limit=1&appid=9f866a68e0422889c1291ae7065748b3`
let lat;
let lon;

fetch(geoSearchAPI)
.then(response => response.json())
.then(data=>{
  lat = data[0].lat
  lon = data[0].lon
  $('#location').text(data[0].name)
  let weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=3eafd41a5ac2edac126aa9adf492b047`

  fetch(weatherApi)
  .then(response => response.json())
  .then(data=>{
    console.log(data)
    displayInfo(data)
  }).catch(function(error){
    console.log(error)
  })
}).catch(function() {
  console.log("error");
});

})



function displayInfo(data){
  let currentDay =data.daily[0]
  let currentDate = new Date()
  $('#day').text(`(${currentDate.getMonth()}/${currentDate.getDate()})`)
  $('#temp').text(`temp:${data.current.temp}`)
  $('#wind').text(`wind:${data.current.wind_speed}`)
  $('#humidity').text(`humidity${data.current.humidity}`)

  let fiveDay = [data.daily[0],data.daily[1],data.daily[2],data.daily[3],data.daily[4]]
  console.log(fiveDay)
  fiveDay.forEach(e=>{
    let card = $('<div>')
    card.addClass('card col-2')

    let cardBody = $('<div>')
    cardBody.addClass('card-body')

    card.append(cardBody)
    $('.card-deck').append(card)
  })
}