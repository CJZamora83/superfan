var Tweet = require('../models/tweet.js');

// user oauth2
function oauth (req, res, next) {
  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  var profileUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';

  // Part 1 of 2: Initial request from Satellizer.
  if (!req.query.oauth_token || !req.query.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: process.env.SUPERFAN_TWITTER_KEY,
      consumer_secret: process.env.SUPERFAN_TWITTER_SECRET,
      callback: 'http://localhost:3000/api/auth/twitter'
    };

    // Step 1. Obtain request token for the authorization popup.
    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {

      // Step 2. Send OAuth token back to open the authorization screen.
      res.send(body);
    });
  } else {
    // Part 2 of 2: Second request after Authorize app is clicked.
    var accessTokenOauth = {
      consumer_key: process.env.SUPERFAN_TWITTER_KEY,
      consumer_secret: process.env.SUPERFAN_TWITTER_SECRET,
      token: req.query.oauth_token,
      verifier: req.query.oauth_verifier
    };

    // Step 3. Exchange oauth token and oauth verifier for access token.
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

      res.json('http://localhost:3000/#/twitter?' + accessToken)
      // accessToken = qs.parse(accessToken);

      // var profileOauth = {
      //   consumer_key: process.env.SUPERFAN_TWITTER_KEY,
      //   consumer_secret: process.env.SUPERFAN_TWITTER_SECRET,
      //   token: accessToken.oauth_token,
      //   token_secret: accessToken.oauth_token_secret,
      // };

      // // Step 4. Retrieve user's profile information and email address.
      // request.get({
      //   url: profileUrl,
      //   qs: { include_email: true },
      //   oauth: profileOauth,
      //   json: true
      // }, function(er, response, body) {
      //   if (er) {
      //     console.log(er);
      //   }

      //   console.log(response);
      //   console.log(body);

      //   res.redirect('http://localhost:3000/#/twitter')
        // Step 5a. Link user accounts.
        // if (req.header('Authorization')) {
        //   User.findOne({ twitter: profile.id }, function(err, existingUser) {
        //     if (existingUser) {
        //       return res.status(409).send({ message: 'There is already a Twitter account that belongs to you' });
        //     }

        //     var token = req.header('Authorization').split(' ')[1];
        //     var payload = jwt.decode(token, config.TOKEN_SECRET);

        //     User.findById(payload.sub, function(err, user) {
        //       if (!user) {
        //         return res.status(400).send({ message: 'User not found' });
        //       }

        //       user.twitter = profile.id;
        //       user.email = profile.email;
        //       user.displayName = user.displayName || profile.name;
        //       user.picture = user.picture || profile.profile_image_url_https.replace('_normal', '');
        //       user.save(function(err) {
        //         res.send({ token: createJWT(user) });
        //       });
        //     });
        //   });
        // } else {
        //   // Step 5b. Create a new user account or return an existing one.
        //   User.findOne({ twitter: profile.id }, function(err, existingUser) {
        //     if (existingUser) {
        //       return res.send({ token: createJWT(existingUser) });
        //     }

        //     var user = new User();
        //     user.twitter = profile.id;
        //     user.email = profile.email;
        //     user.displayName = profile.name;
        //     user.picture = profile.profile_image_url_https.replace('_normal', '');
        //     user.save(function() {
        //       res.send({ token: createJWT(user) });
        //     });
        //   });
        // }
      // });
    });
  }
}

function search(req, res, next) {
  Tweet.find({}, function (er, row) {
    res.json({
      er: null,
      results: row
    })
  })
}




module.exports = {
  oauth: oauth,
  search: search
};
