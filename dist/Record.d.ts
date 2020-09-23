export interface RecordData {
    [x: string]: any;
}
export interface RecordProperties<T = any> {
    key: string;
    data: T | RecordData | string;
    storage: Storage;
}
declare class RecordBase<T = any> {
    readonly __key: string;
    readonly __data: T | RecordData | string;
    private $storage;
    constructor(properties: RecordProperties<T>);
    toString(): string;
    save(): RecordBase<T>;
    delete(): void;
}
interface Record<T = any> {
    __key: string;
    __data: T | RecordData | string;
    [x: string]: any;
}
declare class Record<T = any> extends RecordBase<T> {
    constructor(properties: RecordProperties<T>);
}
export default Record;
