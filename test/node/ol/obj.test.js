import expect from '../expect.js';
import {assign, clear, isEmpty} from '../../../src/ol/obj.js';

describe('ol/obj.js', () => {
  describe('assign()', function () {
    it('is an alias for Object.assign() where available', function () {
      if (typeof Object.assign === 'function') {
        expect(assign).to.be(Object.assign);
      }
    });

    it('assigns properties from a source object to a target object', function () {
      const source = {
        sourceProp1: 'sourceValue1',
        sourceProp2: 'sourceValue2',
      };

      const target = {
        sourceProp1: 'overridden',
        targetProp1: 'targetValue1',
      };

      const assigned = assign(target, source);
      expect(assigned).to.be(target);
      expect(assigned.sourceProp1).to.be('sourceValue1');
      expect(assigned.sourceProp2).to.be('sourceValue2');
      expect(assigned.targetProp1).to.be('targetValue1');
    });

    it('throws a TypeError with `undefined` as target', function () {
      expect(() => assign()).to.throwException(
        /Cannot convert undefined or null to object/
      );
    });

    it('throws a TypeError with `null` as target', function () {
      expect(() => assign(null)).to.throwException(
        /Cannot convert undefined or null to object/
      );
    });
  });

  describe('clear()', function () {
    it('removes all properties from an object', function () {
      expect(isEmpty(clear({foo: 'bar'}))).to.be(true);
      expect(isEmpty(clear({foo: 'bar', num: 42}))).to.be(true);
      expect(isEmpty(clear({}))).to.be(true);
      expect(isEmpty(clear(null))).to.be(true);
    });
  });

  describe('isEmpty()', function () {
    it('checks if an object has any properties', function () {
      expect(isEmpty({})).to.be(true);
      expect(isEmpty(null)).to.be(true);
      expect(isEmpty({foo: 'bar'})).to.be(false);
      expect(isEmpty({foo: false})).to.be(false);
    });
  });
});
