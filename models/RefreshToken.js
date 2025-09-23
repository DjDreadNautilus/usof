import Model from "./Model.js";

class RefreshToken extends Model {
    static table_name = "refresh_tokens";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default RefreshToken;