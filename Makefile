R:

	Rscript -e "rmarkdown::render('data/03-01-2015-boom.Rmd')"
	open data/03-01-2015-boom.html

R_deploy:

	cp data/03-01-2015-boom.html /Volumes/www_html/multimedia/graphics/projectFiles/Rmd/
	rsync -rv data/03-01-2015-boom_files /Volumes/www_html/multimedia/graphics/projectFiles/Rmd
	open http://private.boston.com/multimedia/graphics/projectFiles/Rmd/03-01-2015-boom.html

prepare:

	csvjson ${file} > data/data.json