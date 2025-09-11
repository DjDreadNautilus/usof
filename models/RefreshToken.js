const Model = require("./Model");

class RefreshToken extends Model {
    static table_name = "refresh_tokens";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = RefreshToken;