(function(){
  /* 
  TODO: 
  1. Find a better way of representing errors
  2. Add single user authentication


  */

  if((!window.localStorage) || (!window.sessionStorage)){
    // If Storage is not implemented in the browser nofity user
    throw Error("Your browser is too old!");
    return;
  }

  var Record = function(properties){
    if(!(properties instanceof Object)){
      // TODO: Find a better way of representing this error
      throw Error("Expecting an object.");
      return;
    }

    // Setting record properties
    this.name = properties.name;
    this.data = properties.data;
    this.$db = properties.db;
  };

  Record.prototype = {
    toString:function(){
      // If it's a string just return the string value, otherwise JSON.stringify
      if(String.prototype.isPrototypeOf(this.data) || typeof this.data === "string"){
        return this.data.toString();
      }else{
        return JSON.stringify(this.data);
      }
    },
    save: function(){
      this.$db.set(this.name, this.data);
    },
    delete:function(){
        this.$db.delete(this.name);
    }
  };

  // Instantiate library
  window.Db = function(mode){
    // Instantiates $storage to localStorage if mode is true 
    // And to sessionStorage if mode is false
    if(mode){
      this.$storage = window.localStorage;
      this.mode = "localStorage";
    }else{
      this.$storage = window.sessionStorage;
      this.mode = "sessionStorage";
    }
  };

  // Defind methods and properties of library
  window.Db.prototype = {

    // Gets the size of Storage
    length: function(){
      return this.$storage.length;
    },

    // Determines whether a value is valid JSON
    isJSON: function(value){
      try{
        var x = JSON.parse(value);
        return x ;
      }catch(e){
        return false;
      }
    },

    // Fetches a record stored in Storage by its name
    find: function(record){
      var value = this.$storage.getItem(record);
      if(value === null || value === undefined || value === NaN){
        return null;
      }else{
        return new Record({
          db: this,
          name:record,
          data:this.isJSON(value) || value
        });
      }
    },

    // Fetches all records in Storage
    findAll: function(){
      var all = [];
      for (var x in this.$storage){
        all.push(this.find(x));
      }
      return all;
    },

    // Fetches a record stored in Storage by its index
    findAt: function(index){
      return this.$storage.key(index);
    },

    // Inserts a record into Storage
    set: function(record, value){
      if(value instanceof Object && typeof value !== "string"){
        value = JSON.stringify(value);
      }
      this.$storage.setItem(record, value);
    },

    // Deletes a record from Storage by its name
    delete: function(record){
      this.$storage.removeItem(record);
    },

    // Clears all records in Storage
    deleteAll: function(){
      this.$storage.clear();
    },

    // Deletes a record from Storage by its index
    deleteAt:function(key){
      this.$storage.removeItem(this.$storage.key(key));
    },

    // Logs a record to the console for debugging purposes
    log: function(record){
      console.log(this.find(record).toString());
    }

  };

})();