import * as dao from "./dao.js";
import { findById } from "./dao.js";

const BASE_PATH = "/api/original";

const OriginalRoutes = (app) => {
	app.post(`${BASE_PATH}`, async (req, res) => {
		try {
			const result = await dao.createOriginal(req.body);
			res.json(result);
		} catch (error) {
			res.status(400).json({ error });
		}
	});

	app.get(`${BASE_PATH}/similar/:q`, async (req, res) => {
		try {
			const result = await dao.findSimilar(req.params.q);
			res.json(result);
		} catch (error) {
			res.status(400).json({ error });
		}
	});

	app.get(`${BASE_PATH}/user/:user`, async (req, res) => {
		try {
			const { user } = req.params;
			const result = await dao.findByUser(user);
			res.json(result);
		} catch (error) {
			res.status(400).json({ error });
		}
	});

	app.get(`${BASE_PATH}/id/:id`, async (req, res) => {
		try {
			const { id } = req.params;
			const result = await dao.findById(id);
			res.json(result);
		} catch (error) {
			res.status(400).json({ error });
		}
	});

	app.put(`${BASE_PATH}/:id`, async (req, res) => {
		try {
			const result = await dao.updateOriginal(req.params.id, req.body);
			res.json(result);
		} catch (error) {
			res.status(400).json({ error });
		}
	});

	app.delete(`${BASE_PATH}/:id`, async (req, res) => {
		try {
			const result = await dao.deleteOriginal(req.params.id);
			res.json(result);
		} catch (error) {
			res.status(400).json({ error });
		}
	});
};

export default OriginalRoutes;
