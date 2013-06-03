# Local DB

Local DB is a wrapper around IndexedDB that drastically simplifies the API to `getItem`, `setItem`, and `removeItem`, making it similar to the `localStorage` API.

Its only dependency is [q.js](https://github.com/kriskowal/q).

## API

- `localDB.initialize()`: Initialize the object and return a `q.promise`. All subsequent calls should be in a resolve handler: `localDB.initialize().done(function () { ... });`
- `setItem(key, value)`: Store the given value and associate it with the given key. Returns a `q.promise` which can be used for success/error handling.
- `getItem(key)`: Retrieve the value associated with the given key. The return value is not the retrieved value, but rather a `q.promise`. The success handler of the `q.promise` will contain the retrieved value: `localDB.getItem("foo").done(function (result) { ... });
- `removeItem(key)`: Remove the value associated with the given key from the object store. Returns a `q.promise` which can be used for success/error handling.