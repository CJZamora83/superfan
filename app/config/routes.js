var express = require('express'),
    router  = new express.Router();

// Require controllers.
var pagesController = require('../controllers/pages');
var usersController = require('../controllers/users');
var authController = require('../controllers/oauth');
var homeController = require('../controllers/home');

// root path:
router.get('/', pagesController.welcome);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);


// Google OAuth resource path:
router.post('/auth/instagram', authController.instagram);


module.exports = router;
