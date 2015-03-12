include node_modules/springbokjs-library/tasks.mk

install:
	npm install

update:
	npm prune
	npm update

tests:
	npm test
