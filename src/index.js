import Quizzes from './models/Quizzes';
import Client from './classes/Client';
import { REACTION_NUMBERS, DB_CONFIG, COMMAND_PREFIX, CLIENT_TOKEN } from './config';
import Database from './classes/database';

// Initialize database connection
Database.connect(DB_CONFIG).then(async () => {
    let quizzes = await Quizzes.inRandomOrder().first();

    console.log(quizzes.id);

    let questions = await quizzes.questions();

    for (let question of questions) {
        let answer = await question.correctAnswer();
        console.log(`${question.caption} = ${answer.caption}`);
    }

    // Initialize Discord client
    Client.initialize();
}).catch((error) => { console.log("big error"); console.log(error); });



