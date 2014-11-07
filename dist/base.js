(function() {
    if (!window.localStorage || !window.sessionStorage) {
        throw Error("Your browser is too old!");
        return;
    }
    var Record = function(properties) {
        if (!(properties instanceof Object)) {
            throw Error("Expecting an object.");
            return;
        }
        this.name = properties.name;
        this.data = properties.data;
        this.$db = properties.db;
    };
    Record.prototype = {
        toString: function() {
            if (String.prototype.isPrototypeOf(this.data) || typeof this.data === "string") {
                return this.data.toString();
            } else {
                return JSON.stringify(this.data);
            }
        },
        save: function() {
            this.$db.set(this.name, this.data);
        },
        "delete": function() {
            this.$db.delete(this.name);
        }
    };
    Record.prototype.constructor = Record;
    window.Base = function(mode) {
        if (mode) {
            this.$storage = window.localStorage;
            this.mode = "localStorage";
        } else {
            this.$storage = window.sessionStorage;
            this.mode = "sessionStorage";
        }
    };
    window.Base.prototype = {
        length: function() {
            return this.$storage.length;
        },
        isJSON: function(value) {
            try {
                var x = JSON.parse(value);
                return x;
            } catch (e) {
                return false;
            }
        },
        find: function(key) {
            var value = this.$storage.getItem(key);
            if (value === null || value === undefined || value === NaN) {
                return null;
            } else {
                return new Record({
                    db: this,
                    name: key,
                    data: this.isJSON(value) || value
                });
            }
        },
        findAll: function() {
            var all = [];
            for (var x in this.$storage) {
                all.push(this.find(x));
            }
            return all;
        },
        findAt: function(index, get_value) {
            if (get_value) {
                return this.find(this.$storage.key(index));
            }
            return this.$storage.key(index);
        },
        indexOf: function(key) {
            if (typeof key === "string" || String.prototype.isPrototypeOf(key)) {
                var counter = 0;
                for (var x in this.$storage) {
                    if (x === key.toString()) {
                        return counter;
                    } else {
                        counter++;
                    }
                }
            } else {
                throw Error("String expected as argument!");
                return;
            }
        },
        set: function(key, value) {
            if (value instanceof Object && typeof value !== "string") {
                value = JSON.stringify(value);
            }
            this.$storage.setItem(key, value);
        },
        "delete": function(key) {
            this.$storage.removeItem(key);
        },
        deleteAll: function() {
            this.$storage.clear();
        },
        deleteAt: function(index) {
            this.$storage.removeItem(this.$storage.key(index));
        },
        log: function(key) {
            console.log(this.find(key).toString());
        }
    };
    window.Base.prototype.constructor = window.Base;
})();