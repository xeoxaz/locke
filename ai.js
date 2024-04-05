// https://github.com/ollama/ollama/blob/main/docs/api.md
// 
// Now using ollama ai

const { fetch } = require(`bun`);

// curl http://localhost:11434/api/generate -d '{
//  "model": "llama2",
//  "prompt": "Why is the sky blue?"
// }'

const { redCake } = require('./utilitys.js');

var log = [];

// Define your API endpoint
const apiEndpoint = `http://localhost:11434/api/chat`; // local host
const model = `locke`; // custom ai

const lol = async (_data)=>{
    var checker;
    var t = `📦`
    if(_data.channel){
        t = `🗨️`;
    }
    var rc = new redCake(`${t}`);
    rc.log(`${_data.username} -> ${_data.message}`);

    const postData = {
        "model": `${model}`,
        // "prompt": `${_data}`, for use in generate mode.
        // "format": "json",
        "stream": false, // Might work on <---------
        "messages": [
            {
                "role": "user",
                "content": `${_data.message}`
            }
        ],
    };

    log.forEach((l)=>{
        postData.messages.push(l);
    });

    rc.startLoading(`Generating: `);

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postData) 
    });

    setTimeout(()=>{
        if(!response){
            checker = setInterval(() => {
                rc.stopLoading(`🚚 In transit..`);
                if(_data.channel){
                    _data.channel.sendTyping();
                }
                rc.startLoading(`..A bit longer then usual: `);
            }, 10000);
        }
    }, 10000)

    rc.stopLoading(`[✅] Transaction complete.\n`); // stop loading.
    if (response.ok) {
        clearInterval(checker);
        checker = null;

        const rd = await response.json();
        // console.log(rd);
        var reply = `${rd.message.content}`; // generated text
        rc.log(`Server <- ${reply}`)
        if(reply){
            log.push(rd.message); // log history
            return `${reply}`;
        }else{
            log = [];
            var payload = {username: `Server`, message: `You appologize for not understanding.`};
            return await lol(payload);
        }
    } else {
        rc.log(`Server <- ${response.statusText}`);
        return `I was unable to compute that.`;
    }

    
};

module.exports = { lol };