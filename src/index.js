import Test from './Models/test.js';
import Discord from 'discord.js';
import { CLIENT_TOKEN, COMMAND_PREFIX, REACTION_NUMBERS, DBCONFIG } from './config.js';
import Database from './Classes/database';
import dotenv from 'dotenv';

// Load environment config file
dotenv.config();

// Initialize database connection
Database.connect(DBCONFIG["HOST"], DBCONFIG["USER"], DBCONFIG["PASS"], DBCONFIG["NAME"]);

// Initialize Discord client
const client = new Discord.Client();
client.login(CLIENT_TOKEN);

// TODO: Clean and rewrite everything below
// From old project

// test
let test = Test.where("column_one", 1).orderBy('column_two', 'DESC').limit(1);

console.log(test.buildQuery());

client.on('ready', () => {
    console.log(`Connected to Discord as ${client.user.tag}!`);
    
    client.user.setActivity("you!", {type: "WATCHING"});
});

client.on('message', onCommand);

async function onCommand(message) {
    if (message.author == client.user) return;
    if (!message.content.startsWith(COMMAND_PREFIX)) return;

    var command = message.content.substring(COMMAND_PREFIX.length).split(' ')[0];
    var params = message.content.substring(COMMAND_PREFIX.length).split(' ');

    switch (command) {
        case "help":
        case "commands":
            var commandText = "";
            commandText += "\n" + COMMAND_PREFIX + "help - List all commands (alias: " + COMMAND_PREFIX + "commands)";
            commandText += "\n" + COMMAND_PREFIX + "beginstory - Start the storyline";
            commandText += "\n" + COMMAND_PREFIX + "resumestory - Resume the storyline";
            commandText += "\n" + COMMAND_PREFIX + "resetstory - Resets the storyline";

            message.channel.send({embed: {
                color: 3447003,
                title: "Commands",
                description: "Here's a list of all available commands.\n" + commandText
            }});
            break;
        case "question":
            
            let botMessage = await message.channel.send({embed: {
                color: 3447003,
                title: "Question",
                description: `What is the meaning of life, the universe and everything?
                1⃣: 36
                2⃣: 42`
            }});

            await botMessage.react(REACTION_NUMBERS[1]);
            await botMessage.react(REACTION_NUMBERS[2]);

            const filter = (reaction, user) => {
                return REACTION_NUMBERS.includes(reaction.emoji.name) && user.id === message.author.id;
            };

            botMessage.awaitReactions(filter, {max: 1, time: 60000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
                var optionId = REACTION_NUMBERS.indexOf(reaction.emoji.name);

                message.channel.send({embed: {
                    color: 3447003,
                    title: (optionId == 1) ? "Incorrect" : "Correct",
                    description: (optionId == 1) ? `You are an idiot!` : "Good job!"
                }});
            }).catch(collected => {
            });

            break;
    }
}