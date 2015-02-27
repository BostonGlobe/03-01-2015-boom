module.exports = {
	
	numberWithCommas: function(x) {
		var parts = x.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	},

	hashifyLonLat: function(lonlat) {

		// assume lonlat is something like "42.3485645,-71.038224"
		return lonlat
			.replace(/\./g, '')
			.replace(/,/g, '')
			.replace(/-/g, '');
	}
	
};