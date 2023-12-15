import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
	{
		_id: { type: Number, required: true, unique: true },
		cast: [],
		crew: [],
	},
	{ collection: "staff" },
);

export default staffSchema;
