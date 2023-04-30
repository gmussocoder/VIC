const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

const generate_job_id = require('../utils/utils');
//const service = require('../controllers/controller');
//router.post('/execute-python-script', service);


router.post('/execute-python-script', (req, res) => {
  const { modelId, hyperparameters, dataset } = req.body;

  if (!modelId || !hyperparameters || !dataset) {
    return res.status(400).json({ error: 'Bad Request: Missing parameters' });
  }

  if (req.headers['content-type'] !== 'application/json') {
    return res.status(415).json({ error: 'Unsupported Media Type: JSON expected' });
  }

  console.log('Model ID:', modelId);
  console.log('Hyperparameters:', hyperparameters);
  console.log('Dataset:', dataset);

  const jobId = generate_job_id();

  const activate = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv\\Scripts\\activate.bat";
  const script = "C:\\Guille\\VIC\\Desarrollo\\pythonProcessTest.py";
  const pythonProcess = spawn("cmd.exe", ["/c", activate + " && python", script, jobId]);

  let output = '';
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
  });

  pythonProcess.on('exit', (code) => {
    console.log(`Python script exited with code ${code}`);
  });

  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  const response = {
    job: {
      Model: modelId,
      status: 'Training',
      code: 0,
      id: jobId
    }
  };

  res.status(201).send(JSON.stringify(response));
});

module.exports = router;