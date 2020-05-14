import Command from '../classes/Command';
import { COMMAND_PREFIX } from '../config';

class HelpCommand extends Command {
    name = "help";
    aliases = ["commands"];

    // TODO: Automate command list, add command descriptions
    exec = ( message, params ) => {
        message.channel.send({embed: {
            color: 3447003,
            title: "Commands",
            description: `Here's a list of all available commands.\n - ${COMMAND_PREFIX}help\n - ${COMMAND_PREFIX}quiz`
        }});
    }
}

export default HelpCommand;