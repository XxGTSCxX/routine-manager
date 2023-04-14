const { EnumBase } = require('../interfaces/enum_base');


class CompletionStatus extends EnumBase {
  static get Open() { return 0b000; }
  static get Completed() { return 0b001; }
  static get Skipped() { return 0b010; }
  static get Closed() { return 0b100; }

  static #init = CompletionStatus.Init();
}


// Module Exports --------------------------------------------------------------
module.exports = {
  CompletionStatus
};
// Module Exports (END) --------------------------------------------------------
