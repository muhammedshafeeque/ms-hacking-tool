import express from "express";
import {
  addScriptFromGit,
  getScriptById,
  getScripts,
  getScriptTypes,
  uploadSCript,
} from "../Controller/scriptController.js";
const router = express.Router();
router.post("/clone-repo", addScriptFromGit);
router.post("/script", uploadSCript);
router.get("/script", getScripts);
router.get("/script-type", getScriptTypes);
router.get('/script/:id',getScriptById)
export const scriptRouter = router;
