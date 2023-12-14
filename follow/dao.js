import model from "./model.js";

export const follow = async (out_, in_) => model.create({ out_, in_ });

export const unFollow = async (out_, in_) => model.deleteOne({ out_, in_ });

export const findFollowing = async (out_) =>
	model.find({ out_ }).populate("in_");

export const findFollowers = async (in_) =>
	model.find({ in_ }).populate("out_");

export const findOne = async (out_, in_) => model.findOne({ out_, in_ });
