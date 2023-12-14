import model from "./model.js";

export const addFavorite = async (user, movie) => model.create({ user, movie });

export const removeFavorite = async (user, movie) =>
	model.deleteOne({ user, movie });

export const findByUserAndMovie = async (user, movie) =>
	model.findOne({ user, movie });

export const findByUser = async (user) => model.find({ user });
