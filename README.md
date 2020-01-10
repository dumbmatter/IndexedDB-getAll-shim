# IndexedDB-getAll-shim [![Build Status](https://travis-ci.org/dumbmatter/IndexedDB-getAll-shim.svg?branch=master)](https://travis-ci.org/dumbmatter/IndexedDB-getAll-shim)

A shim/polyfill for supporting `IDBObjectStore.getAll`, `IDBIndex.getAll`, `IDBObjectStore.getAllKeys`, and `IDBIndex.getAllKeys`.

## Browser support

TLDR: As of late 2019, you should probably use this shim if you're using `getAll` or `getAllKeys`, unless you can guarantee all your users are on recent versions of Chrome, Firefox, or Safari.

Details:

**Chrome and Firefox** - `getAll` and `getAllKeys` have been supported for years. This library is not needed unless you're supporting really old versions.

**Edge and IE** - no support for `getAll` or `getAllKeys`, except in the latest Edge beta. You'll find this library useful if you need to support Edge or IE.

**Safari** - has supported `getAll` and `getAllKeys` since version 10.1. However, [there's a really nasty bug in Safari 10.1 where using `getAll` inside a web worker crashes the browser](https://bugs.webkit.org/show_bug.cgi?id=172434). This library works around that bug. I know 10.1 is kind of old these days, but it's still out there, and a hard crash of the browser is really bad.

## Usage

Install it with npm:

    npm install --save indexeddb-getall-shim

or yarn:

    yarn add indexeddb-getall-shim

and include it like this:

    require("indexeddb-getall-shim");

or this:

    import "indexeddb-getall-shim";

Don't you just love all the options of the JavaScript ecosystem? :)

Alternatively, if you don't want to mess around with npm, you can just include IndexedDB-getAll-shim.js on your page. To see an example of how this, look in example.html.

## Unit Tests

    npm test

## Links

* GitHub project: https://github.com/dumbmatter/IndexedDB-getAll-shim

## License

MIT License