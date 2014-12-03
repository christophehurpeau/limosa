include node_modules/springbokjs-library/tasks.mk

install:
	npm install
	gulp springbokjs-shim

update:
	npm prune
	npm update
	gulp springbokjs-shim

tests:
	npm test
