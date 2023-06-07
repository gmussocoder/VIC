// The controller will search the modelPath to use the correct model for do object detection
// for each manifestId. Then will handle the doinference.py python process.
const generate_job_id = require('../utils/utils');
const doInference = require('./doInference');
const dbMgm = require('./dbMgm');

exports.Service = async (request, response) => {
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

  statusCode = dbMgm.insertJobId(jobId, plcId, manifestId, imageUrl, "inferencing", responseObject);
  if (statusCode == 0) {
    try {
      const modelToUse = await dbMgm.getModel(manifestId);
      console.log("Model to use:", modelToUse);
      
  // Now it will handle the pythonProcess for inference:
      doInference(jobId, imageUrl, manifestId, modelToUse);
      response.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no cache'
      });
      response.status(201).send(JSON.stringify(responseObject));
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }
  else {
    response.status(500).json({ error: 'Internal server error',code: dbCode});
  }
};