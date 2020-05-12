import { COMMAND_PREFIX } from "../config";


import Client from './Client';

class MessageHandler {
    bot;

    constructor(bot) {
        this.bot = bot;
        this.addListeners();
    }

    addListeners = () => {
        this.bot.on('message', this.onMessage);
    }

    onMessage = (message) => {
        if (message.content.startsWith(COMMAND_PREFIX)) {
            this.onCommand(message);
        }
    }

    onCommand = (message) => {
        let params = message.content.substring(COMMAND_PREFIX.length).split(' ');
        let commandName = params[0];

        if (!Client.commands.hasOwnProperty(commandName)) continue;

        let command = Client.commands[commandName];
        
    }   
}

export default MessageHandler;