import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { replacement } from "../Config/constants.js";

export const executeCommands = (commands, data) => {
  return new Promise(async (resolve, reject) => {
    const currentDirectory = process.cwd();
    const date = new Date().toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
    const logDirectory = path.join(currentDirectory, "logs", date); // Log directory with subfolder by date

    try {
      // Ensure the directory exists
      await fs.mkdir(logDirectory, { recursive: true });
    } catch (err) {
      return reject(
        new Error(`Failed to create log directory: ${err.message}`)
      );
    }

    let script = commands.join(" && ");
    if (data) {
      let configs = valueSettingHandler(data);
      script = replaceValues(script, configs);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const logFileName = `terminal_log_${timestamp}.txt`;
    const fullLogPath = path.join(logDirectory, logFileName);
    const markerFileName = `${logFileName}.done`;
    const fullMarkerPath = path.join(logDirectory, markerFileName);

    const command = `
      sudo dbus-launch gnome-terminal -- bash -c "
        cd '${currentDirectory}' && 
        {
          { ${script}; } 2>&1 | tee '${fullLogPath}';
          echo 'Commands completed. Press Enter to close this terminal or wait 2 minutes for auto-close.';
          read -t 120 || echo 'Timeout reached. Closing terminal.';
          touch '${fullMarkerPath}';
        }
      "
    `;
    exec(command, (error) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(new Error(`Execution failed: ${error.message}`));
      }

      const checkMarkerFile = async () => {
        try {
          await fs.access(fullMarkerPath);
          await fs.unlink(fullMarkerPath);

          const logContents = await fs.readFile(fullLogPath, "utf8");

          const formattedOutput = `
=== Command Execution Summary ===
Execution Status: Success
Log File: ${logFileName}
Log Directory: ${logDirectory}

=== Command Output ===
${logContents.trim()}

=== End of Command Output ===

Commands have been executed successfully and the log has been saved.
          `.trim();

          resolve(formattedOutput);
        } catch (err) {
          setTimeout(checkMarkerFile, 1000);
        }
      };

      checkMarkerFile();
    });
  });
};

export function replaceValues(inputString, configs) {
  configs.forEach(({ replace, value }) => {
    inputString = inputString.split(replace).join(value);
  });
  return inputString;
}

export const valueSettingHandler = ({ ip, port, url }) => {
  let x = [];
  if (ip) {
    let replace = replacement.filter((item) => item.value === "ip");
    replace.forEach((item) => (item.value = ip));
    x = [...x, ...replace];
  }
  if (port) {
    let replace = replacement.filter((item) => item.value === "port");
    replace.forEach((item) => (item.value = port));
    x = [...x, ...replace];
  }
  if (url) {
    let replace = replacement.filter((item) => item.value === "url");
    replace.forEach((item) => (item.value = url));
    x = [...x, ...replace];
  }
  return x;
};

export function convertObjectToArray(obj) {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}
