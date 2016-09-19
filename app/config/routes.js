var express = require('express'),
    router  = new express.Router();

// Require controllers.
// var userController = require('../controllers/users');
var instagrammerController = require('../controllers/instagrammers');
var authController = require('../controllers/oauth');

// root path:
// router.get('/', pagesController.welcome);

//||||||||||||||||||||||||||--
// USERS CRUD SERVICES
//||||||||||||||||||||||||||--
// router.get('/users',     userController.index);

//||||||||||||||||||||||||||--
// INSTAGRAMMER CRUD SERVICES
//||||||||||||||||||||||||||--
router.get('https://api.instagram.com/v1/users/search?q=jack&access_token=ACCESS-TOKEN', instagrammerController.show);

//||||||||||||||||||||||||||--
// INSTAGRAM GUEST OAUTH SERVICES
//||||||||||||||||||||||||||--
router.post('/auth/instagram', authController.instagram);


module.exports = router;
