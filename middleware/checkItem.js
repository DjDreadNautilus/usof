export const checkItem = (model, param) => {
    return async (req, res, next) => {
        try {

            let id = req.params[param];
            if(model.table_name === "users" && !id) {
                id = req.user.user_id;
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