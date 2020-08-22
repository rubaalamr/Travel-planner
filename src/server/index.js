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
app.listen(5020, thePort);
  function thePort() {
    console.log('Example app listening on port 5020!')
};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


//GET
app.get('/all', (req, res) =>{
  res.send(projectData);
  //projectData = {};
});

// POST APIs
app.post('/geonames', (req, res) =>{
  projectData.departure = req.body.departure;
  projectData.returnDate = req.body.returnDate;
  projectData.lat = req.body.lat;
  projectData.lng = req.body.lng;
  projectData.countryName = req.body.countryName;

  res.send(projectData);
  });

  app.post('/weather', (req, res) =>{
    projectData.hight = req.body.hight;
    projectData.low = req.body.low;
    projectData.description = req.body.description;
    projectData.icon = req.body.icon;

    res.send(projectData);
    });

    app.post('/pix', (req, res) =>{
      projectData.pic = req.body.pic;

      res.send(projectData);
      });

      module.exports = app
