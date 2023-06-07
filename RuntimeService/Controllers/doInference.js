// "runPythonScript" is a function which enables a Python Virtual Enviroment for execute 
// a Python Script for train a model.
const { spawn } = require('child_process');
const activate = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv\\Scripts\\activate.bat";
const script = "C:\\Guille\\VIC\\Desarrollo\\RuntimeService\\pythonScripts\\doInference.py";
//const activate = "C:/Guille/VIC/Desarrollo/pythonEnv/Scripts/activate.bat";
//const script = "C:/Guille/VIC/Desarrollo/doInference.py";

async function doInference(jobId, imageUrl, manifestId, modelToUse) {
  const pythonProcess = spawn("cmd.exe", ["/c", activate + " && python", script, jobId, imageUrl, modelToUse, manifestId]);
//  const pythonProcess = spawn(activate, [script, jobId, imageUrl, modelToUse]);
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
  const jsonOutput = JSON.stringify(output); // Convert output to JSON string

  return { output: jsonOutput, exitCode };
//  return { output, exitCode };
};

module.exports = doInference;