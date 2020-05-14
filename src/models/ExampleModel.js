import Model from "../classes/database/Model";

/**
 * Example model showing how models are set up.
 */
export default class ExampleModel extends Model {
    /**
     * Table name to base the model on.
     * @type {string}
     */
    static table = "example_table";

    /**
     * Fillable columns, columns where you can input data manually.
     * @type {string[]}
     */
    static fillable = ["title", "description", "public", "category_id"];
    
    /**
     * Constructor sending arguments to parent, used when filling new data.
     */
    constructor() {
        super(...arguments);
    }


}