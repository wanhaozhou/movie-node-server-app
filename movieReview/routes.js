import * as dao from "./dao.js";
import * as userDao from "../users/dao.js";

const BASE_PATH = "/api/movieReview";

const MovieReviewRoutes = (app) => {
	const fetchReviews = async (req, res) => {
		const { movieId } = req.params;
		try {
			const data = await dao.findReviews(parseInt(movieId));
			res.json(data);
		} catch (error) {
			res.status(400).json({ error });
		}
	};
	app.get(`${BASE_PATH}/:movieId`, fetchReviews);

	const createReview = async (req, res) => {
		try {
			const userFound = await userDao.findUserById(req.body.user);
			if (!userFound || !userFound.active) {
				res.status(400).json({ error: "You are blocked the admin." });
				return;
			}
			await dao.createReview(req.body);
			res.sendStatus(200);
		} catch (error) {
			res.status(400).json({ error });
		}
	};
	app.post(`${BASE_PATH}`, createReview);

	const deleteReview = async (req, res) => {
		try {
			await dao.deleteReview(req.params.reviewId);
			res.sendStatus(200);
		} catch (error) {
			res.status(400).json({ error });
		}
	};
	app.delete(`${BASE_PATH}/:reviewId`, deleteReview);

	const fetchReviewsByUser = async (req, res) => {
		try {
			const user = await userDao.findUserByUsername(req.params.username);
			if (!user) {
				res.status(400).error({ error: "No user" });
				return;
			}
			const data = await dao.findReviewsByUser(user._id);
			res.json(data);
		} catch (error) {
			res.status(400).json({ error });
		}
	};
	app.get(`${BASE_PATH}/user/:username`, fetchReviewsByUser);
};

export default MovieReviewRoutes;
