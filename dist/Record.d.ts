interface RecordProperties<T> {
    name: string;
    data: T | string;
    storage: Storage;
}
declare class RecordBase<T> {
    readonly __key: string;
    readonly __data: T | string;
    private $storage;
    constructor(properties: RecordProperties<T>);
    toString(): string;
    save(): Record<T>;
    delete(): void;
}
declare class Record<T> extends RecordBase<T> {
    constructor(properties: RecordProperties<T>);
}
export default Record;
