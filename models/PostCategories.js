const Model = require("./Model");

class PostCategories extends Model {
    static table_name = "post_categories";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = PostCategories;