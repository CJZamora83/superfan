var _ = require('lodash');

var localEnvVars = {
  TITLE:      'SUPERFAN',
  SAFE_TITLE: 'SUPERFAN'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
