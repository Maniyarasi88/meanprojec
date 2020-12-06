'use strict';

var _ = require('lodash');
var patient = require('./patient.model');
var async = require('async');

// Get list of patients
exports.index = function (req, res) {
  patient.find(function (err, patients) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(patients);
  });
};

// Get a single patient
exports.show = function (req, res) {
  var limit_record = 12;
  var skip_record = parseInt(req.params.pagenumber) * parseInt(limit_record);
  var searchquery = { $match: { "_id": { "$exists": true } } };
  if (req.params.date != "undefined") {
    searchquery = { "$match": { date: req.params.date } };
  }
  patient.aggregate([
    searchquery,
    {
      $facet: {
        "count": [{ "$group": { _id: null, count: { $sum: 1 } } }],
        "data": [{ "$skip": skip_record }, { "$limit": limit_record }]
      }
    },
  ]).exec(function (err, getdata) {
    if (err) {
      console.log(err)
      return handleError(res, err);
    }
    if (!getdata) { return res.status(404).send('Not Found'); }
    return res.json(getdata[0]);
  });
};

// Creates a new patient in the DB.
exports.create = function (req, res) {
  req.body.updated_by = req.body.created_by;
  patient.create(req.body, function (err, patient1) {
    if (err) {
      console.log(err)
      return handleError(res, err);
    }
    return res.status(201).json(patient1);
  });
};


// Updates an existing patient in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  patient.findById(req.params.id, function (err, patient) {
    if (err) { return handleError(res, err); }
    if (!patient) { return res.status(404).send('Not Found'); }
    var updated = _.merge(patient, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(patient);
    });
  });
};

// Deletes a patient from the DB.
exports.destroy = function (req, res) {
  patient.findById(req.params.id, function (err, patient) {
    if (err) { return handleError(res, err); }
    if (!patient) { return res.status(404).send('Not Found'); }
    patient.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}