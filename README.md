# Pebble Geo Counter
Use your pebble to fetch data from various sources on 
how many geotagged photos that have been taken within
a 5 meter radius of your current location.

## Available Sources
### Flickr
The flickr API documentation states that it will only 
fetch information about geotagged photos taken within
the last 12 hours. However, after testing the app I
have found that it is probably incorrect and uses a 
much longer timespan.