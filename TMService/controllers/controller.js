const generate_job_id = require('../utils/utils');
const trainModel = require('./trainModel');
const dbMgm = require('./dbMgm');
exports.Service = (request, response) => {
  const { modelId, hyperparameters, dataset } = request.body;
  if (!modelId || !hyperparameters || !dataset) {
    return response.status(400).json({ error: 'Bad Request: Missing parameters' });
  }
  if (request.headers['content-type'] !== 'application/json') {
    return response.status(415).json({ error: 'Unsupported Media Type: JSON expected' });
  }
  console.log('Model ID:', modelId);
  console.log('Hyperparameters:', hyperparameters);
  console.log('Dataset:', dataset);
  const jobId = generate_job_id();
  const responseObject = {
    job: {
      Model: modelId,
      status: 'Training',
      code: 0,
      id: jobId
    }
  };
  dbMgm.insertJobId(jobId, modelId);
  trainModel(jobId);
  response.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  response.status(201).send(JSON.stringify(responseObject));
};