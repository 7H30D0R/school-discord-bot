import dotenv from 'dotenv';

// Load environment config file
dotenv.config();

module.exports = {
    COMMAND_PREFIX: '!',

    CLIENT_TOKEN: process.env.CLIENT_TOKEN,
    
    DBCONFIG: {
        HOST: process.env.MYSQL_HOST,
        USER: process.env.MYSQL_USER,
        PASS: process.env.MYSQL_PASS,
        NAME: process.env.MYSQL_DATABASE
    },

    REACTION_NUMBERS: [
        "0⃣",
        "1⃣",
        "2⃣",
        "3⃣",
        "4⃣",
        "5⃣",
        "6⃣",
        "7⃣",
        "8⃣",
        "9⃣",
    ],


}