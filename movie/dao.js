import model from "./model.js";

export const findByTmdbId = async (id) => model.findOne({ id });

export const createTmdbMovie = async (tmdbData) => model.create(tmdbData);

export const updateTmdbMovie = async (_id, tmdbData) =>
	model.updateOne({ _id }, { $set: tmdbData });
