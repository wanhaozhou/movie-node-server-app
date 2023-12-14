import * as dao from "./dao.js";
import * as movieDao from "../movie/dao.js";
import * as userDao from "../users/dao.js";

const BASE_PATH = "/api/favoriteMovie";

const FavoriteMovieRoutes = (app) => {
	const addFavorite = async (req, res) => {
		const { user, movie, data } = req.body;
		const exist = await dao.findByUserAndMovie(user, movie);
		if (exist) {
			res.sendStatus(200);
			return;
		}
		try {
			const entry = await movieDao.findByTmdbId(movie);
			if (entry) {
				await movieDao.updateTmdbMovie(entry._id, data);
			} else {
				await movieDao.createTmdbMovie(data);
			}
			await dao.addFavorite(user, movie);
		} catch (error) {
			res.status(400).json({ error });
			return;
		}
		res.sendStatus(200);
	};
	app.post(`${BASE_PATH}/add`, addFavorite);

	const removeFavorite = async (req, res) => {
		const { user, movie } = req.body;
		dao.removeFavorite(user, movie)
			.then(() => res.sendStatus(200))
			.catch((error) => res.status(400).json({ error }));
	};
	app.post(`${BASE_PATH}/remove`, removeFavorite);

	const fetchFavorite = async (req, res) => {
		try {
			const user = await userDao.findUserByUsername(req.params.user);
			const favorites = await dao.findByUser(user._id);
			res.json(
				await Promise.all(
					favorites.map(
						async (f) => await movieDao.findByTmdbId(f.movie),
					),
				),
			);
		} catch (error) {
			res.status(400).json({ error });
		}
	};
	app.get(`${BASE_PATH}/fetch/:user`, fetchFavorite);
};

export default FavoriteMovieRoutes;
