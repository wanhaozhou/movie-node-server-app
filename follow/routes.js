import * as dao from "./dao.js";
import * as userDao from "../users/dao.js";

const BASE_PATH = "/api/follow";

const FollowRoutes = (app) => {
	const follow = async (req, res) => {
		const { out_, in_ } = req.body;
		if (out_ === in_) {
			res.status(400).json({ error: "Cannot follow yourself" });
			return;
		}
		const exist = await dao.findOne(out_, in_);
		if (exist) {
			res.sendStatus(200);
			return;
		}
		dao.follow(out_, in_)
			.then(() => res.sendStatus(200))
			.catch((error) => res.status(400).json({ error }));
	};
	app.post(BASE_PATH, follow);

	const unfollow = async (req, res) => {
		const { out_, in_ } = req.body;
		dao.unFollow(out_, in_)
			.then(() => res.sendStatus(200))
			.catch((error) => res.status(400).json({ error }));
	};
	app.post(`${BASE_PATH}/unfollow`, unfollow);

	const findFollowing = async (req, res) => {
		const { out_ } = req.body;
		dao.findFollowing(out_)
			.then((ans) => res.json(ans))
			.catch((error) => res.status(400).json({ error }));
	};
	app.post(`${BASE_PATH}/following`, findFollowing);

	const findFollowingByUsername = async (req, res) => {
		const { username } = req.body;
		const user = await userDao.findUserByUsername(username);
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		dao.findFollowing(user._id)
			.then((ans) => res.json(ans))
			.catch((error) => res.status(400).json({ error }));
	};
	app.post(`${BASE_PATH}/following/username`, findFollowingByUsername);

	const findFollowers = async (req, res) => {
		const { in_ } = req.body;
		dao.findFollowers(in_)
			.then((ans) => res.json(ans))
			.catch((error) => res.status(400).json({ error }));
	};
	app.post(`${BASE_PATH}/follower`, findFollowers);

	const findFollowersByUsername = async (req, res) => {
		const { username } = req.body;
		const user = await userDao.findUserByUsername(username);
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}
		dao.findFollowers(user._id)
			.then((ans) => res.json(ans))
			.catch((error) => res.status(400).json({ error }));
	};
	app.post(`${BASE_PATH}/follower/username`, findFollowersByUsername);
};

export default FollowRoutes;
