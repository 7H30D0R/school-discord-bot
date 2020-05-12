import Database from "./database";

/**
 * Builds a query, executes and returns the base model.
 */
export default class Builder {
    // TODO: Update and insert statements

    /**
     * The current query bindings.
     */
    bindings = {
        where: [],
        order: [],
    };;

    /**
     * The maximum number of records to return.
     */
    _limit;

    /**
     * Array of columns to be returned.
     */
    columns;

    /**
     * Final query string.
     */
    query;

    /**
     * Final query arguments (variables to be send alongside).
     */
    queryArguments;

    /**
     * The base Model class to be built and returned.
     */
    base;

    /**
     * The table to be fetched.
     */
    table;

    /**
     * Constructs the Builder class.
     * @param {function} base Base Model class to be built and returned.
     */
    constructor(base) {
        if (typeof(base) !== 'function') {
            throw new TypeError("Builder needs a base model!");
        }

        this.table = base.table;
        this.base = base;
    }

    /**
     * Adds a binding to the query.
     * @param {*} value The value to be inserted into binding
     * @param {*} type The type of binding to insert the value into
     */
    addBinding = (value, type) => {
        if (!this.bindings.hasOwnProperty(type)) {
            throw new Error(`Invalid binding type: ${type}.`);
        }

        this.bindings[type].push(value);
    }

    /**
     * Builds a final query string and array of arguments to be used in MySQL.
     */
    buildQuery = () => {
        // TODO: Clean method

        let query = "SELECT ";
        let queryArguments = [];

        // Add columns to be selected
        if (this.columns === undefined || this.columns.length === 0) {
            query += "* ";
        } else {
            query += `${this.columns.join(",")} `;
        }

        // Add table to select from
        query += "FROM " + this.table + " ";
        
        // Add where bindings
        if (this.bindings.where.length > 0) {
            query += "WHERE ";
        }

        for (let i = 0; i < this.bindings.where.length; i++) {
            let binding = this.bindings.where[i];

            query += `${binding.key} ${binding.operator} ?`;
            queryArguments.push(binding.value);

            if (i < this.bindings.where.length - 1) {
                query += ",";
            }

            query += " ";
        }

        // Add order by bindings
        if (this.bindings.order.length > 0) {
            query += "ORDER BY ";
        }

        for (let i = 0; i < this.bindings.order.length; i++) {
            let binding = this.bindings.order[i];

            query += `${binding.column} ${binding.direction}`;

            if (i < this.bindings.where.length - 1) {
                query += ", ";
            }

            query += " ";
        }
        
        // Add limit
        if (this._limit !== undefined) {
            query += "LIMIT " + this._limit;
        }

        // Remove last space
        if (query[query.length - 1] === ' ') {
            query = query.substring(0, query.length - 1);
        }

        this.query = query;
        this.queryArguments = queryArguments;
        return { query: query, arguments: queryArguments };
    }
    
    /**
     * Adds a where binding to the query.
     * @param {*} key The column to compare.
     * @param {*} value The value to compare.
     * @param {*} operator The operator to be used in comparing.
     */
    where = (key, value, operator) => {
        // TODO: Operator validation

        if (operator === undefined) {
            operator = '=';
        }

        let bindingValue = {
            key: key,
            operator: operator,
            value: value
        }

        this.addBinding(bindingValue, 'where');
        return this;
    }

    /**
     * Adds an order by binding to the query.
     * @param {*} column Order column
     * @param {*} direction Order direction (ASC/DESC)
     */
    orderBy = (column, direction) => {
        if (direction === undefined) {
            direction = "ASC";
        }

        direction = direction.toUpperCase();

        if (!["ASC", "DESC"].includes(direction)) {
            throw new Error(`Invalid order direction: ${direction}.`);
        }

        let bindingValue = {
            column: column,
            direction: direction
        }

        this.addBinding(bindingValue, 'order');
        return this;
    }

    /**
     * Adds a limit to the number of records being returned.
     * @param {Number} limit The maximum number of records to be fetched.
     */
    limit = (limit) => {
        this._limit = limit;
        return this;
    }

    /**
     * Gets all records based on the current query.
     */
    get = () => {
        return new Promise((resolve, reject) => {
            
        });
    }

    /**
     * Gets the first record based on the current query.
     */
    first = () => {
        let previousLimit = this._limit;

        this.limit(1);
        this.buildQuery();
        this.limit(previousLimit);

        // TODO: Remove debug line
        console.log(this.query);

        return new Promise((resolve, reject) => {
            Database.connection.query(this.query, this.queryArguments, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    reject(error);
                    return;
                }

                let result = results[0];

                // Create new model instance
                let model = new this.base();
                model.data = {};

                // Find primary key
                for (let field of fields) {
                    let isPrimaryKey = (field.flags & PRI_KEY_FLAG) == PRI_KEY_FLAG;

                    if (isPrimaryKey) {
                        model.primaryKey = field.name;
                        break;
                    }
                }

                // Set primary key to null if not exists
                if (model.primaryKey === undefined) {
                    model.primaryKey = null;
                }

                // Insert data into model
                for (let column in result) {
                    model.data[column] = result[column];

                    // Don't override default fields
                    if (model.hasOwnProperty(column)) {
                        console.log(`Skipped column ${key} - the model already has a field with the same name.`);
                        continue;
                    }

                    // Create getter and setter with column name (ignore setter if column is primary key)
                    Object.defineProperty(model, column, {
                        get: function() { return this.data[column]; },
                        set: (model.primaryKey == column) ? undefined : function(value) { this.data[column] = value; }
                    });
                }

                resolve(model);
            });
        });
        // return promise
    }
}

const PRI_KEY_FLAG = 2;