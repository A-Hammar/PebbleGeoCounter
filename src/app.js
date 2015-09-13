/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var mainCard = new UI.Card({
    title: 'Geo Counter',
    body: 'Fetching location..'
  });

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
    mainCard.body('Error fetching Location');
    //errorCard.show();
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
    mainCard.body('flickr: ' + data.photos.total);
    //mainCard.show();
  },
  function(error) {
    // Error callback
    console.log('error: ' + error);
  }

  );
}

function main() {
  //var card = createCard('Fetching...');
  mainCard.show();

  getLocation();
}

main();