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
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences
	],
});

// local imports
import { redCake } from './utilitys.js';
var rc = new redCake(`🍰`);

const { lol } = require(`./ai.js`);


const { message } = require('./messages.js') // handle message incomming

// Events
client.once(Events.ClientReady, async (readyClient) => {
    var payload = {username: `Server`, message: `One word. Nothing else.`};
    var generated = await lol(payload);
    client.user.setPresence({
        activities: [{ name: `${generated}`}],
        status: 'dnd',
    });
});

client.on('messageCreate', (_message) => {
    message(client, _message);
});

// Login

tryLogin();

// Get discord token from .env.local
async function tryLogin(){
    rc.clear();
    rc.post();
    rc.startLoading(`Connecting to discord: `);
    if(process.env.DISCORD_TOKEN){
        await client.login(process.env.DISCORD_TOKEN);
        rc.stopLoading(`Connected to discord! 🛰️\n`);
    }else{
        rc.stopLoading(`Discord token: Missing. ☠️`);
    }
}