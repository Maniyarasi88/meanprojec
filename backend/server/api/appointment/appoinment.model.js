'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var appoinmentschema = new Schema({
  doctor_id: String,
  date:{ type: String, required: true },
  morningslot:{ type: Array},
  eveningslot:{ type: Array},
  active: { type: Boolean, required: true, default: true },
  created_by:{ type: String, required: true },
  updated_by:{ type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

module.exports = mongoose.model('appoinmentschema', appoinmentschema);