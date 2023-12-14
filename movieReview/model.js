import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("movieReview", schema);

export default model;
