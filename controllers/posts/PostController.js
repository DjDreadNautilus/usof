import Post from "../../models/Posts.js";
import Likable from "../Likable.js";

import { postService } from "../../services/postService.js";
import { commentService } from "../../services/commentService.js";
import { categoryService } from "../../services/categoryService.js";
import { subscriptionService } from "../../services/subscriptionService.js";

class PostController extends Likable {
    constructor() {
        super(Post, "post_id");
    }

    createPost = async (req, res) => {
        try {
            const { title, content, categories } = req.updates;
            const user = req.user;

            const imagePaths = (req.files && req.files.length > 0) 
                ? req.files.map(f => `/storage/posts/${f.filename}`) 
                : [];

            const post = await postService.createPost(user.user_id, title, content, categories, imagePaths);

            res.status(200).json({ post, message: "Successfully created a post!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    updatePost = async (req, res) => {
        try {
            const post = req.item;

            req.updates = req.updates || {};
            
            if (req.files && req.files.length > 0) {
                req.updates.images = req.files.map(f => `/storage/posts/${f.filename}`);
            }

            const updatedPost = await postService.updatePost(post, req.updates);
            await subscriptionService.notifySubscribers(post.id, "post_updated", updatedPost);
            
            res.status(200).json({updatedPost, message: "Post updated"});
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }

    getCategories = async (req, res) => {
        try {
            const { post_id } = req.params;

            const categories = await categoryService.getCategoriesByPostId(post_id);

            res.status(200).json({ categories, message: "Got categories from post!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    createComment = async (req, res) => {
        try {
            const post = req.item;
            
            const user = req.user;
            const { content } = req.updates;

            const comment = await commentService.createComment(user.user_id, post.id, content);
            await subscriptionService.notifySubscribers(post.id, "new_comment", comment);

            res.status(200).json({comment, message: "Comment successfully created!"});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    addFavorite = async (req, res) => {
        try {
            const post = req.item;
            const user = req.user;

            const favorite = await postService.addFavorite(post.id, user.user_id);

            if(!favorite) {
                return res.status(200).json({message: "Deleted favorite"});
            }

            res.status(200).json({favorite, message: "Favorited the post!"})
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }

    async getComments(req, res) {
        try {
            const { post_id } = req.params;

            const comments = await commentService.getCommentsByPostId(post_id);

            if(!comments) {
                return res.status(404).json({erorr: "No comments"});
            }

            res.status(200).json({comments, message: "Got comments from post!"});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
//perenesi potom v servis
    getAllFiltered = async (req, res) => {
        try {
            const query = req.query;
            let status = "active";
            let favorites = "";
            
            if(req.user && query.favorites) {
                favorites = req.user.user_id;
            }
            if(req.user && req.user.role === "admin") {
                status = ""
            }
            let category_ids = [];
            if (query.category_ids) {
                category_ids = query.category_ids.split(",").map(id => parseInt(id));
            }   

            const limit = query.limit ? parseInt(query.limit) : 5;
            const page = query.page ? parseInt(query.page) : 1;

            const filters = {
                category_ids,
                favorites: favorites,
                status: status,
                created_from: query.created_from,
                created_to: query.created_to,
            };

            Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
            console.log(filters);

            const posts = await postService.getAllFiltered({
                page: page,
                limit: limit,
                filters: filters,
            });
            res.json(posts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    getAllFavorites = async (req, res) => {
        try {
            const user = req.user;

            const favorites = postService.getAllFavorite(user.user_id);
            if(!favorites) {
                return res.status(404).json({error: "No favorites found"});
            }
            res.status(200).json({favorites, message: "Got favorites"})
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }

    subscribeToPost = async (req, res) => {
        try {
            const user = req.user;
            const post = req.item;

            const subscribe = await postService.subscribeToPost(user.user_id, post.id);

            res.status(200).json({subscribe, message: "Subscribed to post"});
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new PostController();