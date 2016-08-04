var _ = require('lodash');

var localEnvVars = {
  TITLE:      "Uncle Derry's Fishin' Log",
  SAFE_TITLE: 'derry_fishin_log',
  superSecret: "afishiwishafriendtofish"
};


// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
