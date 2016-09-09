var express = require('express');
    router  = new express.Router();

//Require controllers
var pagesController = require('../controllers/pages');
var authController  = require('../controllers/oauth');

//root path:
router.get('/', function(req, res, next) {
  if (req.user) {
    console.log("access" + req.user.accessToken);
  };
  res.render('../views/pages/welcome', { user: req.user, apikey: process.env.instagram_api_key });
});

router.get('/contact', function(req, res, next) {

  res.render('../views/pages/contact', { user: req.user});
});

// router.get('/contact', pagesController.contact);

router.get('/auth/instagram',
  satellizer.authenticate('instagram', { scope: ['public_content', 'follower_list']}));

router.get('/auth/instagram/callback',
  satellizer.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});

// Instagram Helper Routes
router.get('/api/likes', instaHelp.grabLiked);
router.get('/api/users', usersController.index);
router.get('/api/users/:id', usersController.show);
router.put('/api/users/:id', usersController.update);
router.delete('/api/users/:id', usersController.destroy);

module.exports = router;
