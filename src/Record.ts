interface RecordProperties<T> {
  name: string;
  data: T | string;
  storage: Storage;
}

class Record<T> {
  readonly __key: string;

  readonly __data: T | string;

  private $storage: Storage;

  constructor(properties: RecordProperties<T>) {
    this.__key = properties.name;
    this.__data = properties.data;
    this.$storage = properties.storage;

    if (this.__data && typeof this.__data !== 'string') {
      const data = this.__data;
      for (const property in this.__data) {
        Object.defineProperty(this, property, {
          enumerable: true,
          get: () => data[property],
          set: (value) => {
            data[property] = value;
          },
        });
      }
    }
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

export default Record;
