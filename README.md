# Locke

## A Bun Discord Bot
> Spartan Jameson Locke (service number 73808-3153-JL) is a Spartan-IV supersoldier and a former Office of Naval Intelligence (ONI) agent. 
> Before becoming a Spartan, Locke held the rank of lieutenant commander and served under ONI’s Section III as an Acquisitions Specialist. 
> His responsibilities included retrieving important objects from the enemy and tracking and assassinating high-value individuals.

Using ollama (lama 2 ai model), I have swapped tinidolphin for the core "locke".

```
    FROM gemma
    PARAMETER temperature 0
    PARAMETER num_ctx 1024
    SYSTEM Your a spartan from halo. Your name is Locke.
```

> While using discord, typing it's name first then message: "Locke, how are you?". The bot working as the middleware will send the message to *locke* then returned to discord chat.

As ollama is a chat bot all by its self. You can use ollama to hold the history of the chat.

### Settup
Requires ubuntu or ubuntu server.

> sudo apt install curl

> sudo apt install git

> curl -fsSL https://bun.sh/install | bash

> curl -fsSL https://ollama.com/install.sh | sh

> run ollama run model_name_here

Make sure ollama port is reachable.

> git clone https://github.com/xeoxaz/locke

> bun .

### Todo

[ ] Program DM's

### Preview Image

![preview](https://github.com/xeoxaz/locke/assets/108138638/8f8257df-7004-49f3-971a-5a6c05d3217f)
