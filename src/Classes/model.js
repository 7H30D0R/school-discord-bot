import Builder from "./builder";
import Database from './database';

export default class Model {
    constructor() {
        // Abstract class
        if (new.target === Model) {
            throw new TypeError("Cannot construct Abstract instances directly");
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
        // TODO: Support saving new data (insert statements)

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

            // TODO: Remove debug lines
            console.log(query);
            console.log(parameters);

            // Exectue query
            Database.connection.query(query, parameters, (error) => {
                if (error) {
                    // TODO: Remove debug line
                    console.log(error);
                    reject(error);
                    return;
                }

                // TODO: Remove debug line
                console.log("Saved");

                resolve();
            });
        });
    }
}