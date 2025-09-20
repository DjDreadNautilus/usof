import Model from "./Model.js";

class Category extends Model {
    static table_name = "categories";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default Category;