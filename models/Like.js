import Model from "./Model.js";

class Like extends Model {
    static table_name = "likes";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default Like;