const express = require('express');  
const routes = express.Router();  
const DevController = require('./controller/DevController');
const LikeController = require('./controller/LikeController');

routes.get('/index', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);

module.exports = routes;