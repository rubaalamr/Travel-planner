/* Global Variables */

// Create a new date instance dynamically with JS
//let d = new Date();
//let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//GeoNames API
const geourl='http://api.geonames.org/searchJSON?q=';
const geokey='&username=rubasa';

//document.getElementById('generate').addEventListener('click', performAction);
// Event click
function performAction(event){
  event.preventDefault()

const destination = document.getElementById('Destination').value;

getWeatherDemo(geourl,destination,geokey)
.then(function(data){
postData('/geonames',{lat:data.geonames["0"].lat,lng:data.geonames["0"].lng,
countryName:data.geonames["0"].countryName})

}).then(function (){
    updateUI();
})

};
// GET
const getWeatherDemo = async (geourl, destination, geokey)=>{
  const res = await fetch(geourl+destination+geokey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}
// POST
const postData = async ( url = '', data = {})=>{
    console.log(data);
    //document.getElementById('theUrl').innerHTML = `latittude : ${data.lat}`;

      const response = await fetch('http://localhost:1500/geonames', {
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
  const request = await fetch('http://localhost:1500/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('theUrl').innerHTML = `latittude : ${allData.lat}`;
    /*document.getElementById('temp').innerHTML = `Temperature : ${allData.temp}`;
    document.getElementById('content').innerHTML = `I feel : ${allData.userContent}`;*/

  }catch(error){
    console.log("error", error);
  }
}

export { performAction }
