import Model from "./Model.js";

class PostCategories extends Model {
    static table_name = "post_categories";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default PostCategories;