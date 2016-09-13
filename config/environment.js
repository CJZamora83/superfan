var _ = require('lodash');

var localEnvVars = {
  TITLE:      'Virt',
  SAFE_TITLE: 'virt'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
