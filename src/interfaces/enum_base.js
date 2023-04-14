const { EnumValues } = require('../impl/enum_values.js');
const assert = require('node:assert');


class EnumBase {
  #value = null;

  constructor(value) {
    assert(this.constructor.enumValues.IsValid(value), `Invalid value parsed. Use the follow values instead ${this.constructor.enumValues}`);
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  set value(unused) {
    throw new Error(`Value of an enum is non-modifiable.`);
  }

  toString() {
    return this.constructor.enumValues.GetName(this.#value);
  }

  static get enumValues() {
    return this.enumValuesData;
  }

  static Init() {
    if (this.enumValuesData === undefined) {
      this.enumValuesData = new EnumValues(this);
    }
    return true;
  }
}


// Module Exports --------------------------------------------------------------
module.exports = {
  EnumBase
};
// Module Exports (END) --------------------------------------------------------
