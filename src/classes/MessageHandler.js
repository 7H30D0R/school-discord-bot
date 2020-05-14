import { COMMAND_PREFIX } from "../config";
import Discord from 'discord.js';


import Client from './Client';

/**
 * Handles Discord messages.
 */
class MessageHandler {
    /**
     * Associated Discord client.
     */
    bot;

    /**
     * Constructs the Message Handler class.
     * @param {Discord.Client} bot Discord client
     */
    constructor(bot) {
        this.bot = bot;
        this.addListeners();
    }
    
    /**
     * Registers listeners to Discord message events.
     */
    addListeners = () => {
        this.bot.on('message', this.onMessage);
    }

    /**
     * Handles Discord message event.
     * @param {Discord.Message} message Discord message.
     */
    onMessage = (message) => {
        if (message.content.startsWith(COMMAND_PREFIX)) {
            this.onCommand(message);
        }
    }

    /**
     * Executes a command based on a Discord message.
     * @param {Message} message Discord message containing the command
     */
    onCommand = (message) => {
        let params = message.content.substring(COMMAND_PREFIX.length).split(' ');
        let commandName = params[0];
        
        if (!Client.commandsByAlias.hasOwnProperty(commandName)) return;

        let command = Client.commandsByAlias[commandName];
        command.onExec(message, params);
    }   
}

export default MessageHandler;