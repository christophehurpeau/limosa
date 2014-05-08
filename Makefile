install:
	npm install
	gulp springbokjs-shim

update:
	npm prune
	npm update
	gulp springbokjs-shim

clean:
	rm -Rf lib/*

watch:
	gulp watch

build:
	gulp build

tests:
	npm test