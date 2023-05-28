// Generates the JobId for inference, registers the inference operation task
// and handles the doInference process.
const generate_job_id = require('../utils/utils');
const doInference = require('./doInference');
const dbMgm = require('./dbMgm');
exports.Service = (request, response) => {
  const { imageUrl, processPitch } = request.body;
  console.log('imageUrl:', imageUrl);
  console.log('processPitch:', processPitch);
  const jobId = generate_job_id();
  const responseObject = {
    job: {
      image: imageUrl,
      processPitchId: processPitch,
      status: 'Inferencing',
      code: 0,
      id: jobId
    }
  };
  dbMgm.insertJobId(jobId, processPitch);
  doInference(jobId);
  response.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no cache'
  });
  response.status(201).send(JSON.stringify(responseObject));
};