import Model from "../classes/database/Model";
import Questions from "./Questions";

export default class Quizzes extends Model {
    static table = "quizzes";
    static fillable = ["title", "description", "public", "category_id"];
    
    constructor() {
        super(...arguments);
    }

    /**
     * Fetch the questions in this quiz.
     * @returns {Promise.<Questions[]>} Array of questions in this quiz.
     */
    questions = () => {
        return Questions.where('quiz_id', this.id).inRandomOrder().get();
    }
}