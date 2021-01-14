var connection = require("./connection");
var SQL = require("./SQL");

const LIMITED_ITEM_PER_PAGE = 20;

var pageDetail = {
  currentPage: 1,
  nextPage: 0,
  nextNextPage: 0,
  prevPage: 0,
  prevPrevPage: 0,
  totalPage: 0,
};

//Filter of querry
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
};

//(search, category, price, author, publisher, supplier) is a filter

//1
async function getTotalPage(search, sort, status) {
  var sql = "SELECT COUNT(*) FROM hcmus_book_store.order_info ";
  var bodyStr = await getBodyString(search, sort, status);
  sql += bodyStr + ";";
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
  return result;
}

//Get querry string
//2
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

//3
async function getSearchString(whereStr, search) {
  var result = "";

  if (search == "") {
    var result = "";
  } else {
    search = search.replace("+", " ");
    result = " user_id LIKE '%" + search + "%' ";
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

async function getPriceString(whereStr, price) {
  var result = "";

  if (price == "") {
    var result = "";
  } else {
    if (price == "100000") {
      result = "base_price <= '100000' ";
    } else if (price == "100000-200000") {
      result = "base_price >= '100000' AND base_price <= '200000' ";
    } else if (price == "200000-500000") {
      result = "base_price >= '200000' AND base_price <= '500000' ";
    } else if (price == "500000") {
      result = "base_price >= '500000' ";
    }
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
//4
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
//5
async function getSqlString(page, search, sort, status) {
  var sql = "SELECT * FROM hcmus_book_store.order_info ";
  var offset = LIMITED_ITEM_PER_PAGE * (page - 1);

  var bodyStr = await getBodyString(search, sort, status);

  sql += bodyStr + "LIMIT " + LIMITED_ITEM_PER_PAGE + " OFFSET " + offset + "";

  sql += ";";
  console.log(sql);
  return sql;
}

async function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
      return results;
    });
  });
}

exports.getInvoices = async (page, search, sort, status) => {
  var result;
  var sql = await getSqlString(page, search, sort, status);

  result = await new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) return resolve("error");
      return resolve(result);
    });
  });
  return result;
};

exports.pageNumber = async (page, search, status) => {
  pageDetail.currentPage = page;
  var temp = await getTotalPage(search, status);

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

exports.getPageApi = async (page, search, sort, status) => {
  pageDetailAPI.currentPage = page;
  var temp = await getTotalPage(search, sort, status);

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
  //pageDetailAPI.price = price;
  //pageDetailAPI.publisher = publisher;
  //pageDetailAPI.author = author;
  //pageDetailAPI.supplier = supplier;

  return pageDetailAPI;
};

exports.getOrderByID = async (OrderID) => {
  var result = await new Promise((resolve, reject) => {
    var sql =
      "SELECT * FROM hcmus_book_store.order_info WHERE order_id = '" +
      OrderID +
      "';";
    console.log(sql);
    connection.query(sql, (err, temp) => {
      if (err) return reject(err);
      var result = temp[0];
      return resolve(result);
    });
  });
  return result;
};

exports.getDetailOrderByID = async (OrderID) => {
  var result = await new Promise((resolve, reject) => {
    var sql =
      "SELECT product_id, title, product_price, product_quantity,product_quantity*product_price as total FROM order_detail join book_info on order_detail.product_id=book_info.id  WHERE order_id = '" +
      OrderID +
      "';";
    connection.query(sql, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
  return result;
};

//Set status of product to Block <=> Move product to recycle bin

//Set status of product to Active

//Set status of product to Delete

//Add new product

//Edit product, image change stay in routes/product

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

//Get all category name + id

//Get list category_name of a book

exports.getOrders = async (
  page,
  search,
  sort,
  status
) => {
  var result;
  var sql = await getSqlString(
    page,
    search,
    sort,
    status
  );

  result = await new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) return resolve("error");
      return resolve(result);
    });
  });
  return result;
};

exports.HandleOrder  = async (listOrder,status) => {
  var sql = new SQL();
  sql.Update("order_info");
  sql.Set("status='" +status + "'");
  sql.Where("order_id " + sql.In(listOrder));
  console.log(sql.Query());
  await queryAsync(sql.Query());
};