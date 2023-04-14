const { CompletionStatus } = require('../enums/completion_status.js');
const { EnforceIsTypeOf, EnforceIsDerivedFrom, EnforceIsValidID } = require('../utility/helpers.js');
const uuid = require('uuid');


class Actionable {
  constructor(desc, status, isSkippable, date = null, startTime = null, dueTime = null) {
    EnforceIsTypeOf(desc, String);
    EnforceIsDerivedFrom(status, CompletionStatus);
    EnforceIsTypeOf(isSkippable, Boolean);
    if (date !== null) {
      EnforceIsDerivedFrom(isSkippable, Date);
    }
    if (startTime !== null) {
      EnforceIsDerivedFrom(startTime, Date);
    }
    if (dueTime !== null) {
      EnforceIsDerivedFrom(dueTime, Date);
    }
    this.#description = desc;
    this.#status = status;
    this.#isSkippable = isSkippable;
    this.#date = date;
    this.#startTime = startTime;
    this.#dueTime = dueTime;
  }

  get description() { return this.#description; }
  get status() { return this.#status; }
  get isSkippable() { return this.#isSkippable; }
  get date() { return this.#date; }
  get startTime() { return this.#startTime; }
  get dueTime() { return this.#dueTime; }

  set description(value) {
    EnforceIsTypeOf(value, String);
    this.#description = value;
    this.#InvokeOnModifiedCallbacks();
  }

  set status(value) {
    EnforceIsDerivedFrom(value, CompletionStatus);
    this.#status = value;
    this.#InvokeOnModifiedCallbacks();
  }

  set isSkippable(value) {
    EnforceIsTypeOf(value, Boolean);
    this.#isSkippable = value;
    this.#InvokeOnModifiedCallbacks();
  }

  set date(value) {
    EnforceIsDerivedFrom(value, Date);
    this.#date = value;
    this.#InvokeOnModifiedCallbacks();
  }

  set startTime(value) {
    EnforceIsDerivedFrom(value, Date);
    this.#startTime = value;
    this.#InvokeOnModifiedCallbacks();
  }

  set dueTime(value) {
    EnforceIsDerivedFrom(value, Date);
    this.#dueTime = value;
    this.#InvokeOnModifiedCallbacks();
  }

  RegisterOnModifiedCallback(callback) {
    EnforceIsTypeOf(callback, Function);
    for (const [registeredCallbackID, registeredCallback] of this.#onModifiedCallbacks) {
      if (callback === registeredCallback) {
        return registeredCallbackID;
      }
    }
    const callbackID = uuid.v4();
    this.#onModifiedCallbacks.set(callbackID, callback);
    return callbackID;
  }

  UnregisterOnModifiedCallback(callbackID) {
    EnforceIsValidID(callbackID);
    if (!this.#onModifiedCallbacks.has(callbackID)) {
      return false;
    }
    this.#onModifiedCallbacks.delete(callbackID);
    return true;
  }

  #InvokeOnModifiedCallbacks() {
    for (const [unused, registeredCallback] of this.#onModifiedCallbacks) {
      registeredCallback(this);
    }
  }

  #onModifiedCallbacks = new Map();
  #description = '';
  #status = CompletionStatus.Open;
  #date = null;
  #startTime = null;
  #dueTime = null;
  #isSkippable = false;
}


// Module Exports --------------------------------------------------------------
module.exports = {
  Actionable
};
// Module Exports (END) --------------------------------------------------------
