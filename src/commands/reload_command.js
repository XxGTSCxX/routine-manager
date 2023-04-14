const { SlashCommandBuilder } = require('discord.js');
const { LogLevel } = require('../enums/log_level.js');
const { Log } = require('../utility/log.js');


class ReloadCommand extends SlashCommandBuilder {
  constructor(props) {
    super(props);
    this.setName(`reload_command`);
    this.setDescription(`Reloads a command.`);
    this.addStringOption((option) => {
      option.setName(`command_name`);
      option.setDescription(`The command to reload.`);
      option.setRequired(true);
      return option;
    });
  }

  async execute(interaction) {
    const commandToReload = interaction.options.getString(`command_name`, true).slice();
    const command = interaction.client.commands.get(commandToReload);
    if (!command) {
      let errorMsg = `Command \`${commandToReload}\` doesn't exist. List of commands: `;
      interaction.client.commands.forEach((command) => {
        errorMsg = `${errorMsg}\n- \`${command.name}\``;
      });
      Log.Reply(interaction, LogLevel.TRACE, errorMsg);
      return;
    }
    delete require.cache[require.resolve(`./${command.name}.js`)];
    try {
      interaction.client.commands.delete(command.name);
      const newCommand = require(`./${command.name}.js`);
      interaction.client.commands.set(newCommand.command.name, newCommand.command);
      Log.Reply(interaction, LogLevel.TRACE, `Command \`${commandToReload}\` was reloaded!`);
    }
    catch (error) {
      Log.Reply(interaction, LogLevel.ERROR, `Failed to reload command \`${command.name}\` with error: ${error}`);
    }
  }
}


// Module Exports --------------------------------------------------------------
module.exports = {
  command: new ReloadCommand()
};
// Module Exports (END) --------------------------------------------------------
