const Model = require("./Model");

class Like extends Model {
    static table_name = "likes";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = Like;