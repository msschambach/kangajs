Kanga JS
======

A light wrapper for the Web Storage API.

## Features

* Interfaces with the DOM localStorage and sessionStorage objects
* Supports storage of Objects and Arrays
* Is library agnostic, meaning it can work with all the big JavaScript client side frameworks
* Light weight and easy to use

## Installation and Usage

Just download from this page or clone this repository.

After downloading you can include it in your page as shown below:

```js
<script type="text/javascript" src="kanga.min.js"></script>
```

To use the library is simple, just initiate a new BrowserStore object and you're good to go.

```js
<script type="text/javascript">
  $store = new Kanga.BrowserStore(); // Will use localStorage

  $store2 = new Kanga.BrowserStore(false); // Will use sessionStorage

  $store.set('user',{name:'James Bond', email:'bond007@live.com', bio:'I spy for a living.'});

  $store.log('user'); // {"name":"James Bond","email":"bond007@live.com","bio":"I spy for a living."}
</script>
```

## API

### Constructor

A new BrowserStore instance can be instantiated as shown below:

```js
$db = new Kanga.BrowserStore()();
```

The constructor accepts one optional boolean paremeter which if set to ```true```
will instantiate an instance that maps to the localStorage object and if ignored
or set to ```false``` it will instantiate an instance mapping to the sessionStorage
object.

### .set(key, value)

Sets a key to a given value in storage. Analogous to ```Storage.setItem()```.
For example:

```js
$store.set('user',{name:'James Bond', email:'bond007@live.com', bio:'I spy for a living.'});

$store.set('visit_count', 4);

$store.set('browser','mozilla');
```

### .find(key)

This returns the record identified by ```key```. It returns a ```Record``` Object, which
will be shown a bit later. Analogous to ```Storage.getItem()```. For example:

```js
var user = $store.find('user'); // Record {name: "user", data: Object, $storage: Storage, toString: function, save: function…}

console.log(user.data.name): // James Bond
```

### .findAll()

Returns all records in storage as an array of ```Record``` objects. For example:

```js
console.log($store.findAll()); // [Record, Record]
```

### .findAt(index,[get_value])

Returns the record at ```index``` in storage. Analogous to ```Storage.key()```.

Has an optional trailing parameter which if set to true will make the function return
the actual value of the key.
For example:

```js
console.log($store.findAt(1)); // visit_count

console.log($store.findAt(1,true)); // 4
```

### .indexOf(key)

Returns the index of a key in storage. For example:

```js
console.log($store.indexOf('visit_count')); // 1
```

### .delete(key)

Removes a key from storage. Analogous to ```Storage.removeItem```. For example:

```js
$store.delete('user');

console.log($store.find('user')); // null
```

### .deleteAll()

Removes all keys from the storage. Analogous to ```Storage.clear()```. For example:

```js
$store.deleteAll();

console.log($store.findAll()); // []
```

### .deleteAt(index)

Removes a key at ```index``` in storage. For example:

```js
$store.deleteAt(0);

console.log($store.findAt(0)); // null
```

### .log(key)

Logs the value of ```key``` to the console. For example:

```js
$store.log('user'); // {"name":"James Bond","email":"bond007@live.com","bio":"I spy for a living."}
```

### .mode

The current operation mode, i.e. whether data is being stored in localStorage or sessionStorage. For example:

```js
console.log($store.mode); // sessionStorage
```


### Record

```.find()``` ```.findAll()``` and ```.findAt()``` all return either a single or an array of ```Record``` objects.

These objects have the following API

#### .toString()

Produces a string value of the ```data```. For example:

```js
var user = $store.find('user');

console.log(user.toString()); // {"name":"James Bond","email":"bond007@live.com","bio":"I spy for a living."}
```

#### .save()

Saves and updates the record in storage. For example:

```js
var user = $store.find('user');

console.log(user.toString()); // {"name":"James Bond","email":"bond007@live.com","bio":"I spy for a living."}

user.data.name = "Jason Statham";
user.data.email = "js@gunsblazing.com";
user.data.bio = "I got moves.";

user.save();

console.log($store.find('user').toString()); // {"name":"Jason Statham","email":"s@gunsblazing.com","bio":"I got moves."}

```

#### .delete()

Deletes or removes the record from storage. For example:

```js
var user = $store.find('user');

console.log(user.toString()); // {"name":"James Bond","email":"bond007@live.com","bio":"I spy for a living."}

user.delete();

console.log($store.find('user').toString()); // null

```

#### .data

The value of the record. Usage is shown in the examples above.

#### .name

The name of the record. Corresponds to the key of the record.

#### .$storage

A reference to the storage being used.

Copyright Schambach Milimu

_Refer to LICENSE_