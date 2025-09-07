class BaseController {
    constructor(model) {
        this.model = model;
    }

    getAll = async (req, res) => {
        try {
            const items = await this.model.getAll();
            res.json(items);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    getById = async (req, res) => {
        try {
            const item = await this.model.find({id: req.params.id});
            res.json(item);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    }

    delete = async (req, res) => {
        try {
            const item = await this.model.find({id: req.params.id});
            if (!item) return res.status(404).json({ error: "Not found" });
            await item.delete();
            res.json({message: "Deleted."});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = BaseController;