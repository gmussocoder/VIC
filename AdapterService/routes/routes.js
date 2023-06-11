const express = require('express');
const router = express.Router();
const Service = require('../controllers/JS/controller');
const validateRequest = require('../mdw/validateRequest');
router.post('/AdapterService/V1/iresults', validateRequest.validateRequest, Service.Service);
module.exports = router;