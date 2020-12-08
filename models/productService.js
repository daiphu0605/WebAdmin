var connection=require('./connection');

connection.query('SELECT * FROM hcmus_book_store.book_info', function (err, rows, fields) {
    if (err) throw err
    exports.list = rows;
  });

