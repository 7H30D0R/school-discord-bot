import Model from "../classes/database/Model";
import Quizzes from "./Quizzes";

export default class Categories extends Model {
    static table = "categories";
    static fillable = ["name"];
    
    constructor() {
        super(...arguments);
    }

    /**
     * Fetch quizzes in this category.
     * @param {number} [limit=10] Maximum amount of quizzes to be returned.
     * @returns {Promise.<Quizzes[]>} List of quizzes in this category.
     */
    quizzes = (limit) => {
        if (limit === undefined) {
            limit = 10;
        }

        return Quizzes.limit(limit).where('public', 1).where('category_id', this.id).inRandomOrder().get();
    }
}