import dotenv from 'dotenv';

// Load environment config file
dotenv.config();

module.exports = {
    COMMAND_PREFIX: '!',

    CLIENT_TOKEN: process.env.CLIENT_TOKEN,
    
    DB_CONFIG: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT || 3306
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