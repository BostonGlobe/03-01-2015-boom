# 03-01-2015-boom

This project was generated with [generator-globeproject](https://github.com/BostonGlobe/generator-globeproject). Consult its [README](https://github.com/BostonGlobe/generator-globeproject) for more information.

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## TODO

- write hed and subhed
- fix twitter/facebook icons
- write "last updated by"
- TEST on various browsers

## UPDATING

- Download spreadsheet as csv.
- `make prepare file=<data.csv>`. This will create `data/data.json`.
- `node index.js`. This will create the locator map pngs, and also create `data/dimensions.json`.
- `cp data/locatormap_*.png /Volumes/www_html/multimedia/graphics/projectFiles/2015/01skyline/img`. This will copy locator map pngs to the private server.
- Next, log in to prod and upload the locator map pngs.
- Inspect the spreadsheet to make sure images are in methode, and that they're sized as `460w`.
- If not, save them and upload them in this project's MWB directory. Publish.

## Install

- `npm install`
- `bower install`
- `cd parts; mkdir globe; make setup; cd ..`

## Usage

- `gulp`

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)

