var master = $('.igraphic-graphic.graphic');
var Masonry = require('masonry');
var imagesLoaded = require('imagesloaded');
var util = require('../../../common/js/util.js');

function toNumber(s) {

	var result = s && s.length ?
		+(s.replace(/\$/g, '').replace(/,/g, '')) :
		null;

	return result;
}

var allDimensions = require('../../../data/dimensions.json');

var data = _.chain(require('../../../data/data.json'))
	.map(function(v, i) {

		var mapUrl;

		if (v.Longitude && v.Longitude.length && v.Latitude && v.Latitude.length) {

			lonlat = [v.Longitude, v.Latitude].join(',');
			mapUrl = 'http://cache.boston.com/multimedia/graphics/projectFiles/2015/01skyline/img/locatormap_' + v.line_number + '.png';
		}

		var dimensions = _.find(allDimensions, {line_number: v.line_number});

		return {
			line_number: v.line_number,
			name: v.Name.replace(/'/g, '’'),
			dimensions: dimensions ? dimensions : null,
			neighborhood: v.Neighborhood && v.Neighborhood.length ? v.Neighborhood : null,
			cost: toNumber(v.Cost),
			size: toNumber(v['Square feet']),
			mapUrl: mapUrl,
			image: v.image && v.image.length ? v.image : null,
			comment: v.comment && v.comment.length ? v.comment : null,
			storylink: v.storylink && v.storylink.length ? v.storylink : null
		};
	})
	.sortBy('size')
	.reverse()
	.value();

var msnry;

$('.buildings', master)
	.html(_.templates.buildings({
		buildings: data
	}))
	.imagesLoaded(function() {
		if (msnry) {
			msnry.layout();
		}
	});

msnry = new Masonry(document.querySelector('.igraphic-graphic.graphic .buildings'), {
	itemSelector: '.building',
	isFitWidth: true,
	gutter: 30
});