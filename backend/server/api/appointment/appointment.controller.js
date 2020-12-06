'use strict';

var _ = require('lodash');
var appointment = require('./appoinment.model');
var async = require('async');

// Get list of appointments
exports.index = function (req, res) {
  appointment.find(function (err, appointments) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(appointments);
  });
};

// Get a single appointment
exports.show = function (req, res) {
  appointment.find({ date: req.params.date, doctor_id: req.params.doctor_id }).exec(function (err, getdata) {
    if (err) {
      return handleError(res, err);
    }
    if (!getdata) { return res.status(404).send('Not Found'); }
    return res.json(getdata);
  });
};

// Creates a new appointment in the DB.
exports.create = function (req, res) {
  appointment.find({ date: req.body.date, doctor_id: req.body.doctor_id }).exec(function (err, getdata) {
    if (err) {
      return handleError(res, err);
    }

    if (!getdata) { return res.status(404).send('Error in adding slot'); }
    if (getdata && getdata.length == 0) {
      req.body.updated_by = req.body.created_by;
      appointment.create(req.body, function (err, result) {
        if (err) {
          return handleError(res, err);
        }
          return res.send({ result: 'Slot Added Successfully' });
      });
    } else if (getdata && getdata.length > 0) {
 
      if(req.body.slottype == 'Morning'){
        getdata[0].morningslot.push(req.body.morningslot);
        appointment.update(
          { doctor_id: req.body.doctor_id , date : req.body.date},
          // { $push: { morningslot: { $each: [ req.body.morningslot ] } } }
          {   morningslot: getdata[0].morningslot }
          ).exec( function (err1, updatedata) {
            if (err1) { 
              return handleError(res, err1); }
            return res.send({ result: 'Slot Added Successfully' });
          })
      } else if (req.body.slottype == 'Evening'){
        getdata[0].eveningslot.push(req.body.eveningslot);
        appointment.update(
          { doctor_id: req.body.doctor_id , date : req.body.date},
          {   eveningslot: getdata[0].eveningslot  , updated_by : req.body.created_by , updated_at : new Date()}
          ).exec( function (err1, updatedata) {
            if (err1) { 
              return handleError(res, err1); }
            return res.send({ result: 'Slot Added Successfully' });
          })
      }
    }
  });
};

// Updates an existing appointment in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  appointment.findById(req.params.id, function (err, appointment) {
    if (err) { return handleError(res, err); }
    if (!appointment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(appointment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(appointment);
    });
  });
};

// Deletes a appointment from the DB.
exports.destroy = function (req, res) {
  appointment.findById(req.params.id, function (err, appointment) {
    if (err) { return handleError(res, err); }
    if (!appointment) { return res.status(404).send('Not Found'); }
    appointment.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}