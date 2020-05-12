import mysql from 'mysql';

/**
 * Database class holds the MySQL database connection in a static and global manner.
 */
export default class Database {
    static connection;

    static connect(host, user, password, database) {
        Database.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
    }


}