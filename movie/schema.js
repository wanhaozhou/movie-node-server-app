import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
	{
		id: { type: Number, unique: true, required: true },
		backdrop_path: String,
		poster_path: String,
		original_title: String,
		release_date: String,
		genres: [],
		vote_average: Number,
		overview: String,
	},
	{ collection: "movie" },
);

export default movieSchema;
