import Model from "../classes/database/Model";
import Answers from "./Answers";

export default class Questions extends Model {
    static table = "questions";
    static fillable = ["quiz_id", "caption", "type"];
    
    constructor() {
        super(...arguments);
    }

    /**
     * Fetches all possible answers to the question.
     * @returns {Promise.<Answers[]>} Array of answers to the question.
     */
    answers = () => {
        return Answers.where('question_id', this.id).inRandomOrder().get();
    }

    /**
     * Fetches one correct answer to the question.
     * @returns {Promise.<Answers>} Answer model for the correct answer.
     */
    correctAnswer = () => {
        return Answers.where('question_id', this.id).where('correct', 1).first();
    }
}