import mongoose from "mongoose";

const originalSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		title: { type: String, required: true },
		overview: { type: String, required: true },
		link: { type: String, required: true },
		creationDate: { type: String, required: true },
		delete: { type: Boolean, default: false },
	},
	{ collection: "original" },
);

export default originalSchema;
