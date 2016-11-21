var pool = require('../db/db.js');

module.exports = {
  getCompletedTransactionsByUser: function (req, res) {
    var queryStr = `SELECT * from transactions
      WHERE status_id = 2
      AND seller_id = ($1)
    `
    pool.query(queryStr,[req.params.id],function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(result.rows);
    })
  },

  getAllTransactionsByUser: function (req, res) {
    var queryStr = `SELECT * from transactions
      WHERE seller_id = ($1)
    `
    pool.query(queryStr,[req.params.id],function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      res.json(result.rows);
    })
  }
}
