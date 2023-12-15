import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("company", schema);

export default model;
