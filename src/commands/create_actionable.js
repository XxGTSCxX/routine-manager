const { SlashCommandBuilder } = require('discord.js');
const { ActionableCreator } = require('../replies/actionable_creator.js');
const { LogLevel } = require('../enums/log_level.js');
const { Log } = require('../utility/log.js');


class CreateActionable extends SlashCommandBuilder {
  constructor(props) {
    super(props);
    this.setName(`create_actionable`);
    this.setDescription(`Create a new actionable.`);
  }

  async execute(interaction) {
    if (this.#createRequests.has(interaction.user.id)) {
      await Log.Reply(interaction, LogLevel.ERROR, `Previous \`create_actionable\` request is still being processed.`);
      return;
    }
    Log.Trace(`Executing 'create_actionable'...`);
    this.#createRequests.set(interaction.user.id, new ActionableCreator(interaction, this.#onInteractionResolved));
  }

  #onInteractionResolved = (actionableCreator) => {
    this.#createRequests.delete(actionableCreator.userId);
  }

  #createRequests = new Map();
}


// Module Exports --------------------------------------------------------------
module.exports = {
  command: new CreateActionable()
};
// Module Exports (END) --------------------------------------------------------
