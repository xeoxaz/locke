// https://github.com/ollama/ollama/blob/main/docs/api.md
// 
// Now using ollama ai

const { fetch } = require(`bun`);
const { log } = require('./utilitys.js') // log ext..

// curl http://localhost:11434/api/generate -d '{
//  "model": "llama2",
//  "prompt": "Why is the sky blue?"
// }'

// Define your API endpoint
const apiEndpoint = `http://localhost:11434/api/chat`; // local host
const model = `locke`; // custom ai

const lol = async (_data)=>{
    log(`Locke -> ${_data}`);

    const postData = {
        "model": `${model}`,
        // "prompt": `${_data}`, for use in generate mode.
        // "format": "json",
        "stream": false,
        "messages": [
            {
                "role": "user",
                "content": `${_data}`
            }
        ],
    };

    log(`Locke: Please wait..`);
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postData) 
    });
    
    // Handle the response
    if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        var reply = `${responseData.message.content}`;
        log(`Locke: ${reply}`)
        return `${reply}`;
    } else {
        log(`Locke: ${response.statusText}`);
        return `I was unable to compute that.`;
    }
};

module.exports = { lol };