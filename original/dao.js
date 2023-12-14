import model from "./model.js";

export const createOriginal = async (data) => model.create(data);

export const deleteOriginal = async (_id) =>
	model.updateOne({ _id }, { delete: true });

export const updateOriginal = async (_id, data) =>
	model.updateOne({ _id }, data);

export const findByUser = async (user) => model.find({ user, delete: false });

export const findById = async (_id) =>
	model.findOne({ _id, delete: false }).populate("user");

export const findSimilar = async (q) =>
	model.find({
		$or: [{ title: new RegExp(q, "i") }, { overview: new RegExp(q, "i") }],
	});
