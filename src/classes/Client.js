import Discord from 'discord.js';
import { CLIENT_TOKEN } from '../config';
import CommandLoader from './CommandLoader';
import MessageHandler from './MessageHandler';
import Command from './Command';

/**
 * Manages the Discord client and associated classes. (Static)
 */
class Client {

    /**
     * Whether the Discord connection has been initialized.
     * @type {boolean}
     */
    static initialized = false;

    /**
     * Discord bot client connection.
     * @type {Discord.Client}
     */
    static connection;

    /**
     * Command loader responsible for loading commands.
     * @type {CommandLoader}
     */
    static commandLoader;

    /**
     * List of available commands, mapped by name.
     */
    static commands;

    /**
     * List of available commands, mapped by aliases.
     */
    static commandsByAlias;

    static initialize(options) {
        Client.connection = new Discord.Client();
        Client.connection.login(CLIENT_TOKEN);

        Client.commandLoader = new CommandLoader();
        Client.messageHandler = new MessageHandler(Client.connection);

        Client.initialized = true;

        Client.addListeners();
    }

    static addListeners() {
        Client.connection.on('ready', Client.onReady);
    }

    static onReady() {
        console.log(`Connected to Discord as ${Client.connection.user.tag}!`);
        Client.connection.user.setActivity("you!", {type: "WATCHING"});
    }

}

export default Client;