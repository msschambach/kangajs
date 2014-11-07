BaseJS
======

A light wrapper for the HTML5 DOM Storage.

## Features

* Interfaces with the HTML5 DOM localStorage and sessionStorage objects
* Supports storage of Objects and Arrays
* Is library agnostic, meaning it can work with all the big JavaScript client side frameworks
* Light weight and easy to use

## Installation and Usage

Just download from this page or clone this repository.

After downloading you can include it in your page as shown below: 

```js
<script type="text/javascript" src="base.js"></script>
```

To use the library is simple, just initiate a new BaseJS object and you're good to go.

```js
<script type="text/javascript">
  $db = new Base(); // Will use sessionStorage

  $db2 = new Base(true); // Will use localStorage

  $db.set('user',{name:'James Bond', email:'bond007@live.com', bio:'I spy for a living.'});

  $db.log('user'); // {"name":"James Bond","email":"bond007@live.com","bio":"I spy for a living."} 
</script>
```

## API 

### Constructor

A new BaseJS instance can be instantiated as shown below:

```js
$db = new Base(); 
```

The constructor accepts one optional boolean paremeter which if set to ```true```
will instantiate an instance that maps to the localStorage object and if ignored 
or set to ```false``` it will instantiate an instance mapping to the sessionStorage
object. 

### .find(key)

This returns the record identified by ```key```. It returns a ```Record``` Object, which 
will be shown a bit later. Analogous to ```Storage.getItem()```. 

### .findAll()

Returns all records in storage as an array of ```Record``` objects.

### .findAt(index)

Returns the record at ```index``` in storage. Analogous to ```Storage.key()```. 

### .indexOf(key)

Returns the index of a key in storage. 

### .set(key, value)

Sets a key to a given value in storage. Analogous to ```Storage.setItem()```. 

### .delete(key)

Removes a key from storage. Analogous to ```Storage.removeItem```. 

### .deleteAll()

Removes all keys from the storage. Analogous to ```Storage.clear()```. 

### .deleteAt(index)

Removes a key at ```index``` in storage. 

### .log(key)

Logs the value of ```key``` to the console. 

### .mode

The current operation mode, i.e. whether data is being stored in localStorage or sessionStorage. 


### Record 

```.find()``` ```.findAll()``` and ```.findAt()``` all return either a single or an array of ```Record``` objects. 

These objects have the following API

#### .toString()

Produces a string value of the ```data```. 

#### .save()

Saves and updates the record in storage. 

#### .delete()

Deletes or removes the record from storage.

#### .data

The value of the record. 

#### .name

The name of the record. Corresponds to the key of the record. 

#### .$db 

A reference to the BaseJS object that created it.

Copyright 2014 Schambach Milimu <msshambach@hotmail.com>
_Refer to LICENSE_
