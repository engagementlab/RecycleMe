var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var express = require('express');
var router = express.Router();

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('render', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views'), 
    api: importRoutes('./api')
};

// keystone redirect
router.all('/admin', function(req, res, next) {
    res.redirect('/keystone');
});

// Views
router.get('/', routes.views.index);
router.get('/profile/:id', routes.views.game);

router.post('/api/create/', keystone.middleware.api, routes.api.game.create);

router.get('/api/find/', keystone.middleware.api, routes.api.login.get);
router.get('/api/game/', keystone.middleware.api, routes.api.game.update);
router.get('/api/game/level', keystone.middleware.api, routes.api.game.level);
router.get('/api/game/match', keystone.middleware.api, routes.api.game.match);
router.get('/api/game/material', keystone.middleware.api, routes.api.game.material);

router.post('/api/update/:id', keystone.middleware.api, routes.api.profile.update);
router.post('/api/update/image_upload/:id', keystone.middleware.api, routes.api.profile.image_upload);

// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
// router.get('/protected', middleware.requireUser, routes.views.protected);

module.exports = router;