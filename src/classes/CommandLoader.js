import fs from 'fs';
import Command from './Command';
import Client from './Client';

class CommandLoader {
    commands = {};
    commandsByAlias = {};

    path = "./src/commands/";

    constructor() {
        this.load();
    }

    load = () => {
        this.loadDirectory(this.path);

        let groups = fs.readdirSync(this.path);
        for (let group of groups) {
            let isDirectory = fs.lstatSync(this.path + group).isDirectory();
            if (!isDirectory) continue;

            this.loadDirectory(this.path + group);
        } 
        
        Client.commands = this.commands;
        Client.commandsByAlias = this.commandsByAlias;
    }

    loadDirectory = (path) => {
        let commands = fs.readdirSync(path);

        for (let file of commands) {
            let filePath = path + file;

            let isDirectory = fs.lstatSync(filePath).isDirectory();
            let isJavascriptFile = file.slice(-3) === '.js';

            if (isDirectory || !isJavascriptFile) continue;

            let command;
            try {
                command = require("../." + filePath);
                //let fileContents = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
                //console.log(fileContents);
            } catch(e) {
                console.log(e);
                continue;
            }

            this.initialize(command.default);
        }

    }

    initialize = (CommandChild) => {
        if (!CommandChild || !(CommandChild.prototype instanceof Command)) return;

        let command = new CommandChild();

        if (command.disabled || command.name === undefined) {
            return;
        }

        command.onStart();

        this.commands[command.name] = command;
        this.commandsByAlias[command.name] = command;

        for (let alias of command.aliases) {
            this.commandsByAlias[alias] = command;
        }

        console.log(`Loaded command ${command.name}!`);
    }
}

export default CommandLoader;