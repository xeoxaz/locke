// console.log(`${message.author.username}: ${message.content}`);
const { PermissionsBitField } = require('discord.js');

const { log } = require('./utilitys.js');
const { lol } = require(`./ai.js`);

const message = async (_client, _message)=>{ 
    if(!_message.author.bot){
        var a0 = _message.content;
        var a1 = a0.toLowerCase();
        var a2 = a1.split(` `);
        if(a2[0].includes(`locke`)){
            a2.shift();
            var a3 = "";
            a2.forEach(a => {
                a3 += ` ${a}`;
            });
            _message.channel.sendTyping();
            var response = await lol(_message.content);
            _message.channel.send(`${response}`);
        }
    }
}

module.exports = { message };