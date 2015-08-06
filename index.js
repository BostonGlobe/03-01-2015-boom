// read JSON provided
var fs = require('graceful-fs');
var shelljs  = require('shelljs');
var sizeOf = require('image-size');

var file = fs.readFileSync('data/data.json', {encoding: 'utf8'});

var json = JSON.parse(file);



// make script to download maps
fs.writeFileSync('data/downloadMaps.sh', json.filter(function(v) {

	return v.Longitude && v.Longitude.length && v.Latitude && v.Latitude.length;

}).map(function(v) {

	var lonlat = [v.Longitude, v.Latitude].join(',');

	var url = 'http://api.tiles.mapbox.com/v4/gabriel-florit.e222ba6f/pin-l-commercial+464646(' + lonlat + ')/' + lonlat + ',14/300x185.png?access_token=pk.eyJ1IjoiZ2FicmllbC1mbG9yaXQiLCJhIjoiVldqX21RVSJ9.Udl7GDHMsMh8EcMpxIr2gA';
	var filename = 'locatormap_' + v.line_number + '.png';
	var command = 'curl "' + url + '" > data/locatormap_' + v.line_number + '.png;';

	return command;

}).join('\n'));



function hasImage(v) {

	return v.image && v.image.length;
}



// make script to download photos
fs.writeFileSync('data/downloadPhotos.sh', json.filter(hasImage).map(function(v){

	var command = 'curl "' + v.image + '" --globoff > data/image_' + v.line_number + '.png;';
	return command;

}).join('\n'));
