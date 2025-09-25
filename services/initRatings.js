import User from "../models/User.js";
import { recalculateUserRating } from "./recalculateUserRating.js";

export const initRatings = async () => {
  const users = await User.getAll();
  for (const user of users) {
    await recalculateUserRating(user.id);
  }
  console.log("Ratings initialized for all users");
};