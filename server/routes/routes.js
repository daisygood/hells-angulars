var express = require('express');
var jwt = require('express-jwt');
var authConfig = require('../config/authConfig');

//require controllers
var userController = require('../users/userController.js');
var productController = require('../products/productController.js');
var stripeController = require('../stripe/stripeController');
var statusController = require('../statuses/statusController');

var authCheck = jwt({
  secret: new Buffer(authConfig.secret, 'base64'),
  audience: authConfig.clientId
});

module.exports = function(app, express) {
  // NOTE: To protect a route, simply pass authCheck as the middle argument for a request route.
  // E.g. app.get('/api/someroute', authCheck, controller.method);

  //User routes
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/users/:id', userController.getUserById);
  app.post('/api/users', userController.createUser);
  app.put('/api/users/:id', userController.updateUser);

  //Product routes
  app.get('/api/products', productController.getProducts);
  app.get('/api/products/byuser/:id', productController.getProductsByUser);
  app.get('/api/products/:id', productController.getProductById);
  // app.get('/api/products/images/:id', productController.getImages);
  app.post('/api/products', productController.createProduct);
  app.put('/api/products/:id', productController.updateProduct);

  //Review routes
  // app.get('/api/reviews', productController.getReviews);
  // app.get('/api/reviews/:id', productController.getReviewByProductId);
  // app.post('/api/reviews', productController.createReview);

  //Transaction routes
  // app.get('/api/transactions', productController.getTransactions);
  // app.get('/api/transactions/:id', productController.getTransactionsById);
  // app.post('/api/transactions', productController.createTransaction);

  // status routes
  app.get('/api/statuses/user/:id', statusController.getStatusesByUserId);
  app.get('/api/statuses/:id', statusController.getStatusByProductId);
  app.put('api/statuses/:id', statusController.changeStatusByProductId);

  // Stripe routes
  app.get('/connect', stripeController.getCode);
  app.post('/api/charge', stripeController.createCharge);

  // Image Routes


}





