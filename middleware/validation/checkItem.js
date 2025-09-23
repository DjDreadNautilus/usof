export const checkItem = (model, param) => {
    return async (req, res, next) => {
        try {
            const id = req.params[param]
            const item = await model.find({id: id});

            if(!item) {
                return res.status(404).json({message: "item not found"});
            }

            req.item = item;
            next();
        } catch(err) {
            next(err)
        }
    }   
} 