const path = require('path');
const express = require("express");
const utils = require('./utils.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Handle GET requests to /api route
app.get("/location", (req, res) => {

  const latitude = req.query.lat
  const longitude = req.query.long
  const distance = utils.findDistanceBetweenCoordinates(latitude, longitude, "47.594298", "-122.316559");

  for (const coordString in app.locals.locationsData) {
    const coordPair = coordString.split(",")
    console.log(coordPair);
  }

  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  utils.parseScenesTextFile(setScenesData);
  utils.parseLocationsTextFile(setLocationsData);
});

function setScenesData(scenesData) {
  app.locals.scenesData = scenesData
}

function setLocationsData(locationsData) {
  app.locals.locationsData = locationsData
}