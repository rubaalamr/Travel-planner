/* Global Variables */

//GeoNames API
const geourl='http://api.geonames.org/searchJSON?q=';
const geokey='&username=rubasa';
//Weather API
const weatherurl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherkey = '&key=1f7009716ea04051ae19ce02463422da&lon=';
//pixabay API
const pixurl = 'https://pixabay.com/api/?image_type=photo&q=';
const pixkey = '&key=17981514-d6e4e73ecbe4de8bc0f096c5e';
// Event submit
function performAction(event){
  event.preventDefault()

const destination = document.getElementById('Destination').value;
const departure = document.getElementById('Departure').value;
const returnDate = document.getElementById('Return').value;

getTripDemo(geourl,destination,geokey)
.then(function(data){
// post geonames
return postData('http://localhost:5020/geonames',{departure:departure, returnDate:returnDate, lat:data.geonames["0"].lat,lng:data.geonames["0"].lng,
countryName:data.geonames["0"].countryName})
})
.then((res) => {
  const lat = res.lat;
  const lng = res.lng;
  return {lat , lng};
})
// return to weather API
.then(({lat, lng})=>{
  return getWeatherDemo(weatherurl, lat, weatherkey, lng);
})
// post weather API
.then(function(data){
return postData('http://localhost:5020/weather',{hight:data.data[0].high_temp, low:data.data[0].low_temp,
description:data.data[0].weather.description, icon:data.data[0].weather.icon})
})
.then(() => {
    return getPixabay(pixurl, destination, pixkey);
  })
// Post Pixabay
.then(function(photo){
return postData('http://localhost:5020/pix',{pic:photo.hits[0].webformatURL})
})
.then(function (){
    updateUI();
})
};
// GET GeoNames
const getTripDemo = async (geourl, destination, geokey)=>{
  const res = await fetch(geourl+destination+geokey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

//Get Weather
const getWeatherDemo = async (weatherurl, lat, weatherkey, lng)=>{
  const res = await fetch(weatherurl+lat+weatherkey+lng)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}
// Get pixabay
const getPixabay = async (pixurl, destination, pixkey)=>{
  const res = await fetch(pixurl+destination+pixkey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

// POST All Data
const postData = async ( url = '', data = {})=>{
    console.log(data);

      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// Update UI
const updateUI = async () => {
  const request = await fetch('http://localhost:5020/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('res').innerHTML = `
    <div class="form-group">
      <strong>Trip Result : </strong>
      <div id="resCountry">country : ${allData.countryName}<br>
      Departure Date : ${allData.departure}<br>
      Return Date: ${allData.returnDate}</div>
      <div id="resWeather">High temp : ${allData.hight}<br>
       low temp : ${allData.low}</div>
      <div id="DesIcon">description: ${allData.description} <img src="https://www.weatherbit.io/static/img/icons/${allData.icon}.png"></div>
      <div id="Piximage"><img style="width: 50%;" src="${allData.pic}"></div>
    </div>`;

  }catch(error){
    console.log("error", error);
  }
}

export { performAction }
