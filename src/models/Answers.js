import Model from "../classes/database/Model";

export default class Answers extends Model {
    static table = "answers";
    static fillable = ["question_id", "caption", "correct", "regex"];
    
    constructor() {
        super(...arguments);
    }


}