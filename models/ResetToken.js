import Model from "./Model.js";

class ResetToken extends Model {
    static table_name = "reset_tokens";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default ResetToken;