import model from "./model.js";

export const find = async () => model.find();

export const create = async (data) => model.create(data);
