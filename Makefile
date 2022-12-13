install:
	npm ci
lint: 
	npx eslint .
test: 
	node bin/gendiff.js
test-coverage: 
	npx jest --coverage