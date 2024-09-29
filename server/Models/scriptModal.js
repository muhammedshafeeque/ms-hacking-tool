import mongoose from "mongoose";
import { collections } from "../Config/constants.js";
const scriptModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String },
    scriptType: {
      type: String,
      enum: [
        "environment",
        "test-execution",
        "exploit-execution",
        "update",
        "scanning-execution",
      ],
      required: true,
    },
    environment:{ type: mongoose.Schema.ObjectId, ref: collections.ENVIRONMENT_MODEL},
    executionOrder:{type:Number}
  },
  {
    timestamps: true,
  }
);
export const SCRIPT = mongoose.model(collections.SCRIPT_MODAL, scriptModel);
