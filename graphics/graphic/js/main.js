var master = $('.igraphic-graphic.graphic');
var Masonry = require('masonry');
var imagesLoaded = require('imagesloaded');

// debugger;

function toNumber(s) {

	var result = s && s.length ?
		+(s.replace(/\$/g, '').replace(/,/g, '')) :
		null;

	return result;
}

var data = _.chain(require('../../../data/data.json'))
	.map(function(v, i) {
		v.Cost = toNumber(v.Cost);
		v['Square feet'] = toNumber(v['Square feet']);

		if (v.Longitude && v.Longitude.length && v.Latitude && v.Latitude.length) {
			v.mapUrl = '../../locator.png';
			// v.mapUrl = 'http://api.tiles.mapbox.com/v4/' + 'gabriel-florit.e222ba6f' + '/pin-l-commercial+482(' + v.Longitude + ',' + v.Latitude + ')/' + v.Longitude + ',' + v.Latitude + ',15/500x300.png?access_token=pk.eyJ1IjoiZ2FicmllbC1mbG9yaXQiLCJhIjoiVldqX21RVSJ9.Udl7GDHMsMh8EcMpxIr2gA';
		}

		return v;
	})
	.sortBy('Square feet')
	.reverse()
	.value();

function log(data) {
	console.log(JSON.stringify(data, null, 4));
}

log(data);



$('.buildings', master)
	.html(_.templates.buildings({
		buildings: data
	}))
	.imagesLoaded(function() {
		
		var msnry = new Masonry(document.querySelector('.igraphic-graphic.graphic .buildings'), {
			itemSelector: '.building',
			columnWidth: '.sizer',
			gutter: '.gutter'
		});
	});