var connection = require("./connection");
var SQL = require("./SQL");
const LIMITED_ITEM_PER_PAGE = 100;

var pageDetail = {
  currentPage: 1,
  nextPage: 0,
  nextNextPage: 0,
  prevPage: 0,
  prevPrevPage: 0,
  totalPage: 0,
};

async function getBookIDByCatID(catID) {
  var result = await new Promise((resolve, reject) => {
    var sql =
      "SELECT id_book FROM hcmus_book_store.list_categories WHERE id_category = '" +
      catID +
      "'";

    connection.query(sql, (err, temp) => {
      if (err) return reject(err);
      return resolve(temp);
    });
  });
  return result;
}

async function getBooks(page, catID) {
  var result;
  var offset = LIMITED_ITEM_PER_PAGE * (page - 1);
  if (catID != "") {
    var ListBookID = await getBookIDByCatID(catID);
    result = await new Promise((resolve, reject) => {
      var sql = "SELECT * FROM hcmus_book_store.book_info WHERE id IN (";
      ListBookID.forEach((element) => (sql += "'" + element["id_book"] + "',"));
      sql = sql.substr(0, sql.length - 1);
      sql =
        sql + ") LIMIT " + LIMITED_ITEM_PER_PAGE + " OFFSET " + offset + ";";

      console.log(sql);

      connection.query(sql, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  } else {
    result = await new Promise((resolve, reject) => {
      var sql =
        "SELECT * FROM hcmus_book_store.book_info WHERE status='Active' LIMIT " +
        LIMITED_ITEM_PER_PAGE +
        " OFFSET " +
        offset +
        "";
      connection.query(sql, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }

  return result;
}

async function getTotalPage() {
  var result = await new Promise((resolve, reject) => {
    var sql =
      "SELECT COUNT(*) FROM hcmus_book_store.book_info WHERE status='Active'";
    connection.query(sql, (err, temp) => {
      if (err) return reject(err);

      var item = temp[0];
      var numOfItems = item["COUNT(*)"];
      var result;

      if (numOfItems % LIMITED_ITEM_PER_PAGE == 0) {
        result = parseInt(numOfItems / LIMITED_ITEM_PER_PAGE);
      } else {
        result = parseInt(numOfItems / LIMITED_ITEM_PER_PAGE) + 1;
      }

      return resolve(result);
    });
  });
  return result;
}

async function getMaxID(){
  var sql ="SELECT MAX(id) FROM hcmus_book_store.book_info";
  result = await queryAsync(sql);
  return result[0]['MAX(id)'];
}

exports.products = async (page, catID) => {
  const listBooks = await getBooks(page, catID);
  return listBooks;
};

exports.pageNumber = async (page, catID) => {
  pageDetail.currentPage = page;
  pageDetail.totalPage = await getTotalPage(catID);

  if (pageDetail.currentPage <= 1) {
    pageDetail.prevPage = 0;
  } else {
    pageDetail.prevPage = pageDetail.currentPage - 1;
  }

  if (pageDetail.prevPage <= 1) {
    pageDetail.prevPrevPage = 0;
  } else {
    pageDetail.prevPrevPage = pageDetail.prevPage - 1;
  }

  if (pageDetail.currentPage >= pageDetail.totalPage) {
    pageDetail.nextPage = 0;
  } else {
    pageDetail.nextPage = pageDetail.currentPage + 1;
  }

  if (pageDetail.nextPage >= pageDetail.totalPage || pageDetail.nextPage == 0) {
    pageDetail.nextNextPage = 0;
  } else {
    pageDetail.nextNextPage = pageDetail.nextPage + 1;
  }

  return pageDetail;
};

exports.getBookByID = async (BookID) => {
  var result = await new Promise((resolve, reject) => {
    var sql =
      "SELECT * FROM hcmus_book_store.book_info WHERE id = '" + BookID + "';";
    connection.query(sql, (err, temp) => {
      if (err) return reject(err);
      var result = temp[0];
      return resolve(result);
    });
  });
  return result;
};
async function queryAsync(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(error,results)=>{
            if (error){
                reject(error);
                return;
            }
            resolve(results);
            return results;

        });

    })


}
exports.removeProducts = async (listProduct) => {
  var sql = new SQL();
  sql.Update("book_info");
  sql.Set("status='Block'");
  sql.Where("id " + sql.In(listProduct));
  console.log(sql.Query());
  await queryAsync(sql.Query());
};

exports.addNewProduct = async(req, res,image_url) => {
  //var sql = "SELECT * FROM hcmus_book_store.book_info ";
  //sql = sql + "WHERE id='" + req.body.id + "';";
  data=req.body;
  id=await getMaxID();
  id+=1;
  var sql =
    "INSERT INTO hcmus_book_store.book_info (id, title, base_price, image, isbn, supplier, author, publisher, public_year, weight, size, number_page, page) VALUES ";
  sql = sql + "('" + id + "', '" + data.title + "', '" + data.base_price  + "', '" + image_url + "', '" + data.isbn + "', '" + data.supplier;
  sql = sql +  "', '" + data.author + "', '" + data.publisher  +  "', '" + data.public_year  +  "', '" + data.weight +  "', '" + data.size +  "', '" + data.number_page +  "', '" + data.page +  "')";
  console.log(sql);
  await queryAsync(sql);
  return true;
};