// console.log(`${message.author.username}: ${message.content}`);
// const { PermissionsBitField } = require('discord.js');

const {redCake} = require('./utilitys.js');
var rc = new redCake(`🛰️`);
const { lol } = require(`./ai.js`);

const message = async (_client, _message)=>{ 
    var data = {
        author: _message.author,
        message: "",
        username: _message.author.username,
        channel: _message.channel,
    }

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
            data.message = a3;
            if(a2.length >= 1){
                if(a2[0].includes(`restart`)){
                    await rp(_message, data);
                    //process.exit();
                    // pm2 not finished.
                }else{
                    await rp(_message, data);
                }
            }else{
                data.message = "I can't hear you!";
                rp(_message, data);
            }
            

        }else{
            // log message
            rc.log(`${_message.author.username}: ${_message.content}`);
        }

        // var ct = _message.channel.type;
        // log(`ct: ${ct}`);
    }
}

async function rp(_message, _data){
    _data.channel.sendTyping();
    var response = await lol(_data);
    _message.channel.send(`${response}`);
    return response;
}

module.exports = { message };