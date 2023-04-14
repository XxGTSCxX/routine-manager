const assert = require('node:assert');


function IsType(type) {
  return type.prototype !== undefined;
}

function GetTypeName(object) {
  if (IsType(object)) {
    return object.prototype.constructor.name;
  }
  else {
    return object.constructor.name;
  }
}

function IsTypeOf(left, right) {
  return GetTypeName(left) === GetTypeName(right);
}

function IsDerivedFrom(derived, base) {
  if (IsType(derived)) {
    return IsTypeOf(derived, base) || derived.prototype instanceof base;
  }
  return IsTypeOf(derived, base) || derived instanceof base;
}

function EnforceIsTypeOf(left, right) {
  assert(IsTypeOf(left, right), `Expected '${GetTypeName(left)}' to be of type '${GetTypeName(right)}'.`);
}

function EnforceIsDerivedFrom(derived, base) {
  assert(IsDerivedFrom(derived, base), `Expected '${GetTypeName(derived)}' to be an instance of '${GetTypeName(base)}'.`);
}


// Module Exports --------------------------------------------------------------
module.exports = {
  IsType,
  GetTypeName,
  IsTypeOf,
  IsDerivedFrom,
  EnforceIsTypeOf,
  EnforceIsDerivedFrom
};
// Module Exports (END) --------------------------------------------------------
