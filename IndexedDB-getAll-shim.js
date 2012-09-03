(function () {
	"use strict";

	var Event, IDBIndex, IDBObjectStore, IDBRequest;

	IDBObjectStore = window.IDBObjectStore || window.webkitIDBObjectStore || window.mozIDBObjectStore || window.msIDBObjectStore;
	IDBIndex = window.IDBIndex || window.webkitIDBIndex || window.mozIDBIndex || window.msIDBIndex;

	// https://github.com/axemclion/IndexedDBShim/blob/gh-pages/src/IDBRequest.js
	IDBRequest = function () {
	    this.onsuccess = null;
	    this.readyState = "pending";
	};
	// https://github.com/axemclion/IndexedDBShim/blob/gh-pages/src/Event.js
	Event = function (type, debug) {
		return {
			"type": type,
			debug: debug,
			bubbles: false,
			cancelable: false,
			eventPhase: 0,
			timeStamp: new Date()
		};
	};

	if (typeof IDBObjectStore.prototype.getAll === "undefined") {
		IDBObjectStore.prototype.getAll = function (key) {
			var objectStore, request, result;

			key = typeof key !== "undefined" ? key : null;

			request = new IDBRequest();
			objectStore = this;
			result = [];

			objectStore.openCursor(key).onsuccess = function (event) {
				var cursor, e, target;

				cursor = event.target.result;
				if (cursor) {
					result.push(cursor.value);
					cursor.continue();
				} else {
					if (typeof request.onsuccess === "function") {
						e = new Event("success");
						e.target = {
							readyState: "done",
							result: result
						};
						request.onsuccess(e);
					}
				}
			};

			return request;
		};
	}

	if (typeof IDBIndex.prototype.getAll === "undefined") {
		IDBIndex.prototype.getAll = function (key) {
			var index, request, result;

			key = typeof key !== "undefined" ? key : null;

			request = new IDBRequest();
			index = this;
			result = [];

			index.openCursor(key).onsuccess = function (event) {
				var cursor, e, target;

				cursor = event.target.result;
				if (cursor) {
					result.push(cursor.value);
					cursor.continue();
				} else {
					if (typeof request.onsuccess === "function") {
						e = new Event("success");
						e.target = {
							readyState: "done",
							result: result
						};
						request.onsuccess(e);
					}
				}
			};

			return request;
		};
	}
}());