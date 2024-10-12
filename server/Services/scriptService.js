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
          echo 'Commands completed. Press Enter to close this terminal or wait 2 sec for auto-close.';
          read -t 2 || echo 'Timeout reached. Closing terminal.';
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
          const analyzeLog = (logContents) => {
            // Initialize flags
            let hasError = false;
            let hasWarning = false;
            let hasSuccess = false;
          
            // Split log contents into lines and analyze each line
            const lines = logContents.split('\n');
            for (const line of lines) {
              if (line.toLowerCase().includes('error')) {
                hasError = true;
              }
              if (line.toLowerCase().includes('warning')) {
                hasWarning = true;
              }
              if (line.toLowerCase().includes('success')) {
                hasSuccess = true;
              }
            }
          
            // Determine the overall status
            if (hasError) return 'error';
            if (hasWarning) return 'warning';
            if (hasSuccess) return 'success';
          
            return 'success'; // Default to success if no keywords found
          };
          const formattedOutput = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Execution Summary</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" integrity="sha512-UtPB05lv60QPXvc1+QyA/yaRQYRQAKdkkrsVR3a+3g9a4QeQF7/T66lVjQkqH5a5+LMNcRgejOSHgiw7Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        /* Custom styles */
        .log-container {
            max-height: 500px;
            overflow-y: auto;
        }
        .log-container pre {
            white-space: pre-wrap;
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4 bg-gray-100">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full md:w-3/4 lg:w-1/2">
        <div class="space-y-6">
            <section>
                <h2 class="text-2xl font-semibold text-indigo-600 mb-2">Execution Summary</h2>
                <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded flex items-center">
                    <span class="mr-2">✅</span>
                    <p class="font-bold">Execution Status: Success</p>
                    <p>Log File: ${logFileName}</p>
                    <p>Log Directory: ${logDirectory}</p>
                </div>
            </section>
            <section>
                <h2 class="text-2xl font-semibold text-indigo-600 mb-2">Command Output</h2>
                <div class="log-container bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>${logContents}</pre>
                </div>
            </section>
        </div>
        <div class="mt-8 text-center">
            <p class="text-gray-500 text-sm">Commands have been executed successfully and the log has been saved.</p>
        </div>
    </div>
</body>
</html>
`.trim();

          resolve(formattedOutput);
        } catch (err) {
          setTimeout(checkMarkerFile, 10);
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
  console.log('calloing',ip)
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
