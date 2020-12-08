var connection = require("./connection");


module.exports = (req, res,image_url) => {
  //var sql = "SELECT * FROM hcmus_book_store.book_info ";
  //sql = sql + "WHERE id='" + req.body.id + "';";
  data=req.body;
  console.log('It is model');
  console.log(req.body);
  var sql =
    "INSERT INTO hcmus_book_store.book_info (id, title, base_price, image, isbn, supplier, author, publisher, public_year, weight, size, number_page, page) VALUES ";
  sql = sql + "('" + data.id + "', '" + data.title + "', '" + data.base_price  + "', '" + image_url + "', '" + data.isbn + "', '" + data.supplier;
  sql = sql +  "', '" + data.author + "', '" + data.publisher  +  "', '" + data.public_year  +  "', '" + data.weight +  "', '" + data.size +  "', '" + data.number_page +  "', '" + data.page +  "')";
  console.log(sql);
  connection.query(sql,(err,results)=>{
    if (err) throw err;
    console.log("1 record inserted");
  })
  return true;
};
