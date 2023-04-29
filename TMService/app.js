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
  const jobId = generate_job_id();

  // Spawn a Python process with the script path and arguments
  const activate = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv\\Scripts\\activate.bat";
  const script = "C:\\Guille\\VIC\\Desarrollo\\pythonProcessTest.py";

  // Set the response content type to text/plain
  //res.setHeader('Content-Type', 'text/plain');

  // Set the response headers
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  const response = {
    jobId: {
      Model: 'modelID',
      status: 'Training',
      code: 0,
      id: jobId
    }
  };
  // Send the JSON response
  res.send(JSON.stringify(response));

//  res.send(`Modelo entrenándose. JobId: ${jobId}`);


  const pythonProcess = spawn("cmd.exe", ["/c", activate + " && python", script, jobId]);
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
//    res.send(`Python script exited with code ${code} y la salida del script es ${output}`);
  });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});


//utils
function generate_job_id() {
    // Define the length of the job ID
    const length = 10;
  
    // Define the character set to choose from
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    // Generate the random job ID
    let job_id = '';
    for (let i = 0; i < length; i++) {
      job_id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return job_id;
  }