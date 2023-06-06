// Generates the JobId for inference, registers the inference operation task
// and handles the doInference process.
const generate_job_id = require('../utils/utils');
const doInference = require('./doInference');
const dbMgm = require('./dbMgm');
exports.Service = (request, response) => {
  const { plcId, manifestId, imageUrl } = request.body;
  console.log('plcId:', plcId);
  console.log('manifestId:', manifestId);
  console.log('imageUrl:', imageUrl);
  const jobId = generate_job_id();
  const responseObject = {
    job: {
      id: jobId,
      plc: plcId,
      manifestId: manifestId,
      image: imageUrl,
      status: 'Inferencing',
      code: 0
    }
  };
//  dbMgm.insertJobId(jobId, plcId, imageUrl,"");
  modelToUse = dbMgm.getModel(manifestId);
//  modelToUse = 'C:/Guille/VIC/Desarrollo/pythonEnv/model/saved_model';
  console.log("ACÁ ESTÁ EN CONTROLLER");
  console.log(typeof modelToUse);
  console.log(modelToUse);
  doInference(jobId, imageUrl, modelToUse);
  response.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no cache'
  });
  response.status(201).send(JSON.stringify(responseObject));
};