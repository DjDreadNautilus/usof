export const checkItem = (model, param) => {
    return async (req, res, next) => {
        try {
            let id = req.user.user_id;
            if(req.params[param]) {
                id = req.params[param]
            }
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