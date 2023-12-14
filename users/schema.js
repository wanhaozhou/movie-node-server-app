import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["ADMIN", "FAN", "CREATOR"],
			default: "FAN",
			required: true,
		},
		email: { type: String }, // sensitive
		dateOfBirth: { type: String }, // sensitive
		avatar: { type: Number, required: true }, // 0 - 4
		active: { type: Boolean, default: true, required: true },
	},
	{ collection: "users" },
);
export default userSchema;
