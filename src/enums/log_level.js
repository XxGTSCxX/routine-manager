const { EnumBase } = require('../interfaces/enum_base.js');


class LogLevel extends EnumBase {
  static get TRACE() { return 0; }
  static get DEBUG() { return 1; }
  static get WARNING() { return 2; }
  static get ERROR() { return 3; }

  static #init = LogLevel.Init();
};


// Module Exports --------------------------------------------------------------
module.exports = {
  LogLevel
};
// Module Exports (END) --------------------------------------------------------
