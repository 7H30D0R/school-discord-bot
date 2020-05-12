import dotenv from 'dotenv';
import { ConnectionConfig } from 'mysql';

// Load environment config file
dotenv.config();

/**
 * Prefix to be used for commands in the Discord bot.
 * @type {string}
 */
const COMMAND_PREFIX = '!';

/**
 * Discord client token.
 * @type {string}
 */
const CLIENT_TOKEN = process.env.CLIENT_TOKEN;

/**
 * MySQL connection configuration
 * @type {ConnectionConfig}
 */
const DB_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306
};

/**
 * Reaction number emojis for Discord (0-9).
 */
const REACTION_NUMBERS = [ "0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", ];

export { COMMAND_PREFIX, CLIENT_TOKEN, DB_CONFIG, REACTION_NUMBERS };