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

  try {
    const modelToUse = await dbMgm.getModel(manifestId);
    console.log("Model to use:", modelToUse);

    doInference(jobId, imageUrl, modelToUse);

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
};