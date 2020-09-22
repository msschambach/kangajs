import { expect } from 'chai';
import { BrowserStore } from '../src';

const { localStorage } = window;

describe('Tesing Record enumerable properties', () => {
  it('should correctly set and get an object value', () => {
    const store = new BrowserStore();
    const user = { name: 'Schambach' };

    store.set('testUser', user);
    expect(localStorage.getItem('testUser')).equal(JSON.stringify(user));

    const retrieved = store.find('testUser');
    expect(retrieved?.__data).eql(user);

    // Should be able to set and get enumerable properties of __data from the record
    if (retrieved) {
      expect(retrieved.name).equal('Schambach');

      // Test Setting the properties
      retrieved.name = 'NewName';
      expect('NewName').equal(retrieved.__data.name);
    }
  });
});
