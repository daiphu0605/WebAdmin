var connection = require("./connection");
const SQL = require("./SQL");

const LIMITED_ITEM_PER_PAGE = 5;

var pageDetail = {
  currentPage: 1,
  nextPage: 0,
  nextNextPage: 0,
  prevPage: 0,
  prevPrevPage: 0,
  totalPage: 0,
};

var pageDetailAPI = {
  currentPage: 1,
  nextPage: 0,
  nextNextPage: 0,
  prevPage: 0,
  prevPrevPage: 0,
  totalPage: 0,
  search: "",
  sort: "",
  price: "",
  status:""
};

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
//yet
async function getSortString(sort) {
  var result = "";

  if (sort == "") {
    result = "";
  } else if (sort == "popularity") {
    result = "ORDER BY views DESC ";
  } else if (sort == "rating") {
  } else if (sort == "newest") {
    result = "ORDER BY day_add DESC ";
  } else if (sort == "oldest") {
    result = "ORDER BY day_add ASC ";
  } else if (sort == "low-high") {
    result = "ORDER BY base_price ASC ";
  } else if (sort == "high-low") {
    result = "ORDER BY base_price DESC ";
  }

  return result;
}

//yet
async function getSearchString(whereStr, search) {
  var result = "";

  if (search == "") {
    var result = "";
  } else {
    search = search.replace("+", " ");
    result = " username LIKE '%" + search + "%' ";
  }

  if (result != "") {
    if (whereStr == "") {
      result = "WHERE " + result;
    } else {
      result = "AND " + result;
    }
  }

  return result;
}

//yet
async function getBodyString(search, sort, status) {
  var result = "";

  //order by
  var sortStr = await getSortString(sort);

  //where
  var whereStr = "";
  //var categoryStr = await getCategoryString(category);
  //whereStr += categoryStr;

  var searchStr = await getSearchString(whereStr, search);
  whereStr += searchStr;


  //var authorStr = await getAuthorString(whereStr, author);
  //whereStr += authorStr;

  //var publisherStr = await getPublisherString(whereStr, publisher);
  //whereStr += publisherStr;

  //var supplierStr = await getSupplierString(whereStr, supplier);
  //whereStr += supplierStr;
  console.log('User service bodystring status');
  console.log(status);
  if (status) {
    var status_string = "status='" + status + "' ";
    if (whereStr) {
      status_string = "AND status='" + status + "' ";
    } else {
      status_string = "WHERE status='" + status + "' ";
    }
    result = whereStr + status_string + sortStr;
  } else {
    result = result + whereStr + sortStr;
  }
  console.log(result);
  return result;
}

async function getSqlString(page, search, sort, status) {
  var sql = "SELECT * FROM hcmus_book_store.user_info ";
  var offset = LIMITED_ITEM_PER_PAGE * (page - 1);

  var bodyStr = await getBodyString(search, sort,  status);

  sql += bodyStr + "LIMIT " + LIMITED_ITEM_PER_PAGE + " OFFSET " + offset + "";

  sql += ";";
  console.log(sql);
  return sql;
}

//yet
async function getTotalPage(search, sort, status) {
  var sql = "SELECT COUNT(*) FROM hcmus_book_store.user_info ";
  var bodyStr = await getBodyString(search, sort, status);
  sql += bodyStr + ";";
  console.log('get total page');
  console.log(status);
  console.log(sql);
  var result = await new Promise((resolve, reject) => {
    connection.query(sql, (err, temp) => {
      if (err) return resolve("error");

      var item = temp[0];
      var numOfItems = item["COUNT(*)"];
      console.log("Number orders");
      console.log(numOfItems);
      var result;

      if (numOfItems % LIMITED_ITEM_PER_PAGE == 0) {
        result = parseInt(numOfItems / LIMITED_ITEM_PER_PAGE);
      } else {
        result = parseInt(numOfItems / LIMITED_ITEM_PER_PAGE) + 1;
      }

      return resolve(result);
    });
  });
  console.log(result);
  return result;
}

exports.users = async (page, catID) => {
  const listBooks = await getUsers(page, catID);
  return listBooks;
};

//Yet
exports.pageNumber = async (page, search, status) => {
  pageDetail.currentPage = page;
  console.log('status pagenumber');
  console.log(status);
  var temp = await getTotalPage(search,'',status);

  if (temp == "error") {
    pageDetail.totalPage = 1;
  } else {
    pageDetail.totalPage = temp;
  }

  if (pageDetail.currentPage < 1) {
    pageDetail.currentPage = 1;
  }

  if (pageDetail.currentPage > pageDetail.totalPage) {
    pageDetail.currentPage = pageDetail.totalPage;
  }

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

exports.unblockUsers = async (listUser) => {
  console.log(listUser);
  var sql = new SQL();
  sql.Update("user_info");
  sql.Set("status='Active'");
  sql.Where("username " + sql.In(listUser));
  console.log(sql.Query());
  await queryAsync(sql.Query());
};

//Set status of product to Delete
exports.deleteUsers  = async (listUser) => {
  console.log(listUser);
  var sql = new SQL();
  sql.Update("user_info");
  sql.Set("status='Delete'");
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

exports.getUsers = async (page, search, sort, status) => {
  var result;
  var sql = await getSqlString(page, search, sort, status);
  console.log(sql);
  result = await new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) return resolve("error");
      return resolve(result);
    });
  });
  console.log(result);
  return result;
};

