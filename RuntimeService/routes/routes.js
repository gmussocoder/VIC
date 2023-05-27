const express = require('express');
const router = express.Router();
const Service = require('../controllers/controller');
const validateRequest = require('../mdw/validateRequest');
router.post('/RuntimeService', validateRequest.validateRequest, Service.Service);
module.exports = router;