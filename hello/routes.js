const HelloRoutes = (app) => {
	app.get("/hello", (req, res) => {
		res.send("Hello World!");
	});
};

export default HelloRoutes;
