import Discord from 'discord.js';
import { CLIENT_TOKEN } from '../config';
import CommandLoader from './CommandLoader';
import MessageHandler from './MessageHandler';

class Client {

    static initialized = false;

    static connection;

    static commandLoader;

    static commands;

    static initialize(options) {
        this.connection = new Discord.Client();
        this.connection.login(CLIENT_TOKEN);

        this.commandLoader = new CommandLoader();
        this.messageHandler = new MessageHandler(connection);

        this.initialized = true;
    }

}

export default Client;