import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("original", schema);

export default model;
