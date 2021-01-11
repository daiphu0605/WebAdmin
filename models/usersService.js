var connection = require("./connection");
const SQL = require("./SQL");

const LIMITED_ITEM_PER_PAGE = 20;

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

async function getUsers(page, catID) {
  var result;
  var offset = LIMITED_ITEM_PER_PAGE * (page - 1);
  if (catID != "") {
    /*
        var ListBookID = await getBookIDByCatID(catID);
        result = await new Promise ((resolve, reject)=>{
            var sql = "SELECT * FROM hcmus_book_store.book_info WHERE id IN (";
            ListBookID.forEach(element => sql += "'" + element['id_book'] + "',");
            sql = sql.substr(0, sql.length - 1);
            sql = sql + ") LIMIT " + LIMITED_ITEM_PER_PAGE + " OFFSET " + offset + ";";

            console.log(sql);

            connection.query(sql,(err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })

        });
        */
  } else {
    result = await new Promise((resolve, reject) => {
      var sql =
        "SELECT * FROM hcmus_book_store.user_info LIMIT " +
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
    var sql = "SELECT COUNT(*) FROM hcmus_book_store.book_info";
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

exports.users = async (page, catID) => {
  const listBooks = await getUsers(page, catID);
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

exports.getUserByID = async (UserID) => {
  var result = await new Promise((resolve, reject) => {
    var sql =
      "SELECT * FROM hcmus_book_store.user_info WHERE username = '" +
      UserID +
      "';";
    connection.query(sql, (err, temp) => {
      if (err) return reject(err);
      var result = temp[0];
      return resolve(result);
    });
  });
  return result;
};
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
exports.blockUsers = async (listUser) => {
  var sql = new SQL();
  sql.Update("user_info");
  sql.Set("status='Block'");
  sql.Where("username " + sql.In(listUser));
  console.log(sql.Query());
  await queryAsync(sql.Query());
};

async function getMaxID() {
  var sql = "SELECT MAX(id) FROM hcmus_book_store.user_info";
  result = await queryAsync(sql);
  return result[0]["MAX(id)"];
}

exports.addUser = async (req, res, image_url, cloudinary_id) => {
  //var sql = "SELECT * FROM hcmus_book_store.book_info ";
  //sql = sql + "WHERE id='" + req.body.id + "';";
  data = req.body;
  var role = data.role || 'user';
  var sql =
    "INSERT INTO hcmus_book_store.user_info (username, password, fullname, role, email, contact, avatar, cloudinary_id) VALUES ";
  sql =
    sql +
    "('" +
    data.username +
    "', '" +
    data.password +
    "', '" +
    data.fullname +
    "', '" +
    role +
    "', '" +
    data.email +
    "', '" +
    data.contact +
    "', '" +
    image_url +
    "', '" +
    cloudinary_id +
    "')";
  console.log(sql);
  await queryAsync(sql);
  return true;
};

exports.editProduct = async (req, res, image_url, cloudinary_id) => {
  //var sql = "SELECT * FROM hcmus_book_store.book_info ";
  //sql = sql + "WHERE id='" + req.body.id + "';";
  data = req.body;
  var sql = "UPDATE hcmus_book_store.book_info SET ";
  sql =
    sql +
    "title = '" +
    data.title +
    "', base_price='" +
    data.base_price +
    "', image='" +
    image_url +
    "', isbn='" +
    data.isbn +
    "', supplier='" +
    data.supplier;
  sql =
    sql +
    "', author='" +
    data.author +
    "', publisher='" +
    data.publisher +
    "', public_year='" +
    data.public_year +
    "', weight='" +
    data.weight +
    "', size='" +
    data.size +
    "', number_page='" +
    data.number_page +
    "', page='" +
    data.page +
    "', description='" +
    data.description +
    "', description_title='" +
    data.description_title +
    "', cloudinary_id='" +
    cloudinary_id +
    "' WHERE id='" +
    req.params.id +
    "';";
  console.log(sql);
  await queryAsync(sql);
  return true;
};
