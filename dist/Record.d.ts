interface RecordProperties<T> {
    name: string;
    data: T | string;
    storage: Storage;
}
declare class Record<T> {
    name: string;
    data: T | string;
    private $storage;
    constructor(properties: RecordProperties<T>);
    toString(): string | T;
    save(): void;
    delete(): void;
}
export default Record;
