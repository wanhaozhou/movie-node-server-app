import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
	{
		out_: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		in_: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
	},
	{ collection: "follow" },
);

export default followSchema;
