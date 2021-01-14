var connection = require("../models/connection");

async function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
      return;
    });
  });
}
exports.statistic = async (req, res) => {
  var sql =
    "SELECT * FROM hcmus_book_store.book_info order by views desc limit 10";
  var topViewBook = await queryAsync(sql);

  sql =
    "SELECT product_id,title,sum(product_quantity)as amount FROM hcmus_book_store.order_detail join book_info on order_detail.product_id=book_info.id group by product_id order by amount desc limit 10";
  var topBuyBook = await queryAsync(sql);

  sql =
    "select sum(total_money)as amount,user_id,name from order_info group by user_id order by amount desc limit 10;";
  var mostBuyCustomer = await queryAsync(sql);

  res.render("statistic", {
    layout: "main_layout",
    topViewBook,
    topBuyBook,
    mostBuyCustomer,
  });
};
