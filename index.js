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



// make script to make dimensions.json
// we somehow have to gernate a csv or json of width,height,line_number for json datums with hasImage=true



// var dimensions = json.filter(function(v) {


// }).map(function(v) {

// 	console.log(JSON.stringify(command, null, 4));
// 	shelljs.exec(command, function (code, output) {
// 		console.log(JSON.stringify(code, null, 4));
// 		console.log(JSON.stringify(output, null, 4));
// 	});

// 	return v;

// }).map(function(v) {

// 	try {
// 		var result = sizeOf('data/image_' + v.line_number + '.png');
// 		result.line_number = v.line_number;
// 		console.log(JSON.stringify(result, null, 4));

// 		return result;
// 	} catch(e) {

// 		console.log(e);
// 		console.log(JSON.stringify(v, null, 4));

// 	}

// });

// fs.writeFileSync('data/dimensions.json', JSON.stringify(dimensions, null, 4));
