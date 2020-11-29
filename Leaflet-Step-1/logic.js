// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// Set and center the map
var myMap = L.map("map", {
    center: [0,0],
    zoom: 2
  });

// Create tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Create a function to turn depth into color
function findColor(depth) {
  if (depth > 500) {
    var color = "green"
  } else if (depth > 200) {
    var color = "blue"
  } else if (depth > 100) {
    var color = "purple"
  } else if (depth > 50) {
    var color = "red"
  } else if (depth > 20) {
    var color = "orange"
  } else {
    var color = "yellow"
  }
  return color
}

// Build overlay
d3.json(queryUrl, function(data) {
  // Build quake points
  for (i in data.features) {
      var quake = data.features[i]
      var location = [quake.geometry.coordinates[1], quake.geometry.coordinates[0]]
      var depth = quake.geometry.coordinates[2]
      var magnitude = quake.properties.mag
      var place = quake.properties.place
      var time = new Date(quake.properties.time)
      L.circle(location, {
          fillOpacity: 0.67,
          color: "black",
          fillColor: findColor(depth),
          weight: 1,
          radius: magnitude * 30000
        }).bindPopup("<h3>Location: " + place + "</h3><h3>Time: " + time + "</h3><h3>Magnitude: " + magnitude + "</h3><h3>Depth: " + depth + "</h3>").addTo(myMap);
  }
  // Build legend


})

