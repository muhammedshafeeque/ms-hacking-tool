import simpleGit from "simple-git";
const directory = "./Public/";
import fs from "fs";
import { ENVIRONMENT } from "../Models/environmentModals.js";
import { SCRIPT } from "../Models/scriptModal.js";
import { scriptTypes } from "../Config/constants.js";
import { convertObjectToArray } from "../Services/scriptService.js";

export const uploadSCript = async (req, res, next) => {
  try {
    let script = {
      name: req.body.name,
      comment: req.body.comment,
      scriptType: req.body.scriptType,
    };
    let command = await SCRIPT.create(script);
    res.send(command);
  } catch (error) {
    next(error);
  }
};
export const addScriptFromGit = async (req, res, next) => {
  const git = simpleGit();
  const repoUrl = req.body.repoUrl;
  let dir = `${directory}${req.body.name}`;

  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    await git.clone(repoUrl, dir);
    let updateScript = await SCRIPT.create({
      name: `${req.body.name} update script`,
      comment: `git pull`,
      scriptType: scriptTypes.UPDATE,
    });
    let env = await ENVIRONMENT.create({
      name: req.body.name,
      path: dir,
      update: updateScript._id,
    });
    if (req.body.environment_script && req.body.environment_script.length) {
      let scripts = [];
      for (let i = 0; i < req.body.environment_script.length; i++) {
        const script = req.body.environment_script[i];
        scripts.push({
          name: `${i} command in ${req.body.name} environment`,
          scriptType: scriptTypes.ENV,
          comment: script,
          environment: env._id,
          executionOrder: i,
        });
      }
      await SCRIPT.insertMany(scripts);
    }
    if (req.body.execution_script && req.body.execution_script.length) {
      let scripts = [];
      for (let i = 0; i < req.body.execution_script.length; i++) {
        const script = req.body.execution_script[i];
        scripts.push({
          name: `command in ${req.body.name} execution`,
          scriptType: scriptTypes.RUN,
          comment: script,
          environment: env._id,
          executionOrder: i,
        });
      }
      await SCRIPT.insertMany(scripts);
    }

    res.send({ message: `Repository cloned successfully to ${dir}`, env });
  } catch (err) {
    next(err);
  }
};
export const getScripts = async (req, res, next) => {
  try {
    let keywords = {};
    if (req.query.query) {
      keywords = {
        $or: [{ name: { $regex: req.query.query, $options: "i" } }],
        $or: [{ command: { $regex: req.query.query, $options: "i" } }],
      };
    }
    req.query.scriptType && (keywords.scriptType = req.query.scriptType);
    let options = {
      limit: parseInt(req.query.limit) || 10,
      skip: parseInt(req.query.skip) || 0,
    };
    let scripts = await SCRIPT.find(keywords)
      .limit(options.limit)
      .skip(options.skip);
    res.send(scripts);
  } catch (error) {
    next(error);
  }
};
export const getScriptTypes = (req, res, next) => {
  res.send(convertObjectToArray(scriptTypes));
};

export const getScriptById = async (req, res, next) => {
  try {
    let scriptId = req.params.id;
    let script = await SCRIPT.findById(scriptId);
    if (!script) {
      return res.status(404).send({ message: "Script not found" });
    }

    res.send(script);
  } catch (error) {
    next(error);
  }
};
