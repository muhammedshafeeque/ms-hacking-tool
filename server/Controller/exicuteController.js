import { SCRIPT } from "../Models/scriptModal.js";
import { scriptTypes } from "../Config/constants.js";
import { executeCommands } from "../Services/scriptService.js";

export const executeScript = async (req, res, next) => {
  try {
    let data = req.body;
    let script = await SCRIPT.findById(data.script).populate("environment");
    let commands = [];
    if (script.environment) {
      let envCommands = await SCRIPT.find({
        environment: script.environment._id,
        scriptType: scriptTypes.ENV,
      });
      if (envCommands.length) {
        for (let i = 0; i < envCommands.length; i++) {
          let item = envCommands.find((en) => {
            return en.executionOrder === i;
          });
          commands[i] = item.comment;
        }
      }
      let run = [];
      let exCommands = await SCRIPT.find({
        environment: script.environment._id,
        scriptType: scriptTypes.RUN,
      });
      if (exCommands.length) {
        for (let i = 0; i < exCommands.length; i++) {
          let item = exCommands.find((en) => {
            return en.executionOrder === i;
          });
          run[i] = item.comment;
        }
      }
      commands = [...commands, ...run];
      commands.unshift(`cd ${script.environment.name}`);
      commands.unshift(`cd Public`);
    } else {
      commands.push(script.comment);
    }
    let terminal = await executeCommands(
      commands,
      req.body.target && req.body.target
    );
    res.send(terminal);
  } catch (error) {
    next(error);
  }
};
