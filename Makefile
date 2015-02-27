R:

	Rscript -e "rmarkdown::render('data/03-01-2015-boom.Rmd')"
	open data/03-01-2015-boom.html

R_deploy:

	cp data/03-01-2015-boom.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/03-01-2015-boom_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/03-01-2015-boom.html

prepare:

	csvcut "${file}" -c Name,Neighborhood,Cost,"Square feet",Longitude,Latitude,image,comment,storylink | csvjson > data/data.json

download:

	curl http://www.feldcodevelopment.com/wp-content/uploads/2011/03/TremontCrossing-3.jpg > images/TremontCrossing-3.jpg;
	curl http://www.bdg1.com/imgs/portfolio-current/merano.jpg > images/merano.jpg;
	curl http://samuelsre.com/sites/samuelsre.com/files/styles/tall_property_image__600x700/public/properties/property-images/Point%20rendreing-v04.jpg?itok=fXipRieY > images/Point%20rendreing-v04.jpg;
	curl http://www.trinityfinancial.com/images/onecanalstreet.jpg > images/onecanalstreet.jpg;
	curl http://www.longwoodcenter.com/images/frame.png > images/frame.png;
	curl http://www.bu.edu/law/building/images/atriumentrance.jpg > images/atriumentrance.jpg;
	curl http://content-rb.related.com/SiteCollectionImages/Related%20Beal/CUT%20SHEETS/Lovejoy%20Wharf/Main.jpg > images/Main.jpg;