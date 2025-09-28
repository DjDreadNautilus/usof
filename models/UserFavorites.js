import Model from "./Model.js";

class UserFavorites extends Model {
    static table_name = "user_favorites";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default UserFavorites;