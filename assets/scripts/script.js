updateList()

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
    updateList($('#input').val())
    $('#input').val("")
  }).catch(function(error){
    alert("invalid input")
  })
}).catch(function() {
  alert("invalid input");
});

})



function displayInfo(data){
  let currentDay =data.daily[0]
  let currentDate = new Date()
  $('#day').text(`(${currentDate.getMonth()}/${currentDate.getDate()})`)
  $('#temp').text(`temp:${data.current.temp}`)
  $('#wind').text(`wind:${data.current.wind_speed}`)
  $('#humidity').text(`humidity${data.current.humidity}`)

  let fiveDay = [data.daily[1],data.daily[2],data.daily[3],data.daily[4],data.daily[5]]
  console.log(fiveDay)
  $('.card-deck').html("")
  fiveDay.forEach(e=>{
    let card = $('<div>')
    card.addClass('card col-2')

    let cardBody = $('<div>')
    cardBody.addClass('card-body')

    let date = new Date(e.dt*1000)
    let cardContent = `<p>${date.getMonth()}/${date.getDate()}</p>
    <img src="http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" alt="weather image">
    <p>temp:${e.temp.day}</p>
    <p>wind:${e.wind_speed}</p>
    <p>humidity:${e.humidity}</p>`

    cardBody.html(cardContent)
    card.append(cardBody)
    $('.card-deck').append(card)
  })
}



function updateList(search){
  console.log(search)
  $('.list-group').text("")
  let weatherHistory = JSON.parse(localStorage.getItem("weatherH"))
  if(weatherHistory == null){
    weatherHistory = []
  }
  
  if(search != null && !(weatherHistory.includes(search))){
    weatherHistory.push(search)
  }
  console.log("wd", weatherHistory)
  weatherHistory.forEach(e=>{
    let listContainer = $('<li>')
    listContainer.addClass("list-group-item")
    listContainer.text(e)

    $('.list-group').append(listContainer)
  })
  localStorage.setItem("weatherH",JSON.stringify(weatherHistory))

}