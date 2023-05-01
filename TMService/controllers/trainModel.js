// "runPythonScript" is a function which enables a Python Virtual Enviroment for execute 
// a Python Script for train a model.
const { spawn } = require('child_process');
const activate = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv\\Scripts\\activate.bat";
const script = "C:\\Guille\\VIC\\Desarrollo\\pythonProcessTest.py";

async function runPythonScript(jobId) {
  const pythonProcess = spawn("cmd.exe", ["/c", activate + " && python", script, jobId]);

  let output = '';

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  const exitCode = await new Promise((resolve, reject) => {
    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);
      resolve(code);
    });
    pythonProcess.on('error', (error) => {
      console.error(`Python script error: ${error}`);
      reject(error);
    });
  });

  return { output, exitCode };
}

module.exports = runPythonScript;