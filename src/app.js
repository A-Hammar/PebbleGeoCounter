/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

function createCard(title, subtitle) {
  return new UI.Card({
    title: title,
    subtitle: subtitle
  })
}

/**
* Returns the current device location or undef
* on error.
*/
function getLocation() {
  
  // Location success callback
  function success(pos) {
    var crd = pos.coords;
    return {
      latitude: crd.latitude, 
      longitude: crd.longitude
    };
  }
  
  // Location error callback
  function error(err) {
  }
  
  return navigator.geoLocation.getCurrentPosition(success, error);
}

function main() {
  var card = createCard('Geo Counter','Fetching...');
  card.show();

  var location = getLocation();
  if(location === undefined) {
    var errorCard = new UI.Card({
      title: 'Geo Counter',
      subtitle: 'Error fetching Location'
    });
  } else {
    var URL = 'http://api.flickr.com/services/rest/?&method=';
    
  }
}

main();