import mongoose from "mongoose";

const favoriteMovieSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		movie: {
			type: Number,
			required: true,
		},
	},
	{ collection: "favoriteMovie" },
);

export default favoriteMovieSchema;
