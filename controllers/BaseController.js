import { recalculateUserRating } from "../utils/recalculateUserRating.js";

class BaseController {
    constructor(model) {
        this.model = model;
    }

    getAll = async (req, res) => {
        try {
            if (req.posts) {
                return res.json(req.posts);
            }
            const items = await this.model.getAll({});
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getById = async (req, res) => {
        try {
            const id = Object.values(req.params)[0];
            const item = await this.model.find({ id });

            if (!item) {
                return res.status(404).json({ message: "Not found" });
            }

            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    delete = async (req, res) => {
        try {
            const id = Object.values(req.params)[0];
            const item = await this.model.find({ id });

            if (!item) {
                return res.status(404).json({ message: "Not found" });
            }
            await item.delete();
            console.log(item);
            await recalculateUserRating(item.user_id);
            res.json({ status: "Success", message: "Deleted" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}

export default BaseController;