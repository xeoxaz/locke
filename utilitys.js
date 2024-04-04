
const cliSpinners = require('cli-spinners');

var clc = require("cli-color");
const fs = require('fs');

export class redCake {

    constructor(_moduleName) {
        this.module = _moduleName;
        this.tag = `${clc.white("[")}${clc.blue(this.module)}${clc.white("]")}`;
    }
    
    startLoading(_data){
        if(this.id){
            this.stopLoading(clc.cyanBright(`Override Accepted.`));
        }
        // https://github.com/sindresorhus/cli-spinners/blob/HEAD/spinners.json
        // var s = cliSpinners.bouncingBar;
        
        var s = cliSpinners.bouncingBall;

        // var s = cliSpinners.line;
        var i = 0;
        this.id = setInterval(() => {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`${this.tag} ${clc.bold(_data)}${clc.redBright(s.frames[i])} `);
            i++;
            if(i > s.frames.length - 1){ i = 0 };
        }, 500);
    };

    stopLoading(_data){
        clearInterval(this.id);
        this.id = null;
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        if(_data){
            process.stdout.write(`${this.tag} ${clc.redBright(_data)}`);
            // this.log(`${clc.greenBright(_data)}`);
        }
    };

    log(_data){
        var style = {
            data : clc.white(_data)
        }
        console.log(`${this.tag} ${style.data}`);
    };

    clear(){
        process.stdout.write(clc.erase.screen);
    };

    post(){
        try {
            const data = fs.readFileSync('./ascii.txt', 'utf-8');
            const lines = data.split(/\r?\n/); // Split by newline characters
            lines.forEach((line) => {
                console.log(line); // Process each line here
            });
        } catch (error) {
            console.error('Error reading the file:', error.message);
        }
    }
}