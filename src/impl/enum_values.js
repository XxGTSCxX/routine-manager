const { GetTypeName } = require('../utility/helpers.js');
const assert = require('node:assert');


class EnumValues {
  #values = new Map();
  #enumName = ``;

  constructor(enumClass) {
    this.#enumName = GetTypeName(enumClass);
    const descriptors = Object.getOwnPropertyDescriptors(enumClass);
    for (const property in descriptors) {
      if (descriptors[property].get !== undefined && descriptors[property].set === undefined) {
        const privateProperty = `#${property}`;
        const primitiveVal = descriptors[property].get();
        const symbolVal = { [Symbol.toPrimitive](hint) { return primitiveVal; } };
        this.#values.set(symbolVal, property);
        Object.defineProperty(enumClass, privateProperty, {
          value: null,
          writable: true,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(enumClass, property, {
          get() {
            if (this[privateProperty] === null) {
              this[privateProperty] = Object.freeze(new this(symbolVal));
            }
            return this[privateProperty];
          },
          set(unused) {
            throw new Error(`${GetTypeName(this)}.${property} is non-modifiable.`);
          }
        });
      }
    }
    assert(this.#values.size > 0, `No values were defined in the class.`);
  }

  IsValid(value) {
    return this.#values.has(value);
  }

  GetName(value) {
    assert(this.IsValid(value), `'${this.#enumName}' does not contain the value '${value}'.`);
    return this.#values.get(value);
  }

  toString() {
    let str = `{`;
    let addComma = false;
    for (const [value, valueName] of this.#values) {
      if (addComma) {
        str = `${str},`;
      }
      addComma = true;
      str = `${str} ${this.#enumName}.${valueName}`;
    }
    str = `${str} }`;
    return str;
  }
}


// Module Exports --------------------------------------------------------------
module.exports = {
  EnumValues
};
// Module Exports (END) --------------------------------------------------------