exports.getPageApi = async (page, search, sort, status) => {
  pageDetailAPI.currentPage = page;
  var temp = await getTotalPage(search, sort, status);
  console.log('page api');
  console.log(page);
  if (temp == "error") {
    pageDetailAPI.totalPage = 1;
  } else {
    pageDetailAPI.totalPage = temp;
  }

  if (pageDetailAPI.currentPage < 1) {
    pageDetailAPI.currentPage = 1;
  }

  if (pageDetailAPI.currentPage > pageDetailAPI.totalPage) {
    pageDetailAPI.currentPage = pageDetailAPI.totalPage;
  }

  if (pageDetailAPI.currentPage <= 1) {
    pageDetailAPI.prevPage = 0;
  } else {
    pageDetailAPI.prevPage = pageDetailAPI.currentPage - 1;
  }

  if (pageDetailAPI.prevPage <= 1) {
    pageDetailAPI.prevPrevPage = 0;
  } else {
    pageDetailAPI.prevPrevPage = pageDetailAPI.prevPage - 1;
  }

  if (pageDetailAPI.currentPage >= pageDetailAPI.totalPage) {
    pageDetailAPI.nextPage = 0;
  } else {
    pageDetailAPI.nextPage = pageDetailAPI.currentPage + 1;
  }

  if (
    pageDetailAPI.nextPage >= pageDetailAPI.totalPage ||
    pageDetailAPI.nextPage == 0
  ) {
    pageDetailAPI.nextNextPage = 0;
  } else {
    pageDetailAPI.nextNextPage = pageDetailAPI.nextPage + 1;
  }

  pageDetailAPI.search = search;
  //pageDetailAPI.category = category;
  pageDetailAPI.sort = sort;
  pageDetailAPI.status = status;
  //pageDetailAPI.price = price;
  //pageDetailAPI.publisher = publisher;
  //pageDetailAPI.author = author;
 //pageDetailAPI.supplier = supplier;

  return pageDetailAPI;
};

exports.getURL = async (
  search,
  category,
  sort,
  price,
  author,
  publisher,
  supplier,
  mode
) => {
  var urlString = "/shop";
  var flag = 0;

  if (mode == 0) {
    search = "";
  } else if (mode == 1) {
    category = "";
  } else if (mode == 2) {
    sort = "";
  } else if (mode == 3) {
    price = "";
  } else if (mode == 4) {
    author = "";
  } else if (mode == 5) {
    publisher = "";
  } else if (mode == 6) {
    supplier = "";
  }

  if (search != "") {
    urlString += "?search=" + search;
    flag++;
  }

  if (category != "") {
    if (flag > 0) {
      urlString += "&category=" + category;
    } else {
      urlString += "?category=" + category;
    }
    flag++;
  }

  if (sort != "") {
    if (flag > 0) {
      urlString += "&sort=" + sort;
    } else {
      urlString += "?sort=" + sort;
    }
    flag++;
  }

  if (price != "") {
    if (flag > 0) {
      urlString += "&price=" + price;
    } else {
      urlString += "?price=" + price;
    }
    flag++;
  }

  if (author != "") {
    if (flag > 0) {
      urlString += "&author=" + author;
    } else {
      urlString += "?author=" + author;
    }
    flag++;
  }

  if (publisher != "") {
    if (flag > 0) {
      urlString += "&publisher=" + publisher;
    } else {
      urlString += "?publisher=" + publisher;
    }
    flag++;
  }

  if (supplier != "") {
    if (flag > 0) {
      urlString += "&supplier=" + supplier;
    } else {
      urlString += "?supplier=" + supplier;
    }
    flag++;
  }

  if (flag > 0) {
    urlString += "&";
  } else {
    urlString += "?";
  }

  return urlString;
};

exports.getSortCode = async (sort) => {
  var code = 0;

  if (sort == "") {
    code = 0;
  } else if (sort == "popularity") {
    code = 1;
  } else if (sort == "rating") {
    code = 2;
  } else if (sort == "newest") {
    code = 3;
  } else if (sort == "oldest") {
    code = 4;
  } else if (sort == "low-high") {
    code = 5;
  } else if (sort == "high-low") {
    code = 6;
  }
  return code;
};

exports.getPriceCode = async (price) => {
  var code = 0;

  if (price == "") {
    code = 0;
  } else if (price == "100000") {
    code = 1;
  } else if (price == "100000-200000") {
    code = 2;
  } else if (price == "200000-500000") {
    code = 3;
  } else if (price == "500000") {
    code = 4;
  }

  return code;
};
