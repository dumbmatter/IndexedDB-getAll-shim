// http://stackoverflow.com/a/33268326/786644 - works in browser, worker, and Node.js
var globalVar = typeof window !== 'undefined' ? window : 
   typeof WorkerGlobalScope !== 'undefined' ? self :
   typeof global !== 'undefined' ? global :
   Function('return this;')();

(function (window) {
    "use strict";

    var Event, IDBIndex, IDBObjectStore, IDBRequest, getAll, getAllFactory, getAllKeys;

    IDBObjectStore = window.IDBObjectStore || window.webkitIDBObjectStore || window.mozIDBObjectStore || window.msIDBObjectStore;
    IDBIndex = window.IDBIndex || window.webkitIDBIndex || window.mozIDBIndex || window.msIDBIndex;

    if (typeof IDBObjectStore === "undefined" || typeof IDBIndex === "undefined") {
        return;
    }

    var override = false;

    // Safari 10.1 has getAll but inside a Worker it crashes https://bugs.webkit.org/show_bug.cgi?id=172434
    if (typeof WorkerGlobalScope !== "undefined" && (navigator.userAgent.indexOf("Safari/602") >= 0 || navigator.userAgent.indexOf("Safari/603") >= 0)) {
        override = true;
    }

    if (!override && (IDBObjectStore.prototype.getAll !== undefined && IDBIndex.prototype.getAll !== undefined && IDBObjectStore.prototype.getAllKeys !== undefined && IDBIndex.prototype.getAllKeys !== undefined)) {
        return;
    }

    // IDBRequest and Event objects mostly from https://github.com/dumbmatter/fakeIndexedDB
    IDBRequest = function () {
        this.result = null;
        this.error = null;
        this.source = null;
        this.transaction = null;
        this.readyState = 'pending';
        this.onsuccess = null;
        this.onerror = null;

        this.toString = function () {
            return '[object IDBRequest]';
        };
    };
    Event = function (type) {
        this.type = type;
        this.target = null;
        this.currentTarget = null;

        this.NONE = 0;
        this.CAPTURING_PHASE = 1;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
        this.eventPhase = this.NONE;

        this.stopPropagation = function () {
            console.log('stopPropagation not implemented in IndexedDB-getAll-shim');
        };
        this.stopImmediatePropagation = function () {
            console.log('stopImmediatePropagation not implemented in IndexedDB-getAll-shim');
        };

        this.bubbles = false;
        this.cancelable = false;
        this.preventDefault = function () {
            console.log('preventDefault not implemented in IndexedDB-getAll-shim');
        };
        this.defaultPrevented = false;

        this.isTrusted = false;
        this.timestamp = Date.now();
    };

    // Based on spec draft https://w3c.github.io/IndexedDB/#dom-idbobjectstore-getall
    getAllFactory = function (type) {
        return function (key, count) {
            var request, result;

            key = key !== undefined ? key : null;

            request = new IDBRequest();
            result = [];

            // this is either an IDBObjectStore or an IDBIndex, depending on the context.
            var cursorRequest = this.openCursor(key);

            cursorRequest.onsuccess = function (event) {
                var cursor, e;

                cursor = event.target.result;
                if (cursor) {
                    result.push(cursor[type]);
                    if (count === undefined || result.length < count) {
                        cursor.continue();
                        return;
                    }
                }

                if (typeof request.onsuccess === "function") {
                    e = new Event("success");
                    e.target = {
                        readyState: "done",
                        result: result
                    };
                    request.result = result;
                    request.onsuccess(e);
                }
            };

            cursorRequest.onerror = function (event) {
                console.log('IndexedDB-getAll-shim error when getting data:', event.target.error);
                request.onerror(event);
            };

            return request;
        };
    };

    getAll = getAllFactory('value');
    getAllKeys = getAllFactory('key');

    if (override || IDBObjectStore.prototype.getAll === undefined) {
        IDBObjectStore.prototype.getAll = getAll;
    }

    if (override || IDBIndex.prototype.getAll === undefined) {
        IDBIndex.prototype.getAll = getAll;
    }

    if (override || IDBObjectStore.prototype.getAllKeys === undefined) {
        IDBObjectStore.prototype.getAllKeys = getAllKeys;
    }

    if (override || IDBIndex.prototype.getAllKeys === undefined) {
        IDBIndex.prototype.getAllKeys = getAllKeys;
    }
}(globalVar));
