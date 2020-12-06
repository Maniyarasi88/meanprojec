'use strict';

var express = require('express');
var controller = require('./appointment.controller');
var router = express.Router();

router.post('/', controller.create); // 
router.get('/:date/:doctor_id', controller.show); // 

module.exports = router;