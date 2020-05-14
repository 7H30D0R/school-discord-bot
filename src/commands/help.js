import Command from '../classes/Command';

class HelpCommand extends Command {
    name = "help";
    aliases = ["commands"];

    // TODO: Automate command list, add command descriptions
    exec = ( message, params ) => {
        message.channel.send({embed: {
            color: 3447003,
            title: "Commands",
            description: "Here's a list of all available commands.\n - !help\n - !quiz"
        }});
    }
}

export default HelpCommand;