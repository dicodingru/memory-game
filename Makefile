install:
	npm install

build:
	npm run build

publish:
	rm -f ./bundle.js
	npm publish

test:
	npm test -s

lint:
	npm run eslint .
