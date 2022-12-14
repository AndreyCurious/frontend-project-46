install:
	npm ci
lint: 
	npx eslint .
test: 
	node bin/gendiff.js
test-coverage: 
	npm test -- --coverage --coverageProvider=v8