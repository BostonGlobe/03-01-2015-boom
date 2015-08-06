R:

	Rscript -e "rmarkdown::render('data/03-01-2015-boom.Rmd')"
	open data/03-01-2015-boom.html

R_deploy:

	cp data/03-01-2015-boom.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/03-01-2015-boom_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/03-01-2015-boom.html

all: prepareSpreadsheet downloadMaps downloadPhotos extractDimensions

prepareSpreadsheet:

	csvcut data.csv -l -c Status,Name,Neighborhood,Cost,"Square feet",Longitude,Latitude,image,comment,storylink | csvjson -i 4 > data/data.json
	node index.js;

downloadPhotos:

	sh ./data/downloadPhotos.sh;

downloadMaps:

	sh ./data/downloadMaps.sh;

extractDimensions:

	sh ./data/makeDimensions.sh > ./data/dimensions.csv;

uploadMaps:

	rsync -rv ./data/locatormap_* /Volumes/www_html/multimedia/graphics/projectFiles/2015/01skyline/img;
