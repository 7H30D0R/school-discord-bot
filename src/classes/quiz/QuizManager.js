import { REACTION_NUMBERS } from '../../config';
import Client from '../Client';
import QuizView from '../../views/QuizView';

// TODO: Clean class
// TODO: Only allow one quiz at a time per channel.
/**
 * Quiz Manager responsible for starting a quiz.
 */
export default class QuizManager {

    playerScores = {};
    questionIndex = 0;

    constructor(quiz, message) {
        this.quiz = quiz;
        this.message = message;
    }

    /**
     * Start the quiz.
     */
    start = async () => {
        // Get quiz questions
        this.questions = await this.quiz.questions();

        // Send start quiz message
        let embed = QuizView.startQuiz(this.quiz.title, this.quiz.description, this.questions.length);
        let message = await this.message.channel.send(embed);

        // Send reaction buttons
        await message.react(CHECKMARK_EMOJI);
        await message.react(CANCEL_EMOJI);
        
        // Filter for reactions, only accept valid buttons and only from the message author
        let filter = (reaction, user) => {
            return [CHECKMARK_EMOJI, CANCEL_EMOJI].includes(reaction.emoji.name) && user.id === this.message.author.id;
        };

        // Wait for button reaction
        message.awaitReactions(filter, {max: 1, time: 60000, errors: ['time'] }).then(collected => {
            let reaction = collected.first();

            // Start quiz if checkmark reaction
            if (reaction.emoji.name == CHECKMARK_EMOJI) {
                this.nextQuestion();
                return;
            }
            
            // Cancel quiz
            this.message.channel.send(QuizView.cancelQuiz());
        }).catch(collected => {
            // Timed out, cancel quiz
            this.message.channel.send(QuizView.cancelQuiz());
        });
    }

    /**
     * Display next question.
     */
    nextQuestion = async () => {
        // Return if this is called after the quiz is over
        if (this.questionIndex >= this.questions.length) {
            return;
        }

        // Prepare question
        let question = this.questions[this.questionIndex];
        let answers = await question.answers();

        let answerMessage = "";
        let validAnswers = [];

        // Prepare answers
        for (let index in answers) {
            let answer = answers[index];
            let reaction = REACTION_NUMBERS[Number(index) + 1];
            
            validAnswers.push(reaction);
            answerMessage += `${reaction} - ${answer.caption}\n`;

            if (answer.correct) {
                this.correctAnswerReaction = reaction;
                this.correctAnswer = answer;
            }
        }

        // Show question message
        let embed = QuizView.showQuestion(this.questionIndex + 1, this.questions.length, question.caption, answerMessage);
        let questionMessage = await this.message.channel.send(embed);

        // Reaction filter, only allow valid buttons
        let filter = (reaction, user) => {
            return validAnswers.includes(reaction.emoji.name);
        }
        
        let userAnswers = {};
        
        // Start collecting reactions
        let collector = questionMessage.createReactionCollector(filter, { time: 60000 });

        // Collect user answer
        collector.on('collect', (reaction, user) => {
            if (user.bot) return;

            userAnswers[user.id] = reaction.emoji.name;
            reaction.users.remove(user);
        });

        // Time ended
        collector.on('end', (collected) => {
            // Add scores from this round to player scores
            for (let user in userAnswers) {
                if (!this.playerScores.hasOwnProperty(user)) {
                    this.playerScores[user] = 0;
                }

                if (this.correctAnswerReaction == userAnswers[user]) {
                    this.playerScores[user]++;
                }
            }

            // End question
            this.questionIndex++;
            this.questionOver(question, this.questionIndex >= this.questions.length);
        });
        
        // Display buttons
        for (let emoji of validAnswers) {
            await questionMessage.react(emoji);
        }

        // Start timer when the buttons have been displayed
        collector.resetTimer({ time: 15000 });
    }

    /**
     * Display question over message and prepare next question.
     */
    questionOver = async (question, quizOver) => {
        var playerScores = this.playerScores;

        // Sort users
        let sortedUsers = Object.keys(playerScores).sort(function(a,b){return playerScores[b]-playerScores[a]});

        // Get usernames by id
        let usernames = {};

        for (let id of sortedUsers) {
            let user = await Client.connection.users.fetch(id);
            usernames[id] = user.username;
        }

        // Send question ended message
        let embed = QuizView.questionEnded(quizOver, 
                                           this.correctAnswerReaction, 
                                           this.correctAnswer.caption,
                                           playerScores,
                                           sortedUsers,
                                           usernames);

        this.message.channel.send(embed);

        // Start next question if quiz is not over
        if (!quizOver) {
            setTimeout(this.nextQuestion, 3000);
        }
    }

}

const CHECKMARK_EMOJI = "✅",
      CANCEL_EMOJI = "❌";