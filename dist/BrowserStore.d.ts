import Record from './Record';
declare type StorageMode = 'localStorage' | 'sessionStorage';
declare class BrowserStore {
    mode: StorageMode;
    private $storage;
    constructor(shouldUseLocalStorage?: boolean);
    get length(): number;
    parse(value: any): any | null;
    find<R>(key: string): Record<R> | null;
    findAll(): Record<any>[];
    findAt<R>(index: number, returnAsRecord?: boolean): Record<R> | string | null;
    indexOf(key: string): number | undefined;
    set<R>(key: string, value: R | string): void;
    delete(key: string): void;
    deleteAll(): void;
    log(key: string): void;
}
export default BrowserStore;
