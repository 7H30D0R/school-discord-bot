import Builder from "./builder";

export default class Model {
    constructor() {
        // Abstract class
        if (new.target === Model) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }      
    }

    /**
     * Adds a binding to the query.
     * @param {*} value The value to be inserted into binding
     * @param {*} type The type of binding to insert the value into
     */
    static addBinding(value, type) {
        
        return new Builder(this).addBinding(value, type);
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
    static limit = (limit) => {
        return new Builder(this).limit(limit);
    }

    /**
     * Gets all records based on the current query.
     */
    static get = () => {
        return new Builder(this).get();
    }

    /**
     * Gets the first record based on the current query.
     */
    static first = () => {
        return new Builder(this).first();
    }
}