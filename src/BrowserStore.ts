import Record from './Record';

type StorageMode = 'localStorage' | 'sessionStorage';

class BrowserStore {
  mode: StorageMode;

  private readonly $storage: Storage;

  constructor(shouldUseLocalStorage = true) {
    if (shouldUseLocalStorage) {
      this.$storage = window.localStorage;
      this.mode = 'localStorage';
    } else {
      this.$storage = window.sessionStorage;
      this.mode = 'sessionStorage';
    }
  }

  get length(): number {
    return this.$storage.length;
  }

  parse<R>(value: string): R | undefined {
    try {
      return JSON.parse(value);
    } catch {
      return;
    }
  }

  each(callback: (record: Record<unknown>, key: string) => void): void {
    for (const key in this.$storage) {
      const record = this.find(key);
      if (record) {
        callback(record, key);
      }
    }
  }

  find<R>(key: string): Record<R> | null {
    const value = this.$storage.getItem(key);

    if (value) {
      return new Record<R>({
        storage: this.$storage,
        name: key,
        data: this.parse(value) || value,
      });
    }
    return null;
  }

  findAll(): Record<unknown>[] {
    const all = [];

    for (const x in this.$storage) {
      const value = this.find<unknown>(x);
      if (value) {
        all.push(value);
      }
    }

    return all;
  }

  findAt<R>(index: number, returnAsRecord = true): Record<R> | string | null {
    if (returnAsRecord) {
      return this.find(this.$storage.key(index) || '');
    }

    return this.$storage.getItem(this.$storage.key(index) || '');
  }

  indexOf(key: string): number | undefined {
    let counter = 0;

    for (const x in this.$storage) {
      if (x === key) {
        return counter;
      } else {
        counter++;
      }
    }

    return;
  }

  set<R>(key: string, value: R | string): BrowserStore {
    let record;

    if (value instanceof Object && typeof value !== 'string') {
      record = JSON.stringify(value);
      this.$storage.setItem(key, record);
    } else {
      this.$storage.setItem(key, value as string);
    }
    return this;
  }

  delete(key: string): BrowserStore {
    this.$storage.removeItem(key);
    return this;
  }

  deleteAll(): void {
    this.$storage.clear();
  }

  log(key: string): BrowserStore {
    console.info(this.find(key)?.toString());
    return this;
  }
}

export default BrowserStore;
