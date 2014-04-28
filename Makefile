install:
	npm install

update:
	npm prune
	npm update

clean:
	rm -Rf lib/*

watch:
	gulp watch

build:
	gulp build

tests:
	npm test