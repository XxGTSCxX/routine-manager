const { ActionRowBuilder, BaseInteraction, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EnforceIsDerivedFrom, EnforceIsTypeOf } = require('../utility/helpers.js');


class ActionableCreator {
  content = `Create a new actionable:`;
  ephemeral = true;
  components = [];

  constructor(interaction, onResolvedCallback) {
    EnforceIsDerivedFrom(interaction, BaseInteraction);
    EnforceIsTypeOf(onResolvedCallback, Function);
    this.#onResolvedCallback = onResolvedCallback;
    this.#RegisterInteraction(interaction);
    this.#SetupLayout();
    interaction.reply(this);
    setTimeout(this.#onTimedOut, ActionableCreator.#timeoutDuration);
  }

  get userId() {
    return this.#interaction.user.id;
  }

  #RegisterInteraction(interaction) {
    const collectorProps = {
      filter: this.#filterInputInteraction,
      time: ActionableCreator.#timeoutDuration
    };
    this.#interaction = interaction;
    this.#inputCollector = interaction.channel.createMessageComponentCollector(collectorProps);
    this.#inputCollector.on(`collect`, this.#onInputInteraction);
  }

  #SetupLayout() {
    this.#inputIds.add(`cancel`);
    this.#cancelButton.setCustomId(`cancel`);
    this.#cancelButton.setLabel(`Cancel`);
    this.#cancelButton.setStyle(ButtonStyle.Primary);
    this.#buttonRow.addComponents(this.#cancelButton);
    this.components.push(this.#buttonRow);
  }

  async #Resolve(resolutionMessage) {
    if (!this.#isResolved) {
      EnforceIsTypeOf(resolutionMessage, String);
      this.#isResolved = true;
      this.content = resolutionMessage;
      this.#cancelButton.setDisabled();
      await this.#interaction.editReply(this);
      this.#onResolvedCallback(this);
    }
  }

  #onTimedOut = () => {
    this.#Resolve(`\`create_actionable\` command timed out.`);
  }

  #filterInputInteraction = (interaction) => {
    return interaction.user.id == this.#interaction.user.id && this.#inputIds.has(interaction.customId);
  }

  #onInputInteraction = async (inputInteraction) => {
    if (inputInteraction.customId === this.#cancelButton.data.custom_id) {
      this.#Resolve(`\`create_actionable\` command cancelled.`);
      inputInteraction.deferUpdate();
    }
  }

  #interaction = null;
  #onResolvedCallback = null;
  #inputCollector = null;
  #buttonRow = new ActionRowBuilder();
  #cancelButton = new ButtonBuilder();
  #inputIds = new Set();
  #isResolved = false;

  static #timeoutDuration = 15000;
}


// Module Exports --------------------------------------------------------------
module.exports = {
  ActionableCreator
};
// Module Exports (END) --------------------------------------------------------
