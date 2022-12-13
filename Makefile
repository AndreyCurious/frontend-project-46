install:
	npm ci
lint: 
	npx eslint .
test: 
	node bin/gendiff.js