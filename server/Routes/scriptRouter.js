import express from "express";
import {
  addScriptFromGit,
  getScripts,
  getScriptTypes,
  uploadSCript,
} from "../Controller/scriptController.js";
const router = express.Router();
router.post("/clone-repo", addScriptFromGit);
router.post("/script", uploadSCript);
router.get("/script", getScripts);
router.get("/script-type", getScriptTypes);
export const scriptRouter = router;
