const { Client, Events, Collection, REST, Routes } = require('discord.js');
const { botToken, clientID } = require('../config.json');
const { LogLevel } = require('./enums/log_level.js');
const { Log } = require('./utility/log.js');
const path = require('node:path');
const fs = require('node:fs');


class RoutineManagerClient extends Client {
  constructor(options) {
    super(options);
    this.once(Events.ClientReady, this.#OnClientReady);
    this.on(Events.InteractionCreate, this.#OnInteraction);
  }

  async #OnClientReady(clientData) {
    await this.#UpdateCommands();
    Log.Trace(`Ready! Logged in as ${clientData.user.tag}`);
  }

  async #OnInteraction(interaction) {
    if (interaction.client != this) {
      Log.Reply(interaction, LogLevel.ERROR, `Interaction's client is not RoutineManager, exiting...`);
      return;
    }
    if (!interaction.isChatInputCommand()) {
      Log.Reply(interaction, LogLevel.ERROR, `Interation is not a chat input, exiting...`);
      return;
    }
    const command = this.commands.get(interaction.commandName);
    if (!command) {
      Log.Reply(interaction, LogLevel.ERROR, `No command matching \`${interaction.commandName}\` was found.`);
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      Log.Reply(interaction, LogLevel.ERROR, `Encountered error while executing command \`${interaction.commandName}\`. Error message: "${error}"`);
    }
  }

  async #UpdateCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const commandsFiles = fs.readdirSync(commandsPath).filter((file) => {
      return file.endsWith('.js');
    });
    this.commands = new Collection();
    for (const fileName of commandsFiles) {
      const filePath = path.join(commandsPath, fileName);
      const { command } = require(filePath);
      try {
        this.commands.set(command.name, command);
      }
      catch (error) {
        Log.Error(`Failed to add command at ${filePath} with error: ${error}`);
      }
    }
    await this.#RefreshAppCommands();
  }

  async #RefreshAppCommands() {
    const rest = new REST({ version: `10` }).setToken(botToken);
    let commandsUpdateSuccess = true;
    Log.Trace(`Started updating ${this.commands.size} command(s) for ${this.guilds.cache.size} guild(s)...`);
    try {
      for (const [unused, guild] of this.guilds.cache) {
        const data = await rest.put(Routes.applicationGuildCommands(clientID, guild.id), { body: this.commands });
        const percent = data.length * 100 / this.commands.size;
        Log.Trace(`  Successfully updated ${data.length}/${this.commands.size} (${percent}%) command(s) for guild: '${guild.name}' (${guild.id}).`);
      }
    }
    catch (error) {
      commandsUpdateSuccess = false;
      Log.Error(`  Failed to update commands with error: '${error}'`);
    }
    Log.Trace(`Command updates ${commandsUpdateSuccess ? `completed` : `failed`}.`);
  }
}


// Module Exports --------------------------------------------------------------
module.exports = {
  RoutineManagerClient
};
// Module Exports (END) --------------------------------------------------------
