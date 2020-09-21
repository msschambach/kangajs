import Record from './Record';
declare type StorageMode = 'localStorage' | 'sessionStorage';
declare class BrowserStore {
  mode: StorageMode;
  private readonly $storage;
  constructor(shouldUseLocalStorage?: boolean);
  get length(): number;
  parse<R>(value: string): R | undefined;
  find<R>(key: string): Record<R> | null;
  findAll(): Record<unknown>[];
  findAt<R>(index: number, returnAsRecord?: boolean): Record<R> | string | null;
  indexOf(key: string): number | undefined;
  set<R>(key: string, value: R | string): BrowserStore;
  delete(key: string): BrowserStore;
  deleteAll(): void;
  log(key: string): BrowserStore;
}
export default BrowserStore;
