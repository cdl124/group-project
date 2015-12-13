
// MAP DISPLAY ***********************
var map;
var infowindow;
function initMap() {
  var CodeFellows = {lat: 47.6235481, lng: -122.33621199999999};
  map = new google.maps.Map(document.getElementById('map'), {
    center: CodeFellows,
    zoom: 16
  });
  var marker=new google.maps.Marker({
    position:CodeFellows,
    icon:'images/cf.png'
  });

  marker.setMap(map);
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: CodeFellows,
    radius: 500,
    types: ['restaurant', 'cafe','bakery', 'meal_takeaway', 'food', 'point_of_interest','bar'],
    openNow: true,
    // Can add maxPrice: 1,2,3,etc. via the 'submit' event listener?
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i]);
      // TODO: use the results information to populate form
    }
  }
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
