(function(){
  /*
  TODO:
  1. Find a better way of representing errors
  2. Add single user authentication
  3. Find away to implement protection of properties of objects

  */

  /*Checking to see if local storage has been implemented in the browser*/
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

    Object.defineProperty(this,"name",{
      value:properties.name
    });

    Object.defineProperty(this,"data",{
      value:properties.data
    });

    Object.defineProperty(this,"$db",{
      value:properties.db
    });

    Object.defineProperty(this,"toString",{
      value:function () {
        // If it's a string just return the string value, otherwise JSON.stringify
        if(String.prototype.isPrototypeOf(this.data) || typeof this.data === "string"){
          return this.data.toString();
        }else{
          return JSON.stringify(this.data);
        }
      }
    });


    Object.defineProperty(this,"save",{
      value:function () {
        this.$db.set(this.name, this.data);
      }
    });


    Object.defineProperty(this,"delete",{
      value:function () {
        this.$db.delete(this.name);
      }
    });
  };

  Record.prototype.constructor = Record;

  // Instantiate library
  var Base = function(mode){
    // Instantiates $storage to localStorage if mode is true
    // And to sessionStorage if mode is false
    if(mode){
      Object.defineProperty(this,"$storage",{
        value:window.localStorage
      });

      Object.defineProperty(this,"mode",{
        value:"localStorage"
      });

    }else{
      Object.defineProperty(this,"$storage",{
        value:window.sessionStorage
      });

      Object.defineProperty(this,"mode",{
        value:"sessionStorage"
      });

    }

    // Gets the size of Storage
    Object.defineProperty(this,"length",{
      value:function(){
        return this.$storage.length;
      }
    });

    // Determines whether a value is valid JSON
    Object.defineProperty(this,"isJSON",{
      value:function(value){
        try{
          var x = JSON.parse(value);
          return x ;
        }catch(e){
          return false;
        }
      }
    });


    // Fetches a record stored in Storage by its name
    Object.defineProperty(this,"find",{
      value:function(key){
        var value = this.$storage.getItem(key);
        if(value === null || value === undefined || value === NaN){
          return null;
        }else{
          return new Record({
            db: this,
            name:key,
            data:this.isJSON(value) || value
          });
        }
      }
    });


    // Fetches all records in Storage
    Object.defineProperty(this,"findAll",{
      value:function(){
        var all = [];
        for (var x in this.$storage){
          all.push(this.find(x));
        }
        return all;
      }
    });

    // Fetches a record stored in Storage by its index
    Object.defineProperty(this,"findAt",{
      value:function(index, get_value){
        if(get_value){
          // Returns the actual record instead of just the key
          return this.find(this.$storage.key(index));
        }
        // Returns the key
        return this.$storage.key(index);
      }
    });


    // Gets the index of a record
    Object.defineProperty(this,"indexOf",{
      value:function(key){
        // record has to be a string
        if(typeof key === "string" || String.prototype.isPrototypeOf(key)){
            var counter = 0;
            for (var x in this.$storage){
              if(x === key.toString()){
                return counter;
              }else{
                counter++;
              }
            }
        }else{
          throw Error("String expected as argument!");
          return;
        }
      }
    });

    // Inserts a record into Storage
    Object.defineProperty(this,"set",{
      value:function(key, value){
        if(value instanceof Object && typeof value !== "string"){
          value = JSON.stringify(value);
        }
        this.$storage.setItem(key, value);
      }
    });

    // Deletes a record from Storage by its name
    Object.defineProperty(this,"delete",{
      value:function(key){
        this.$storage.removeItem(key);
      }
    });


    // Clears all records in Storage
    Object.defineProperty(this,"deleteAll",{
      value:function(){
        this.$storage.clear();
      }
    });

    // Deletes a record from Storage by its index
    Object.defineProperty(this,"deleteAt",{
      value:function(index){
        this.$storage.removeItem(this.$storage.key(index));
      }
    });

    // Logs a record to the console for debugging purposes
    Object.defineProperty(this,"log",{
      value:function(key){
        console.log(this.find(key).toString());
      }
    });


  };

  window.Base = Base;
  window.Base.prototype.constructor = Base;

})();
