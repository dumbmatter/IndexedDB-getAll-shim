# IndexedDB-getAll-shim

A shim/polyfill for supporting IDBObjectStore.getAll and IDBIndex.getAll. Currently (October 2015) Firefox has getAll built in (prefixed with moz) and Chrome has it in development.

## Usage

Just include IndexedDB-getAll-shim.js on your page and you're good to go. To see an example of how it works, look in example.html.

## Caveats

This doesn't properly handle all error cases and might not be exactly 100% the same as Firefox's getAll. More tests would be required to ensure that.

## Links

* GitHub project: https://github.com/dumbmatter/IndexedDB-getAll-shim

* Main developer: Jeremy Scheff <jdscheff@gmail.com>

## License

MIT License