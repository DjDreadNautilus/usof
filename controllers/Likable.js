const BaseController = require("./BaseController");
const Like = require("../models/Like");

class Likable extends BaseController {
    constructor(model, target) {
        super(model);
        this.target = target;
    }

    createLike = async (req, res) => {
        try {
            const id = req.params[this.target];
            const user = req.user;
            const type = req.body.type;

            console.log(type);

            const lookup = await Like.find({[this.target]: id, user_id: user.user_id});

            if(lookup) {
                await lookup.delete();
                if(lookup.type === type) {
                    return res.status(200).json({error: "Rating deleted"});
                }
            }

            const like = new Like({user_id: user.user_id, [this.target]: id, type: type, created_at: new Date()});
            console.log(like);
            
            await like.save();

            res.status(200).json(like);
        } catch(err) {
            res.status(500).json({error: err.message}); 
        }
    }

    getLikes = async (req, res) => {
        try {
            const id = req.params[this.target];

            const likes = await Like.getAll({[this.target]: id });

            res.status(200).json({likes: likes, message: "Got likes from post!"});
        } catch(err) {
           res.status(500).json({error: err.message}); 
        }
    }

    deleteLike = async (req, res) => {
        try {
            const id = req.params[this.target];
            const user = req.user;
            const like = await Like.find({[this.target]: id, user_id: user.user_id});

            if(!like) {
                return res.status(404).json({error: "Like not found"});
            }

            await like.delete();

            res.status(200).json({likes: like, message: "Got likes from post!"});
        } catch(err) {
           res.status(500).json({error: err.message}); 
        }
    }
}

module.exports = Likable;