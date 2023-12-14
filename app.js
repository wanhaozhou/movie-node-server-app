import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";

import HelloRoutes from "./hello/routes.js";
import ContextRoutes from "./context/routes.js";
import UsersRoutes from "./users/routes.js";
import FollowRoutes from "./follow/routes.js";
import FavoriteMovieRoutes from "./favoriteMovie/routes.js";
import MovieReviewRoutes from "./movieReview/routes.js";
import OriginalRoutes from "./original/routes.js";

const DB_CONNECTION =
	process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/movie";
const SESSION_OPTIONS = {
	secret: "any string",
	resave: false,
	saveUninitialized: false,
};
if (process.env.FRONTEND_URL) {
	SESSION_OPTIONS.proxy = true;
	SESSION_OPTIONS.cookie = {
		sameSite: "none",
		secure: true,
	};
}

mongoose
	.connect(DB_CONNECTION)
	.then(() => console.log(`Connected to DB: ${DB_CONNECTION}`))
	.catch((e) => console.error(e));

const app = express();
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URL
			? new RegExp(`.*${process.env.FRONTEND_URL}.*`)
			: "http://localhost:3000",
	}),
);

app.use(session(SESSION_OPTIONS));
app.use(express.json());

HelloRoutes(app);
ContextRoutes(app);
UsersRoutes(app);
FollowRoutes(app);
FavoriteMovieRoutes(app);
MovieReviewRoutes(app);
OriginalRoutes(app);

app.listen(process.env.PORT || 4000);
