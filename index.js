// Notes:
//
// ~ Local data is saved to a file called `locke.json`
// ~ Discord bot token saved to file `.env.local`
// These files are not pushed to github. (for safety)
//

// https://discord.js.org/docs/packages/discord.js/14.14.1

// import discord.js
import {Client, Events, GatewayIntentBits, REST, Routes} from 'discord.js';

// New client with intents
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// local imports
const { log } = require('./utilitys.js') // log ext..
const { message } = require('./messages.js') // handle message incomming

// Events
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', (_message) => {
    message(client, _message);
});

// Login

tryLogin();

// Get discord token from .env.local
function tryLogin(){
    log(`Trying to login..`);
    if(process.env.DISCORD_TOKEN){
        client.login(process.env.DISCORD_TOKEN);
    }else{
        log(`Discord token: Missing.`);
    }
}