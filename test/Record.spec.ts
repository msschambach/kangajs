import * as chai from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { BrowserStore, Record } from '../src';

const { localStorage } = window;
const { expect } = chai;

chai.use(sinonChai);

afterEach(() => {
  localStorage.clear();
});
describe('Record.ts', () => {
  it('correctly saves an object record', () => {
    expect(localStorage.length).equal(0);

    const recordProperties = {
      name: 'test',
      data: { name: 'Schambach' },
      storage: localStorage,
    };

    const record = new Record(recordProperties);
    record.save();
    expect(localStorage.length).equal(1);
    expect(localStorage.getItem(recordProperties.name)).equal(
      JSON.stringify(recordProperties.data)
    );
  });

  it('correctly saves a string record', () => {
    expect(localStorage.length).equal(0);

    const recordProperties = {
      name: 'test',
      data: 'This is a test',
      storage: localStorage,
    };

    const record = new Record(recordProperties);
    record.save();
    expect(localStorage.length).equal(1);
    expect(localStorage.getItem(recordProperties.name)).equal(recordProperties.data);
  });

  it('correctly deletes a record', () => {
    const store = new BrowserStore();

    store.set('test', 'This is cool.');
    expect(localStorage.length).equal(1);

    const record = store.find('test');
    record?.delete();
    expect(localStorage.length).equal(0);
  });

  it('returns data without parsing if data is string when calling toString', () => {
    const JSONStringigySpy = spy(JSON, 'stringify');
    const store = new BrowserStore();

    store.set('test', 'This is cool.');
    expect(localStorage.length).equal(1);

    const record = store.find('test');
    expect(record?.toString()).equal('This is cool.');
    // JSON.stringify should not be called when calling store.set and store.find since data is already as string
    expect(JSONStringigySpy).callCount(0);

    JSONStringigySpy.restore();
  });
});
