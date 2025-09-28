import Model from "./Model.js";

class Notification extends Model {
    static table_name = "notifications";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default Notification;