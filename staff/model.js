import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("staff", schema);

export default model;
