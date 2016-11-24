var pool = require('../db/db.js');

var queryStrWithImages = `SELECT products.id, products.category_id, products.owner_id, products.description, products.productname, products.priceperday, products.location, products.lat, products.lng, products.city, products.state, images.url
      FROM products
      LEFT JOIN images
      ON products.id=images.product_id`;

var addImagesArray = function (result) {
  var resultWithImages = [];
  for (var i = 0; i < result.length; i++) {
    var found = false;
    for (var j = 0; j < resultWithImages.length; j++) {
      if (resultWithImages[j].id === result[i].id) {
        resultWithImages[j].url.push(result[i].url);
        found = true;
      }
    }
    if (!found) {
      var url = result[i].url;
      result[i].url = [url];
      resultWithImages.push(result[i]);
    }
  }
  return resultWithImages;
};

module.exports = {

  // Return products that match the query string.
  // If no string was provided, will return all products
  getProducts: function(req, res, next) {
    console.log('query ' + JSON.stringify(req.query));
    if (req.query.query === 'undefined' || req.query.query === null || req.query.query === 'null') {
      req.query.query = '';
    }
    var queryStr = " WHERE (productname LIKE '%" + req.query.query + "%')";
    pool.query(queryStrWithImages + queryStr, function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(addImagesArray(result.rows));
    });
  },

  getProductsByUser: function(req, res, next) {
    var queryStr = queryStrWithImages + ` WHERE products.owner_id = ($1)`;
    pool.query(queryStr, [req.params.id], function(err, result) {
      if (err) return console.log(err);
      console.log('success', result);
      res.json(addImagesArray(result.rows));
    });
  },


  // getImages: function(req, res, next) {
  //   var queryStr = `SELECT url FROM images WHERE product_id=${req.params.id}`;
  //   pool.query(queryStr, function(err, result) {
  //     if (err) return console.log(err);
  //     console.log('success', result);
  //     res.json(result.rows);
  //   })
  // },

  getProductById: function(req, res, next) {
    var id = req.params.id;
    var body = req.body;
    var queryStr = `SELECT products.id
      , products.category_id
      , products.owner_id
      , users.firstname
      , users.profilepic
      , products.description
      , products.productname
      , products.priceperday
      , products.location
      , products.city
      , products.state
      , products.lng
      , products.lat
      , images.url
      FROM products
      LEFT JOIN images
        ON products.id = images.product_id
      INNER JOIN users
          on users.id = products.owner_id
      WHERE products.id = ($1)`;
    pool.query(queryStr, [id], function(err, result) {
      if (err) return console.log(err);
      console.log('success', result);
      res.json(addImagesArray(result.rows));
    });
  },

  // getProductsByQuery: function(req, res, next) {
  //   var query = req.params.query;
  //   console.log(query);
  //   var queryStr = ` SELECT * FROM products WHERE productname LIKE '%" + ${query} + "%'
  //   `;
  //   pool.query(queryStr, function(err, result) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     res.json(result.rows);
  //   });
  // },

  createProduct: function (req, res, next) {
    console.log('>>>>>', req.body.lat);
    var body = req.body;
    // query string for storing product in product table
    var queryStr = `WITH ins1 AS (
                      INSERT INTO products(category_id, owner_id, description, productname, priceperday, lat, lng, city, state, zip)
                      VALUES ((SELECT id from categories where category = $1), (SELECT id from users where authid = $2), $3, $4, $5, $6, $7, $8, $9, $10)
                      RETURNING id
                      )
                      INSERT INTO images(product_id, url)
                      SELECT id, $11
                      FROM ins1`;

    pool.query(queryStr, [body.categoryId, body.userId, body.productDescription, body.productName, body.pricePerDay, body.lat, body.lng, body.city, body.state, body.zip, body.imageLink], function(err, result) {
      if (err) {
        res.status(404).send();
        return;
      }
      console.log('success', result);
      res.status(201).send('product created');
    });
    // add images to images table

  },

  getReviewByProductId: function(req, res, next) {
    var id = req.params.id;
    var queryStr = `SELECT reviews.author_id, reviews.text, reviews.rating, users.profilepic, users.username, users.firstname, users.lastname
      FROM reviews
      INNER JOIN users
        on users.id = reviews.author_id
      WHERE product_id = ($1)
    `;
    pool.query(queryStr, [id], function(err, result) {
      if (err) return console.log(err);
      console.log('reviews ', result);
      res.json(result.rows);
    });
  },

  createReview: function(req, res, next) {
    var body = req.body;
    var queryStr = `INSERT INTO reviews(transaction_id, product_id, buyer_id, seller_id, author_id, text, rating) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(queryStr, [body.transactionId, body.productId, body.buyerId, body.sellerId, body.authorId, body.text, body.rating], function(err, result) {
      if (err) return console.error(err);
      res.status(201).send('Created review');
    });
  },

  updateProduct: function (req, res, next) {
    var id = req.params.id;
    var body = req.body;
    var queryStr = `UPDATE products SET
      category_id=((SELECT id from categories where category = $1)), productname=($2), priceperday=($3), location=($4) WHERE id=($5)`;

    pool.query(queryStr, [body.category, body.productname, body.priceperday, body.location, id], function(err, result) {
      if (err) return console.log(err);
      console.log('success', result);
      res.status(201).send('updated product');
    });
  },

  getInvalidDays: function (req, res, next) {
    var id = req.params.id;

    var queryStr = `SELECT bookedfrom, bookedto FROM transactions WHERE product_id=($1)`;

    pool.query(queryStr, [id], function(err, result) {
      if (err) return console.log(err);
      console.log('dates', result);
      res.json(result.rows);
    });
  }
};

