# IndexedDB-getAll-shim

A JavaScript shim/polyfill for supporting Firefox's IDBObjectStore.getAll() in other browsers, such as Chrome.

## Usage

Just include IndexedDB-getAll-shim.js on your page and you're good to go. To see an example of how it works, look in example.html.

## Caveats

This doesn't properly handle all error cases and might not be exactly 100% the same as Firefox's getAll. More tests would be required to ensure that.

## Links

* GitHub project: https://github.com/jdscheff/IndexedDB-getAll-shim

* Main developer: Jeremy Scheff <jdscheff@gmail.com>

## License

MIT License