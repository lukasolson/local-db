# LocalDB

LocalDB is a wrapper around IndexedDB that radically simplifies the API to just three methods: `getItem`, `setItem`, and `removeItem`.

In other words, LocalDB makes IndexedDB as easy to use as `localStorage`.

LocalDB has one dependency: [q.js](https://github.com/kriskowal/q).

## Usage
```html
<html>
	<head>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.2/q.min.js"></script>
		<script type="text/javascript" src="local-db.js"></script>
		<script type="text/javascript">
			localDB.initialize().then(function () {
				console.log("successfully initialized");
				localDB.setItem("foo", "bar").then(function () {
					console.log("successfully set item");
					localDB.getItem("foo").then(function (value) {
						console.log("successfully got item", value);
						localDB.removeItem("foo").then(function () {
							console.log("successfully removed item");
						});
					});
				});
			});
			
			// This is essentially equivalent to the above, with less nesting
			localDB.initialize().then(function () {
				console.log("successfully initialized");
				return localDB.setItem("foo", "bar");
			}).then(function () {
				console.log("successfully set item");
				return localDB.getItem("foo");
			}).then(function (value) {
				console.log("successfully got item", value);
				return localDB.removeItem("foo");
			}).then(function () {
				console.log("successfully removed item");
			});
		</script>
	</head>
	<body></body>
</html>
```

Check out the [https://github.com/lukasolson/Local-DB/tree/master/example](example) directory for more examples.

## API

#### `initialize()`
Initialize the object and return a `q.promise`. All subsequent calls should be in a resolve handler: `localDB.initialize().done(function () { ... });`

#### `setItem(key, value)`
Store the given value and associate it with the given key. Returns a `q.promise` which can be used for success/error handling.

#### `getItem(key)`
Retrieve the value associated with the given key. The return value is not the retrieved value, but rather a `q.promise`. The success handler of the `q.promise` will contain the retrieved value: `localDB.getItem("foo").done(function (result) { ... });`

#### `removeItem(key)`
Remove the value associated with the given key from the object store. Returns a `q.promise` which can be used for success/error handling.