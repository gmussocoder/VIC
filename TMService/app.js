//App TM Service
const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.post('/execute-python-script', (req, res) => {
  // Get the script and arguments from the request body
  const { scriptPath, args } = req.body;

  // Spawn a Python process with the script path and arguments
  const activate = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv\\Scripts\\activate.bat";
  const script = "C:\\Guille\\VIC\\Desarrollo\\pythonProcessTest.py";  

//  const pythonProcess = spawn('python', ['script.py']);
  const pythonProcess = spawn("cmd.exe", ["/c", activate + " && python", script]);
//  const pythonProcess = spawn('cmd.exe', ['/c', 'activate.bat', '&&', 'python', 'script2.py', 10], { shell: true });
  // Listen for the data event to receive output from the script
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
//    res.send(`Python script exited with code ${data}`);
  });
  // Collect the output of the script in a buffer
  let output = '';
  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });
  // Listen for the error event to receive any errors from the script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });
  // Listen for the exit event to handle the process exit status
  pythonProcess.on('exit', (code) => {
    console.log(`Python script exited with code ${code}`);
    res.send(`Python script exited with code ${code} y la salida del script es ${output}`);
  });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});