import * as dao from "./dao.js";

const BASE_PATH = "/api/users";

const UsersRoutes = (app) => {
	const signin = async (req, res) => {
		const { username, password } = req.body;
		try {
			const currentUser = await dao.findUserByCredentials(
				username,
				password,
			);
			if (!currentUser) {
				res.status(400).json({ error: "Invalid credentials" });
			} else {
				req.session["currentUser"] = currentUser;
				res.json(currentUser);
			}
		} catch (error) {
			res.status(400).json({ error });
		}
	};
	app.post(`${BASE_PATH}/signin`, signin);

	const account = async (req, res) => {
		res.json(req.session["currentUser"]);
	};
	app.get(`${BASE_PATH}/account`, account);

	const signout = async (req, res) => {
		req.session.destroy();
		res.json(200);
	};
	app.post(`${BASE_PATH}/signout`, signout);

	const createUser = async (req, res) => {
		try {
			const user = await dao.findUserByUsername(req.body.username);
			if (user) {
				res.status(400).json({ error: "Username already exists" });
				return;
			}
			const body = req.body;
			body.active = true;
			body.avatar = Math.floor(Math.random() * 5);
			await dao.createUser(body);
			res.sendStatus(200);
		} catch (error) {
			res.status(400).json({ error });
		}
	};
	app.post(BASE_PATH, createUser);

	const findByUsername = async (req, res) => {
		const username = req.params.username;
		const currentUser = req.session["currentUser"];
		let user;
		if (currentUser && currentUser.username === username) {
			user = await dao.findUserByUsername(username);
		} else {
			// public info only
			user = await dao.findUserByUsernamePublic(username);
		}
		if (!user) {
			res.status(404).json({ error: "User does not exist" });
			return;
		}
		res.json(user);
	};
	app.get(`${BASE_PATH}/username/:username`, findByUsername);

	const update = async (req, res) => {
		const currentUser = req.session["currentUser"];
		const { userId } = req.body;
		if (!currentUser && String(currentUser._id) !== userId) {
			res.status(404).json({ error: "Not Autorized" });
			return;
		}
		try {
			await dao.updateUser(userId, req.body.userData);
			req.session["currentUser"] = await dao.findUserById(userId);
			res.sendStatus(200);
		} catch (error) {
			res.status(404).json({ error });
		}
	};
	app.put(`${BASE_PATH}`, update);

	const all = async (req, res) => {
		dao.findAllUsers()
			.then((ans) => res.json(ans))
			.catch((error) => res.status(400).json({ error }));
	};
	app.get(`${BASE_PATH}`, all);

	const updateActive = async (req, res) => {
		const currentUser = req.session["currentUser"];
		if (!currentUser) {
			res.status(400).json({ error: "Not allowed" });
			return;
		}
		const actual = await dao.findUserById(currentUser._id);
		if (!actual || actual.role !== "ADMIN") {
			res.status(400).json({ error: "Not allowed" });
			return;
		}
		try {
			const { userId, userData } = req.body;
			await dao.updateUser(userId, userData);
			res.sendStatus(200);
		} catch (error) {
			res.status(404).json({ error });
		}
	};
	app.put(`${BASE_PATH}/active`, updateActive);
};

export default UsersRoutes;
