var _ = require('lodash');

var localEnvVars = {
  TITLE:      "SUPERFAN",
  SAFE_TITLE: 'superfan_celebrity_gossip_feed',
  superSecret: "gossipycelebnewsandfeeds"
};


// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
