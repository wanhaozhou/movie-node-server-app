import mongoose from "mongoose";

const movieReviewSchema = new mongoose.Schema(
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
		review: {
			type: String,
			required: true,
		},
		title: {
			type: String,
		},
		poster_path: {
			type: String,
		},
	},
	{ collection: "movieReview" },
);

export default movieReviewSchema;
