interface RecordProperties<T> {
  name: string;
  data: T | string;
  storage: Storage;
}

class Record<T> {
  name: string;

  data: T | string;

  private $storage: Storage;

  constructor(properties: RecordProperties<T>) {
    this.name = properties.name;
    this.data = properties.data;
    this.$storage = properties.storage;
  }

  toString(): string {
    // If it's a string just return the string value, otherwise JSON.stringify
    return Object.prototype.isPrototypeOf.call(String, this.data) || typeof this.data === 'string'
      ? (this.data as string)
      : JSON.stringify(this.data);
  }

  save(): Record<T> {
    let record;

    if (this.data instanceof Object && typeof this.data !== 'string') {
      record = JSON.stringify(this.data);
      this.$storage.setItem(this.name, record);
    } else {
      this.$storage.setItem(this.name, this.data as string);
    }

    return this;
  }

  delete(): void {
    this.$storage.removeItem(this.name);
  }
}

export default Record;
