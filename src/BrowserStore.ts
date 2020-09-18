import Record from './Record';

type StorageMode = 'localStorage' | 'sessionStorage';

class BrowserStore {

  mode: StorageMode;

  private $storage: Storage;


  constructor(shouldUseLocalStorage: boolean = true){
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

  find<R>(key: string): Record<R> | null {
    const value = this.$storage.getItem(key);

    if(value){
      return new Record<R>({
        storage: this.$storage,
        name: key,
        data: this.parse(value) || value
      })
    }

    return null;
  }

  findAll(): Record<any>[] {
    const all = [];

    for (let x in this.$storage) {
      const val = this.find<any>(x);
      if(val) {
        all.push(val);
      }
    }

    return all;
  }

  findAt<R>(index: number, returnAsRecord: boolean = true): Record<R> | string | null {
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

export default BrowserStore;