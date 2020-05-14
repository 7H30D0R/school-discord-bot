import Command from '../classes/Command';

class HelpCommand extends Command {
    name = "help";
    aliases = ["commands"];

    onStart = () => {
        console.log("hey from help");
    }

    exec = ( message, params ) => {
        console.log("help executed");

        message.channel.send({embed: {
            color: 3447003,
            title: "Commands",
            description: "Here's a list of all available commands.\n - Help"
        }});
    }
}

export default HelpCommand;