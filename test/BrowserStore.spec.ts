import * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { BrowserStore, Record } from '../src';
import { RecordData } from '../src/Record';

const { localStorage } = window;
const { expect } = chai;

chai.use(sinonChai);

const storeForTestingCallbacks = new BrowserStore();
beforeEach(() => {
  sinon.spy(storeForTestingCallbacks, 'each');
  sinon.spy(console, 'info');
});
afterEach(() => {
  (storeForTestingCallbacks.each as any).restore();
  (console.info as any).restore();
  localStorage.clear();
});
describe('BrowserStore.ts', () => {
  it('mode=localStorage no arguments passed to constructor', () => {
    const store = new BrowserStore();
    expect(store.mode).equal('localStorage');
  });

  it('mode=sessionStorage if constructor argument shouldUseLocalStorage=false', () => {
    const store = new BrowserStore(false);
    expect(store.mode).equal('sessionStorage');
  });

  it('should correctly set and get an object value', () => {
    const store = new BrowserStore();
    const user = { name: 'Schambach' };

    store.set('testUser', user);
    expect(localStorage.getItem('testUser')).equal(JSON.stringify(user));

    const retrieved = store.find<typeof user>('testUser');
    expect(retrieved?.__data).eql(user);

    // Should be able to set and get enumerable properties of __data from the record
    if (retrieved) {
      // Test Getting the properties
      expect(retrieved.name).equal('Schambach');
      expect(retrieved.foo).equal(undefined);

      // Test Setting the properties
      retrieved.name = 'NewName';
      expect('NewName').equal((retrieved.__data as RecordData).name);

      retrieved.bar = 'foo';
      expect('foo').equal((retrieved.__data as RecordData).bar);
    }
  });

  it('should correctly set and get a string value', () => {
    const store = new BrowserStore();
    const value = 'This is a test value.';

    store.set('test', value);
    expect(localStorage.getItem('test')).equal(value);

    const retrieved = store.find('test');
    expect(retrieved?.__data).equal(value);
  });

  it('should correctly set and get an array value', () => {
    const store = new BrowserStore();
    const users = [{ name: 'Schambach' }, { name: 'David' }];

    store.set('testUsers', users);
    expect(localStorage.getItem('testUsers')).equal(JSON.stringify(users));

    const retrieved = store.find('testUsers');
    expect(retrieved?.__data).eql(users);
  });

  it('should correctly set a numerical value', () => {
    const store = new BrowserStore();
    const count = 45;

    store.set('testCount', count);
    expect(localStorage.getItem('testCount')).equal(JSON.stringify(count));

    const retrieved = store.find('testCount');
    expect(retrieved?.__data).equal(count);
  });

  it('should correctly retrieve all records', () => {
    const store = new BrowserStore();
    const count = 45;
    const user = { name: 'Schambach' };

    store.set('testCount', count);
    store.set('testUser', user);
    expect(store.length).equal(2);
    expect(localStorage.length).equal(2);

    const retrieved = store.findAll();
    expect(retrieved?.length).equal(2);
    expect(retrieved[0]?.__data).equal(count);
    expect(retrieved[1]?.__data).eql(user);
  });

  it('should clear all records on executing deleteAll method', () => {
    const store = new BrowserStore();
    const count = 45;
    const user = { name: 'Schambach' };

    store.set('testCount', count);
    store.set('testUser', user);
    expect(store.length).equal(2);
    expect(localStorage.length).equal(2);

    store.deleteAll();
    expect(store.length).equal(0);
    expect(localStorage.length).equal(0);
  });

  it('should delete an existing record on delete method', () => {
    const store = new BrowserStore();
    const count = 45;
    const user = { name: 'Schambach' };

    store.set('testCount', count);
    store.set('testUser', user);
    expect(store.length).equal(2);
    expect(localStorage.length).equal(2);

    store.delete('testUser');
    let retrieved = store.find('testUser');
    expect(retrieved).equal(null);
    retrieved = store.find('testCount');
    expect(retrieved?.__data).equal(count);
  });

  it('should correctly find record at a given index', () => {
    const store = new BrowserStore();
    const count = 45;
    const user = { name: 'Schambach' };
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    store.set('testCount', count);
    store.set('testUser', user);
    store.set('weekdays', weekdays);

    // Finding as a record
    let retrieved = store.findAt(1);
    retrieved = retrieved as Record<typeof user>;

    expect('testUser').equal(retrieved?.__key);
    expect(user).eql(retrieved?.__data);

    // Finding as a non record
    retrieved = store.findAt(0, false);
    expect(retrieved).equal(JSON.stringify(count));

    // Finding non-existent record as record
    retrieved = store.findAt(75);
    expect(retrieved).equal(null);

    // Finding non-existent record as non record
    retrieved = store.findAt(100, false);
    expect(retrieved).equal(null);
  });

  it('should correctly find index or record with given name/key', () => {
    const store = new BrowserStore();
    const count = 45;
    const user = { name: 'Schambach' };
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    store.set('testCount', count);
    store.set('testUser', user);
    store.set('weekdays', weekdays);

    let index = store.indexOf('weekdays');
    expect(index).equal(2);
    index = store.indexOf('nullRecord');
    expect(index).equal(undefined);
  });

  it('parse method should return null when parsing non json value', () => {
    const store = new BrowserStore();

    expect(store.parse('{45}')).equal(undefined);
  });

  it('should correctly log record', () => {
    const store = new BrowserStore();
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    store.set('weekdays', weekdays);
    store.log('weekdays');

    expect(console.info).calledWith(JSON.stringify(weekdays));

    store.log('nonExistentRecord');
    expect(console.info).calledWith();
  });

  it('should properly iterate through each key with each method', () => {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const count = 45;
    const user = { name: 'Schambach' };

    storeForTestingCallbacks.set('weekdays', weekdays);
    storeForTestingCallbacks.set('count', count);
    storeForTestingCallbacks.set('user', user);

    storeForTestingCallbacks.each((record, key) => {
      console.info(record.__data);
      console.info(key);
    });

    expect(storeForTestingCallbacks.each).calledOnce;

    expect(console.info).calledWith(weekdays);
    expect(console.info).calledWith('weekdays');
    expect(console.info).calledWith(count);
    expect(console.info).calledWith('count');
    expect(console.info).calledWith(user);
    expect(console.info).calledWith('user');
    expect(console.info).callCount(6);
  });
});
