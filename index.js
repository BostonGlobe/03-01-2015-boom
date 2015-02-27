// read JSON provided
var fs = require('fs');
var shelljs  = require('shelljs/global');

var file = fs.readFileSync('data/data.json', {encoding: 'utf8'});

var json = JSON.parse(file);
var util = require('./common/js/util.js');

json.filter(function(v) {

	return v.Longitude && v.Longitude.length && v.Latitude && v.Latitude.length;

}).forEach(function(v) {

	var lonlat = [v.Longitude, v.Latitude].join(',');

	var url = 'http://api.tiles.mapbox.com/v4/gabriel-florit.e222ba6f/pin-l-commercial+464646(' + lonlat + ')/' + lonlat + ',14/260x161.png?access_token=pk.eyJ1IjoiZ2FicmllbC1mbG9yaXQiLCJhIjoiVldqX21RVSJ9.Udl7GDHMsMh8EcMpxIr2gA';
	var filename = util.hashifyLonLat(lonlat);
	var command = 'curl "' + url + '" > data/' + filename + '.png;';

	exec(command);

});