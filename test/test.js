var assert = require('assert');
GLOBAL.indexedDB = require('fake-indexeddb');
GLOBAL.IDBIndex = require('fake-indexeddb/lib/FDBIndex');
GLOBAL.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');
GLOBAL.IDBObjectStore = require('fake-indexeddb/lib/FDBObjectStore');
require('../IndexedDB-getAll-shim.js');

var db;

describe('IndexedDB-getAll-shim', function () {
    before(function (done) {
        var request = indexedDB.open('test' + Math.random());
        request.onupgradeneeded = function (e) {
            var db = e.target.result;
            var store = db.createObjectStore('store', {keyPath: 'key'});
            store.createIndex('content', 'content');

            for (var i = 0; i < 10; i++) {
                store.add({key: i, content: 'test' + i});
            }
        };
        request.onsuccess = function (e) {
            db = e.target.result;
            done();
        };
        request.onerror = function (e) {
            done(e.target.error);
        };
    });

    it('should work on object store', function (done) {
        var request = db.transaction('store').objectStore('store').getAll();
        request.onsuccess = function (e) {
            assert.equal(e.target.result.length, 10);
            done();
        }
        request.onerror = function (e) {
            done(e.target.error);
        };
    });

    it('should work on index', function (done) {
        var request = db.transaction('store').objectStore('store').index('content').getAll();
        request.onsuccess = function (e) {
            assert.equal(e.target.result.length, 10);
            done();
        }
        request.onerror = function (e) {
            done(e.target.error);
        };
    });

    it('should work with query parameter', function (done) {
        var request = db.transaction('store').objectStore('store').getAll(IDBKeyRange.bound(2, 5));
        request.onsuccess = function (e) {
            assert.equal(e.target.result.length, 4);
            assert.equal(e.target.result[0].key, 2);
            assert.equal(e.target.result[3].key, 5);
            done();
        }
        request.onerror = function (e) {
            done(e.target.error);
        };
    });

    it('should work with count parameter', function (done) {
        var request = db.transaction('store').objectStore('store').getAll(null, 3);
        request.onsuccess = function (e) {
            assert.equal(e.target.result.length, 3);
            assert.equal(e.target.result[0].key, 0);
            assert.equal(e.target.result[2].key, 2);
            done();
        }
        request.onerror = function (e) {
            done(e.target.error);
        };
    });

    it('should work with query and count parameters', function (done) {
        var request = db.transaction('store').objectStore('store').getAll(IDBKeyRange.lowerBound(6), 3);
        request.onsuccess = function (e) {
            assert.equal(e.target.result.length, 3);
            assert.equal(e.target.result[0].key, 6);
            assert.equal(e.target.result[2].key, 8);
            done();
        }
        request.onerror = function (e) {
            done(e.target.error);
        };
    });
});
