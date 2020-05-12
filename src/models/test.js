import Model from "../classes/database/model";

export default class Test extends Model {
    static table = "quizzes";
    static fillable = ["title", "description", "public"];
    
    constructor() {
        super(...arguments);
    }


}