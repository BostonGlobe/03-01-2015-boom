var master = $('.igraphic-graphic.graphic');
var Masonry = require('masonry');
var imagesLoaded = require('imagesloaded');

function toNumber(s) {

	var result = s && s.length ?
		+(s.replace(/\$/g, '').replace(/,/g, '')) :
		null;

	return result;
}

var data = _.chain(require('../../../data/data.json'))
	.map(function(v, i) {

		var mapUrl;

		if (v.Longitude && v.Longitude.length && v.Latitude && v.Latitude.length) {
			mapUrl = 'http://api.tiles.mapbox.com/v4/' + 'gabriel-florit.e222ba6f' + '/pin-l-commercial+464646(' + v.Longitude + ',' + v.Latitude + ')/' + v.Longitude + ',' + v.Latitude + ',14/260x161.png?access_token=pk.eyJ1IjoiZ2FicmllbC1mbG9yaXQiLCJhIjoiVldqX21RVSJ9.Udl7GDHMsMh8EcMpxIr2gA';
		}

		return {
			name: v.Name,
			cost: toNumber(v.Cost),
			size: toNumber(v['Square feet']),
			mapUrl: mapUrl,
			image: v.image && v.image.length ? v.image : null,
			comment: v.comment && v.comment.length ? v.comment : null
		};
	})
	.sortBy('size')
	.reverse()
	.value();

// function log(data) {
// 	console.log(JSON.stringify(data, null, 4));
// }

// log(data);



$('.buildings', master)
	.html(_.templates.buildings({
		buildings: data
	}))
	.imagesLoaded(function() {
		
		var msnry = new Masonry(document.querySelector('.igraphic-graphic.graphic .buildings'), {
			itemSelector: '.building',
			isFitWidth: true,
			gutter: 20
		});
	});
