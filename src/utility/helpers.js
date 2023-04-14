const assert = require('node:assert');
const uuid = require('uuid');


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

function IsValidUUID(idToTest) {
  if (!IsTypeOf(idToTest, String)) {
    return false;
  }
  return uuid.validate(idToTest) && uuid.version(idToTest) === 4;
}

function EnforceIsTypeOf(left, right) {
  assert(IsTypeOf(left, right), `Expected '${GetTypeName(left)}' to be of type '${GetTypeName(right)}'.`);
}

function EnforceIsDerivedFrom(derived, base) {
  assert(IsDerivedFrom(derived, base), `Expected '${GetTypeName(derived)}' to be an instance of '${GetTypeName(base)}'.`);
}

function EnforceIsValidID(idToTest) {
  EnforceIsTypeOf(idToTest, String);
  assert(uuid.validate(idToTest), `"${idToTest}" is not in uuid format.`);
  assert(uuid.version(idToTest) === 4, `"${idToTest}"'s uuid version is not 4. Version number is ${uuid.version(idToTest)} instead.`);
}

// Module Exports --------------------------------------------------------------
module.exports = {
  IsType,
  GetTypeName,
  IsTypeOf,
  IsDerivedFrom,
  IsValidUUID,
  EnforceIsTypeOf,
  EnforceIsDerivedFrom,
  EnforceIsValidID
};
// Module Exports (END) --------------------------------------------------------
