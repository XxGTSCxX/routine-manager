const { BaseInteraction } = require('discord.js');
const { EnforceIsTypeOf, EnforceIsDerivedFrom } = require('./helpers.js');
const { LogLevel } = require('../enums/log_level.js');


class Log {
  static Console(logLevel, message) {
    EnforceIsTypeOf(logLevel, LogLevel);
    EnforceIsTypeOf(message, String);
    const finalMessage = `[${logLevel}] ${message}`;
    console.log(finalMessage);
    return finalMessage;
  }

  static async Reply(instance, logLevel, message) {
    EnforceIsDerivedFrom(instance, BaseInteraction);
    await instance.reply({
      content: this.Console(logLevel, message),
      ephemeral: true
    });
  }

  static Trace(message) {
    return this.Console(LogLevel.TRACE, message);
  }

  static Debug(message) {
    return this.Console(LogLevel.DEBUG, message);
  }

  static Warning(message) {
    return this.Console(LogLevel.WARNING, message);
  }

  static Error(message) {
    return this.Console(LogLevel.ERROR, message);
  }
}


// Module Exports --------------------------------------------------------------
module.exports = {
  Log
};
// Module Exports (END) --------------------------------------------------------
