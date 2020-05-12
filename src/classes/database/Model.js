import Database from ".";
import Builder from "./Builder";

export default class Model {
    /**
     * Whether this is new data to be inserted in the database.
     * @type {boolean}
     */
    isNewRow = false;

    constructor(data) {
        // Abstract class
        if (new.target === Model) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        // Create model with new data
        if (data !== undefined && typeof(data) === 'object') {
            this.isNewRow = true;

            this.fillModelFromData(data);
        }
    }
    
    /**
     * Adds a where binding to the query.
     * @param {*} key The column to compare.
     * @param {*} value The value to compare.
     * @param {*} operator The operator to be used in comparing.
     */
    static where(key, value, operator) {
        return new Builder(this).where(key, value, operator);
    }

    /**
     * Adds an order by binding to the query.
     * @param {*} column Order column
     * @param {*} direction Order direction (ASC/DESC)
     */
    static orderBy(column, direction) {
        return new Builder(this).orderBy(column, direction);
    }

    /**
     * Adds a limit to the number of records being returned.
     * @param {Number} limit The maximum number of records to be fetched.
     */
    static limit(limit) {
        return new Builder(this).limit(limit);
    }

    /**
     * Gets all records based on the current query.
     */
    static get() {
        return new Builder(this).get();
    }

    /**
     * Gets the first record based on the current query.
     */
    static first() {
        return new Builder(this).first();
    }

    /**
     * Save changes in data.
     */
    save = () => {
        // TODO: Clean method

        // Insert instead if new row
        if (this.isNewRow) {
            return this.insert();
        }

        return new Promise((resolve, reject) => {
            // TODO: Support table without primary keys
            if (this.primaryKey === null) {
                reject(new Error("Table does not have a primary key."));
                return;
            }

            // Return if model has no fillable columns
            if (typeof(this.constructor.fillable) !== 'object' 
                || this.constructor.fillable.length === 0) {

                reject(new Error("Model does not have any fillable columns"));
                return;
            }

            // Generate update query
            let query = `UPDATE ${this.constructor.table} SET `;
            let parameters = [];

            // Add columns and data to query
            let i = 0;
            for (let column in this.data) {
                if (column == this.primaryKey || !this.constructor.fillable.includes(column)) continue;

                query += (i !== 0) ? ", " : "";
                query += `${column} = ?`;
                parameters.push(this.data[column]);

                i++;
            }

            // Return if no data has been added
            if (i === 0) {
                reject(new Error("Model does not have any fillable columns"));
                return;
            }

            // Add "where" part to query
            query += ` WHERE ${this.primaryKey} = ?`;
            parameters.push(this.data[this.primaryKey]);

            // Exectue query
            Database.connection.query(query, parameters, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    /**
     * Insert new data into database
     */
    insert = () => {
        // You can only insert if this is a new row.
        if (!this.isNewRow) return;

        return new Promise((resolve, reject) => {
            // Return if model has no fillable columns
            if (typeof(this.constructor.fillable) !== 'object' 
                || this.constructor.fillable.length === 0) {

                reject(new Error("Model does not have any fillable columns"));
                return;
            }

            // Generate insert query
            let query = `INSERT INTO ${this.constructor.table} (`;
            let parameters = [];
            
            // Add columns to query
            let i = 0;
            for (let column in this.data) {
                if (column == this.primaryKey || !this.constructor.fillable.includes(column)) continue;

                query += (i !== 0) ? ", " : "";
                query += `${column}`;
                parameters.push(this.data[column]);

                i++;
            }

            query += ") VALUES ?";

            // Return if no data has been added
            if (i === 0) {
                reject(new Error("Model does not have any fillable columns"));
                return;
            }

            // Execute query
            Database.connection.query(query, [[parameters]], (error, result, fields) => {
                if (error) {
                    reject(error);
                    return;
                }

                let selectQuery = `SELECT * FROM ${this.constructor.table} WHERE id = ? LIMIT 1`;
                Database.connection.query(selectQuery, [result.insertId], (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    let result = results[0];
                    this.fillModelFromData(result, fields);

                    resolve();
                });
            });

        });
    }

    fillModelFromData = (data, fields) => {
        if (fields !== undefined) {
            // Find primary key
            for (let field of fields) {
                let isPrimaryKey = (field.flags & PRI_KEY_FLAG) == PRI_KEY_FLAG;

                if (isPrimaryKey) {
                    this.primaryKey = field.name;
                    break;
                }
            }
        }

        if (typeof(this.data) !== 'object') {
            this.data = {};
        }

        for (let column in data) {
            this.data[column] = data[column];

            // Don't override default fields
            if (this.hasOwnProperty(column)) {
                continue;
            }

            // Create getter and setter with column name (ignore setter if column is primary key)
            Object.defineProperty(this, column, {
                get: function() { return this.data[column]; },
                set: (this.primaryKey == column) ? undefined : function(value) { this.data[column] = value; }
            });
        }
    }
}

const PRI_KEY_FLAG = 2;