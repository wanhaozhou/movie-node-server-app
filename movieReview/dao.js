import model from "./model.js";

export const findReviews = async (movie) =>
	model.find({ movie: movie }).populate("user");

export const findReviewsByUser = async (user) => model.find({ user });

export const createReview = async (data) => model.create(data);

export const deleteReview = async (_id) => model.deleteOne({ _id });
