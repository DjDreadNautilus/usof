const Model = require("./Model");

class ResetToken extends Model {
    static table_name = "reset_tokens";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = ResetToken;