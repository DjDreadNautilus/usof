const Model = require("./Model");

class Post extends Model {
    static table_name = "posts";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = Post;