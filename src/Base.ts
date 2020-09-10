interface BaseJSInstance {
  set: (key: string, data: any) => void,
  delete: (key: string) => void
}

interface LocalStorageRecordProperties<T> {
  name: string,
  data: T,
  db: BaseJSInstance,
}

class LocalStorageRecord<T> {

  name: string;

  data: T;

  private $db: BaseJSInstance;

  constructor(properties: LocalStorageRecordProperties<T>){
    this.name = properties.name;
    this.data = properties.data;
    this.$db = properties.db;
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
    this.$db.set(this.name, this.data);
  }

  delete() {
    this.$db.delete(this.name);
  }
}


type BaseJSMode = "localStorage" | "sessionStorage";

export default class Base {

  mode: BaseJSMode;

  private $storage: Storage;
  

  constructor(shouldUseLocalStorage: boolean = false){
    if (shouldUseLocalStorage) {
      this.$storage = window.localStorage;
      this.mode = "localStorage";
    } else {
      this.$storage = window.sessionStorage;
      this.mode = "sessionStorage";
    }

  }

  get length(): number {
    return this.$storage.length;
  }

  parse(value: any): any | null {
    try {
      const x = JSON.parse(value);
      return x;
    } catch(e) {
      return null;
    }
  }

  find<R>(key: string): LocalStorageRecord<R> | null {
    const value = this.$storage.getItem(key);

    if(value){
      return new LocalStorageRecord<R>({
        db: this,
        name: key,
        data: this.parse(value) || value
      })
    }

    return null;
  }

  findAll(): LocalStorageRecord<any>[] {
    const all = [];

    for (let x in this.$storage) {
      const val = this.find<any>(x);
      if(val) {
        all.push(val);
      }
    }

    return all;
  }

  findAt<R>(index: number, returnAsRecord: boolean = true): LocalStorageRecord<R> | string | null {
    if (returnAsRecord) {
      return this.find(this.$storage.key(index) || '');
    }

    return this.$storage.key(index);
  }

  indexOf(key: string): number | undefined {
    let counter = 0;

    for(let x in this.$storage) {
      if(x === key) {
        return counter;
      } else {
        counter++;
      }
    }

    return undefined;
  }

  set<R>(key: string, value: R | string): void {
    let record;

    if(value instanceof Object && typeof value !== "string"){
      record = JSON.stringify(value);
      this.$storage.setItem(key, record);
    } else {
      this.$storage.setItem(key, value as string);
    }

  }

  delete(key: string): void {
    this.$storage.removeItem(key);
  }

  deleteAll() {
    this.$storage.clear();
  }

  log(key: string){
    console.log(this.find(key)?.toString());
  }
}