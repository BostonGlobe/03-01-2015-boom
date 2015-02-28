// read JSON provided
var fs = require('fs');
var shelljs  = require('shelljs/global');
var sizeOf = require('image-size');

var file = fs.readFileSync('data/data.json', {encoding: 'utf8'});

var json = JSON.parse(file);
var util = require('./common/js/util.js');

json.filter(function(v) {

	return v.Longitude && v.Longitude.length && v.Latitude && v.Latitude.length;

}).forEach(function(v) {

	var lonlat = [v.Longitude, v.Latitude].join(',');

	var url = 'http://api.tiles.mapbox.com/v4/gabriel-florit.e222ba6f/pin-l-commercial+464646(' + lonlat + ')/' + lonlat + ',14/300x185.png?access_token=pk.eyJ1IjoiZ2FicmllbC1mbG9yaXQiLCJhIjoiVldqX21RVSJ9.Udl7GDHMsMh8EcMpxIr2gA';
	var filename = 'locatormap_' + v.line_number + '.png';
	var command = 'curl "' + url + '" > data/locatormap_' + v.line_number + '.png;';

	exec(command);

});

var dimensions = json.filter(function(v) {

	return v.image && v.image.length;

}).map(function(v) {

	var command = 'curl "' + v.image + '" --globoff > data/image_' + v.line_number + '.png;';
	exec(command);

	return v;

}).map(function(v) {

	try {
		var result = sizeOf('data/image_' + v.line_number + '.png');
		result.line_number = v.line_number;

		return result;
	} catch(e) {

		console.log(e);
		console.log(JSON.stringify(v, null, 4));

	}

});

fs.writeFileSync('data/dimensions.json', JSON.stringify(dimensions, null, 4));