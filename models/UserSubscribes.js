import Model from "./Model.js";

class UserSubscribes extends Model {
    static table_name = "user_subscribes";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default UserSubscribes;