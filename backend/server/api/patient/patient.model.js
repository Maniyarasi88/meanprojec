'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var patientschema = new Schema({
  doctor_id: String,
  date:{ type: String, required: true },
  time:{ type: String},
  slottype:{ type: String},
  active: { type: Boolean, required: true, default: true },
  created_by:{ type: String, required: true },
  updated_by:{ type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
  patient_name :{ type: String, required: true },
  contact_number : { type: String, required: true },
  patient_id : { type: String, required: true }
});

module.exports = mongoose.model('patientschema', patientschema);