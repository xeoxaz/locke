// https://github.com/ollama/ollama/blob/main/docs/api.md
// 
// Now using ollama ai

const { fetch } = require(`bun`);

// curl http://localhost:11434/api/generate -d '{
//  "model": "llama2",
//  "prompt": "Why is the sky blue?"
// }'

const {redCake} = require('./utilitys.js');
var rc = new redCake(`AI`);

var log = [];

// Define your API endpoint
const apiEndpoint = `http://localhost:11434/api/chat`; // local host
const model = `locke`; // custom ai



const lol = async (_data)=>{
    rc.log(`${_data.username} -> ${_data.message}`);

    const postData = {
        "model": `${model}`,
        // "prompt": `${_data}`, for use in generate mode.
        // "format": "json",
        "stream": false,
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
    rc.stopLoading(`Generation Complete!`); // stop loading.
    if (response.ok) {
        const rd = await response.json();
        // console.log(rd);
        var reply = `${rd.message.content}`; // generated text
        log.push(rd.message); // log history
        rc.log(`Locke: ${reply}`)
        if(reply){
            return `${reply}`;
        }else{
            return `...`;
        }
    } else {
        rc.log(`Locke: ${response.statusText}`);
        return `I was unable to compute that.`;
    }

    
};

module.exports = { lol };