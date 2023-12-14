import * as followDao from "../follow/dao.js";
import * as favoriteMovieDao from "../favoriteMovie/dao.js";
import * as movieReviewDao from "../movieReview/dao.js";
import * as originalDao from "../original/dao.js";

const BASE_PATH = "/api/context";

const ContextRoutes = (app) => {
	const context = async (req, res) => {
		const data = {
			currentUser: null,
			latestReviews: [],
			following: [],
			follower: [],
			favorite: [],
			reviews: [],
			published: [],
		};

		data.latestReviews = []; // TODO
		if (!req.session["currentUser"]) {
			res.json(data);
			return;
		}
		data.currentUser = req.session["currentUser"];
		data.following = await followDao.findFollowing(data.currentUser._id);
		data.follower = await followDao.findFollowers(data.currentUser._id);
		data.favorite = await favoriteMovieDao.findByUser(data.currentUser._id);
		data.reviews = await movieReviewDao.findReviewsByUser(
			data.currentUser._id,
		);
		if (data.currentUser.role === "CREATOR") {
			data.published = await originalDao.findByUser(data.currentUser._id);
		}
		res.json(data);
	};
	app.get(BASE_PATH, context);
};

export default ContextRoutes;
