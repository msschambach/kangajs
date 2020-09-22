interface RecordProperties<T> {
  name: string;
  data: T | string;
  storage: Storage;
}

class RecordBase<T> {
  readonly __key: string;

  readonly __data: T | string;

  private $storage: Storage;

  constructor(properties: RecordProperties<T>) {
    this.__key = properties.name;
    this.__data = properties.data;
    this.$storage = properties.storage;
  }

  toString(): string {
    // If it's a string just return the string value, otherwise JSON.stringify
    if (
      String.prototype.isPrototypeOf(this.__data) ||
      typeof this.__data === 'string'
    ) {
      return this.__data as string;
    } else {
      return JSON.stringify(this.__data);
    }
  }

  save(): Record<T> {
    let record;

    if (this.__data instanceof Object && typeof this.__data !== 'string') {
      record = JSON.stringify(this.__data);
      this.$storage.setItem(this.__key, record);
    } else {
      this.$storage.setItem(this.__key, this.__data as string);
    }

    return this;
  }

  delete(): void {
    this.$storage.removeItem(this.__key);
  }
}

class Record<T> extends RecordBase<T> {
  constructor(properties: RecordProperties<T>) {
    super(properties);
    return new Proxy(this, {
      get(target: RecordBase<T>, p: PropertyKey, receiver: any): any {
        if (
          !Object.getPrototypeOf(target)?.[p] &&
          !target.hasOwnProperty(p) &&
          typeof target.__data === 'object' &&
          !['__key', '__data'].includes(p as string)
        ) {
          return Reflect.get((target as any).__data, p, receiver);
        }
        return Reflect.get(target, p, receiver);
      },
      set(
        target: RecordBase<any>,
        p: PropertyKey,
        value: any,
        receiver: any
      ): boolean {
        if (
          !Object.getPrototypeOf(target)?.[p] &&
          !target.hasOwnProperty(p) &&
          !['__key', '__data'].includes(p as string)
        ) {
          return Reflect.set(target.__data, p, value, target.__data);
        }
        return Reflect.set(target, p, value, receiver);
      },
    });
  }
}

export default Record;
