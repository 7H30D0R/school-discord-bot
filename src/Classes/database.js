import mysql from 'mysql';
// This might be a bad design pattern, but it's only for internal use.

/**
 * Holds a single static MySQL database connection.
 */
export default class Database {
    /**
     * MySQL Server connection
     * @type MySQL
     */
    static connection;

    /**
     * Whether the connection with the MySQL server has started.
     */
    static hasConnected = false;

    /**
     * Connects to the specified MySQL server.
     * @param {*} connectionConfig MySQL connection configuration.
     */
    static connect(connectionConfig) {
        return new Promise((resolve, reject) => {
            Database.connection = mysql.createConnection(connectionConfig);

            Database.connection.connect((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                Database.hasConnected = true;
                console.log('Connected to MySQL database!');

                resolve();
            });
        });
    }


}