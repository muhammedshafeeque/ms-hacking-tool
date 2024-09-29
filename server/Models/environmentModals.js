import mongoose from "mongoose";
import { collections } from "../Config/constants.js";
const environmentModel = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    path:{ type: String, required: true, unique: true },
    script: [{ type: mongoose.Schema.ObjectId, ref: collections.SCRIPT_MODAL }],
    environmentScripts: [
      { type: mongoose.Schema.ObjectId, ref: collections.SCRIPT_MODAL },
    ],
    update: { type: mongoose.Schema.ObjectId, ref: collections.SCRIPT_MODAL },
  },
  {
    timestamps: true,
  }
);

export const ENVIRONMENT = mongoose.model(
  collections.ENVIRONMENT_MODEL,
  environmentModel
);
