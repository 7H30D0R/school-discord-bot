import Model from "../Classes/model.js";

export default class Test extends Model {
    static table = "quizzes";
    static fillable = ["title", "description", "public"];
    
    constructor() {
        super(arguments);
    }


}