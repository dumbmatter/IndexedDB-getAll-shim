# IndexedDB-getAll-shim [![Build Status](https://travis-ci.org/dumbmatter/IndexedDB-getAll-shim.svg?branch=master)](https://travis-ci.org/dumbmatter/IndexedDB-getAll-shim)

A shim/polyfill for supporting IDBObjectStore.getAll and IDBIndex.getAll. Currently (February 2016) the latest versions of Firefox and Chrome have getAll built in, but other browsers do not.

## Usage

Just include IndexedDB-getAll-shim.js on your page and you're good to go. To see an example of how it works, look in example.html.

If you're using CommonJS, you can install it through npm:

    npm install indexeddb-getall-shim

and include it like this:

    require('indexeddb-getall-shim');

## Unit Tests

    npm test

## Links

* GitHub project: https://github.com/dumbmatter/IndexedDB-getAll-shim

* Main developer: Jeremy Scheff <jdscheff@gmail.com>

## License

MIT License