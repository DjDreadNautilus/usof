import Post from "../../models/Posts.js";
import Likable from "../Likable.js";

import { postService } from "../../services/postService.js";
import { commentService } from "../../services/commentService.js";
import { categoryService } from "../../services/categoryService.js";
import { subscriptionService } from "../../services/subscriptionService.js";
import { userService } from "../../services/userService.js";

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

            const validSortFields = ["created_at", "rating", "title", "updated_at"]; 
            const sort_by = validSortFields.includes(query.sort_by) ? query.sort_by : "rating";
            const order = query.order && query.order.toUpperCase() === "ASC" ? "ASC" : "DESC";

            const filters = {
                category_ids,
                favorites,
                status,
                user_id: query.user_id,
                created_from: query.created_from,
                created_to: query.created_to,
            };

            Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

            console.log({ filters, sort_by, order });

            const { rows, total } = await postService.getAllFiltered({
                page,
                limit,
                filters,
                sort_by,
                order,
            });

            const totalPages = Math.ceil(total / limit);
  

            const posts = await Promise.all(
                rows.map(async (post) => {
                    console.log("Fetching categories for post", post.id);
                    const categories = await categoryService.getCategoriesByPostId(post.id);
                    console.log("Fetching authors for post", post.id);
                    const user = await userService.getUserById(post.user_id);

                    const author = {
                        id: user.id,
                        login: user.login,
                        fullname: user.fullname,
                    };

                    return { ...post, categories, author };
                })
            );

            console.log(posts)

            res.json({
                pagination: {
                    totalItems: total,
                    totalPages,
                    currentPage: page,
                    limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                },
                data: posts
            });

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

    getById = async (req, res) => {
        try {
            const post = req.item;
            const categories = await categoryService.getCategoriesByPostId(post.id);

            res.status(200).json({post, categories, message: "Got the post"});
        } catch(err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new PostController();