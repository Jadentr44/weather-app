

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
  console.log(`lat(${data[0].lat}) and lon(${data[0].lon})`)
}).catch(function() {
  console.log("error");
});

})