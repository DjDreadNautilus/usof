const Model = require("./Model");

class Comment extends Model {
    static table_name = "comments";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = Comment;