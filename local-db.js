var localDB = {
	DB_KEY: "localDB",
	OBJECT_STORE_KEY: "objectStore",
	
	initialize: function initialize() {
		var self = this,
			deferred = Q.defer(),
			request = indexedDB.open("localDB");

		request.onupgradeneeded = function () {
			request.result.createObjectStore(self.OBJECT_STORE_KEY);
		};
		
		request.onsuccess = function () {
			self._db = request.result;
			deferred.resolve();
		};
		
		request.onerror = function (e) {
			deferred.reject(e);
		};
		
		return deferred.promise;
	},
	
	getItem: function getItem(key) {
		return this._wrapRequestInPromise(this._getObjectStore("readonly").get(key));
	},
	
	setItem: function setItem(key, value) {
		return this._wrapRequestInPromise(this._getObjectStore("readwrite").put(value, key));
	},
	
	removeItem: function removeItem(key) {
		return this._wrapRequestInPromise(this._getObjectStore("readwrite").delete(key));
	},
	
	_wrapRequestInPromise: function(request) {
		var deferred = Q.defer();
			
		request.onsuccess = function () {
			deferred.resolve(request.result);
		};
		
		request.onerror = function (e) {
			deferred.reject(e);
		};
		
		return deferred.promise;
	},
	
	_getObjectStore: function getObjectStore(mode) {
		return this._db.transaction([this.OBJECT_STORE_KEY], mode).objectStore(this.OBJECT_STORE_KEY);
	}
};