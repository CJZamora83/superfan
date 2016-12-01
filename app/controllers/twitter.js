var request = require('request');
var access_token;

function jwt() {
  var token = encodeURIComponent(process.env.SUPERFAN_TWITTER_KEY) + ':' + encodeURIComponent(process.env.SUPERFAN_TWITTER_SECRET);
  
  // Base64 encode the string
  token = new Buffer(token, 'utf8').toString('base64');
  
  // oauth app access token request
  request({
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.twitter.com/oauth2/token',
    body: 'grant_type=client_credentials'
  }, function (er, response, body) {
    if (er) {
      console.log(er)
    }

    if (JSON.parse(body).token_type === 'bearer') {
      access_token = JSON.parse(body).access_token;
      return access_token;
    } else {
      console.log('Wrong Token Type. Restart Server');
      return null;
    }
  });
}

// making a route so that it would be easier to reset the variable 
// without restarting the server
function jwtRoute(req, res, next) {
  jwt();

  res.json({
    er: null,
    results: 'New Jwt Token Saved.'
  });
}

// setting this route up just because it might be useful later
// and you wouldnt have to curl twitter you could just hit this route
function invalidateJwtToken (req, res, next) {
  request({
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + access_token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.twitter.com/oauth2/token',
    body: 'access_token=' + access_token
  }, function (er, response, body) {
    if (er) {
      console.log(er);
    }

    // after you invalidate the token might as well get another
    res.redirect('/jwt/twitter');
  });
}

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
  options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token, 
    },
    uri: 'https://api.twitter.com/1.1/search/tweets.json?q=from:' + req.params.keyword
  };

  request(options, function (er, response, body) {
    if (er) {
      console.log(er);
    }

    res.json({
      er: null,
      results: body
    });
  })
}

jwt();

module.exports = {
  oauth: oauth,
  jwt: jwtRoute,
  invalJwt: invalidateJwtToken,
  search: search
};
