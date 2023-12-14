import model from "./model.js";

export const createUser = async (user) => model.create(user);

export const findAllUsers = async () => model.find();

export const findUserById = async (id) => model.findById(id);

export const findUserByUsername = async (username) =>
	model.findOne({ username });

export const findUserByUsernamePublic = async (username) =>
	model.findOne({ username }, { dateOfBirth: false, email: false });

export const findUserByCredentials = async (username, password) =>
	model.findOne({ username, password });

export const updateUser = async (id, user) =>
	model.updateOne({ _id: id }, user);

export const deleteUser = async (userId) => model.deleteOne({ _id: userId });
