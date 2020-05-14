import Quizzes from './models/Quizzes';
import Client from './classes/Client';
import { REACTION_NUMBERS, DB_CONFIG, COMMAND_PREFIX, CLIENT_TOKEN } from './config';
import Database from './classes/database';

// Initialize database connection
Database.connect(DB_CONFIG).then(async () => {

    // Initialize Discord client
    Client.initialize();

}).catch((error) => { console.log(error); });



