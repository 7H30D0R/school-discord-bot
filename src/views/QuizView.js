import Discord, { MessageEmbed } from 'discord.js';

export default class QuizView {

    static startQuiz(title, description, length) {
        let embed = new MessageEmbed()
            .setColor(3447003)
            .setTitle(title)
            .setDescription(`Ønsker du at starte denne quiz?`)
            .addField("Beskrivelse", description)
            .addField('Antal spørgsmål', length);
        
        return embed;
    }

    static cancelQuiz() {
        return 'Quiz annulleret';
    }

    static showQuestion(currentQuestion, quizLength, caption, answers) {
        let embed = new MessageEmbed()
            .setColor(0x1BDC00)
            .setTitle(`Spørgsmål ${currentQuestion} / ${quizLength}`)
            .setDescription(`**${caption}**`)
            .setFooter(`Du har 15 sekunder til at besvare spørgsmålet.`)
            .addField('Svarmuligheder', answers);

        return embed;
    }

    static questionEnded(quizOver, answerReaction, answer, scores, sortedUsers, usernames) {
        let leaderboard = "";

        for (let index in sortedUsers) {
            let id = sortedUsers[index];
            leaderboard += `**${Number(index) + 1}.** ${usernames[id]} - **${scores[id]}**\n`;
        }

        let embed = new MessageEmbed()
            .setColor(3447003)
            .setTitle((quizOver) ? `Quizzen er slut` : `Tiden er udløbet`)
            .setDescription(`Det korrekte svar var:\n${answerReaction} - **${answer}**`)
            .setFooter((quizOver) ? `Tak for spillet!` : `Det næste spørgsmål begynder om 3 sekunder`)
            .addField('Leaderboard', leaderboard || "Ingen svar.");

        return embed;
    }
}