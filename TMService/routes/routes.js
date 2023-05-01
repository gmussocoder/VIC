const express = require('express');
const router = express.Router();
const Service = require('../controllers/controller');
router.post('/execute-python-script', Service.Service);
module.exports = router;