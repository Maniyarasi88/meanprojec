'use strict';

var express = require('express');
var controller = require('./patient.controller');
var router = express.Router();

router.post('/', controller.create); // 
router.get('/:date/:doctor_id/:pagenumber', controller.show); // 

module.exports = router;