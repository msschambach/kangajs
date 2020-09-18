interface RecordProperties<T> {
  name: string,
  data: T | string,
  storage:Storage
}

class Record<T> {

  name: string;

  data: T | string;

  private $storage: Storage;

  constructor(properties: RecordProperties<T>){
    this.name = properties.name;
    this.data = properties.data;
    this.$storage = properties.storage;
  }

  toString(){
    // If it's a string just return the string value, otherwise JSON.stringify
    if (String.prototype.isPrototypeOf(this.data) || typeof this.data === "string") {
      return this.data;
    } else {
      return JSON.stringify(this.data);
    }
  }

  save() {
    let record;

    if(this.data instanceof Object && typeof this.data !== "string"){
      record = JSON.stringify(this.data);
      this.$storage.setItem(this.name, record);
    } else {
      this.$storage.setItem(this.name, this.data as string);
    }
  }

  delete() {
    this.$storage.removeItem(this.name);
  }
}

export default Record;
