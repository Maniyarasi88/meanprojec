/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/appointment', require('./api/appointment'));
  app.use('/auth', require('./auth'));
  app.use('/api/patient', require('./api/patient'));

};
