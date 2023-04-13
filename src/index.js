const { Client, Events, GatewayIntentBits } = require('discord.js');
const { botToken } = require('../config.json');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, clientData => {
  console.log(`Ready! Logged in as ${clientData.user.tag}`);
});

client.login(botToken);
