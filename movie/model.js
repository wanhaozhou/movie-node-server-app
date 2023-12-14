import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("movie", schema);

export default model;
