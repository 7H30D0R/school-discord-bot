import fs from 'fs';
import Command from './Command';
import Client from './Client';

class CommandLoader {
    commands = {};

    path = "./commands/";

    constructor() {
        this.load();
    }

    load = () => {
        this.loadDirectory();

        let groups = fs.readdirSync(this.path);
        for (let group of groups) {
            let isDirectory = fs.lstatSync(this.path + group).isDirectory();
            if (!isDirectory) continue;

            this.loadDirectory(this.path + group);
        } 
        
        Client.commands = this.commands;
    }

    loadDirectory = (path) => {
        let commands = fs.readdirSync(this.path + group);

        for (let file of commands) {
            let filePath = this.path + (path || '') + file;

            let isDirectory = fs.lstatSync(filePath).isDirectory();
            let isJavascriptFile = file.slice(-3) === '.js';

            if (isDirectory || !isJavascriptFile) continue;

            let command;
            try {
                command = require("." + path);
            } catch(e) {
                logger.warn(e);
                continue;
            }

            initialize(command);
        }

    }

    initialize = (CommandChild) => {
        if (!CommandChild || !(CommandChild.prototype instanceof Command)) return;
        if (CommandChild.name === undefined) continue;

        CommandChild.prototype.constructor = function(...args) {
            this.super(...args);
        }

        let command = new CommandChild();
        command.onStart();

        this.commands[CommandChild.name] = command;
    }
}

export default CommandLoader;