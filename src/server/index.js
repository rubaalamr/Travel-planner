const projectData = {};

const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(1500, function () {
    console.log('Example app listening on port 1500!')
})
/*
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/url', function (req, res){
  textapi.sentiment({
    url: req.body.text
  }, function(error, response) {
    if (error) {
      return;
    }
    res.send(response)
  });
})
*/
//GET
app.get('/all', (req, res) =>{
  res.send(projectData);
  //projectData = {};
});

// POST
app.post('/geonames', (req, res) =>{
  projectData.lat = req.body.lat,
  projectData.lng = req.body.lng,
  projectData.countryName = req.body.countryName;

  res.send(projectData);
  });
