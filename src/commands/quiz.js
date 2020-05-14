import Command from '../classes/Command';
import Categories from '../models/Categories';
import { COMMAND_PREFIX } from '../config';
import Discord, { MessageEmbed } from 'discord.js';
import Quizzes from '../models/Quizzes';
import QuizManager from '../classes/quiz/QuizManager';

export default class Quiz extends Command {
    name = "quiz";
    aliases = ["q"];

    exec = async ( message, params ) => {
        if (params.length === 1) {
            this.printQuizzes(message, params);
            return;
        }

        if (isNaN(params[1])) {
            this.printQuizzes(message, params);
            return;
        }
        

        let quiz = await Quizzes.where('id', Number(params[1])).first();

        if (quiz === null) {
            message.channel.send({embed: {
                color: '#FF2D00',
                title: "Fejl",
                description: "Quizzen blev ikke fundet."
            }});
            return;
        }

        let quizManager = new QuizManager(quiz, message);
        quizManager.start();
    }

    printQuizzes = async (message, params) => {
        let categories = await Categories.get();

        let embed = new MessageEmbed()
            .setColor(3447003)
            .setTitle("Quizzer")
            .setDescription("Liste af tilgængelige quizzer.");
        
        for (let category of categories) {
            let quizzes = await category.quizzes();

            if (quizzes.length === 0) {
                continue;
            }

            let fieldMessage = "";

            for (let quiz of quizzes) {
                fieldMessage += ` - ${quiz.title} (${quiz.id})\n`
            }

            embed.addField(category.name, fieldMessage);
        }

        embed.setFooter(`${COMMAND_PREFIX}quiz <id>`);

        message.channel.send(embed);
    }
}