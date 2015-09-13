/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

function createCard(subtitle) {
  return new UI.Card({
    title: 'Geo Counter',
    subtitle: subtitle
  });
}

/**
* Returns the current device location or undef
* on error.
*/
function getLocation() {
  
  var locationOptions = {
    enableHighAccuracy: true, 
    maximumAge: 10000, 
    timeout: 10000
  };
  
  // Location success callback
  function success(pos) {
    var crd = pos.coords;
    console.log('Got position ' + crd.latitude + ' ' + crd.longitude);
    var position = {
      latitude: crd.latitude, 
      longitude: crd.longitude
    };
    requestImageNumbers(position);
  }
  
  // Location error callback
  function error(err) {
    var errorCard = createCard('Error fetching Location');
    errorCard.show();
  }
  
  navigator.geolocation.getCurrentPosition(success, error, locationOptions);
}

function requestImageNumbers(pos) {
  var URL = 'https://api.flickr.com/services/rest/?';
  var method = '&method=flickr.photos.search';
  var APIKey = '&api_key=10b8f64a25a0d10f7ee2b929bb02aaea';
  var settings = '&per_page=1&format=json&nojsoncallback=?&radius=0.005';
  var data = '&lat=' + pos.latitude + '&lon=' + pos.longitude;
  ajax({
    url: URL + method + APIKey + settings + data,
    type: 'json'
  },
  function(data) {
    // Success Callback
    console.log("Received flickr data: " + data);
    var successCard = createCard('flickr: ' + data.photos.total);
    successCard.show();
  },
  function(error) {
    // Error callback
    console.log('error: ' + error);
  }

  );
}

function main() {
  var card = createCard('Fetching...');
  card.show();

  getLocation();
}

main();