import User from "../models/User.js";
import Hash from "./Hash.js";

export const userService = {
    createUser: async (login, fullname, password, email, role = "user") => {
        const hashedPassword = await Hash.hash(password, 10);
        const user = new User({
            login,
            fullname,
            password: hashedPassword,
            email,
            role: role,
            rating: 0
        });
        await user.save();
        return user;
    }, 

    updateUser: async (user, updates) => {
        if (updates.password) {
            updates.password = await Hash.hash(updates.password, 10);
        }

        await user.update(updates);

        return user;
    }
}