import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
	{
		_id: { type: Number, required: true, unique: true },
		description: { type: String },
		headquarters: { type: String },
		name: { type: String },
	},
	{ collection: "company" },
);

export default companySchema;
