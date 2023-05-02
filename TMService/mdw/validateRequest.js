// The following function Validates that the request is correct.
function validateRequest(request, response, next) {
    const { modelId, hyperparameters, dataset } = request.body;
    if (!request.headers['content-type'] || request.headers['content-type'] !== 'application/json') {
      return response.status(415).json({ error: 'Unsupported Media Type: JSON expected' });
    };
    if (!modelId || !hyperparameters || !dataset) {
      return response.status(400).json({ error: 'Bad Request: Missing parameters' });
    }
    next();
};
module.exports = { validateRequest };