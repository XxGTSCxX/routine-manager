const { GatewayIntentBits } = require('discord.js');
const { RoutineManagerClient } = require('./routine_manager.js');
const { botToken } = require('../config.json');


const client = new RoutineManagerClient({ intents: [GatewayIntentBits.Guilds] });
client.login(botToken);
