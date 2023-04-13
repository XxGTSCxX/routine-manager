const { Events, GatewayIntentBits } = require('discord.js');
const { RoutineManagerClient } = require('./routine_manager.js');
const { botToken } = require('../config.json');


const client = new RoutineManagerClient({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, clientData => {
  console.log(`Ready! Logged in as ${clientData.user.tag}`);
});

client.login(botToken);
