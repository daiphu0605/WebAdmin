var connection = require("./connection");
var SQL = require("./SQL");

const LIMITED_ITEM_PER_PAGE = 10;

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
  category: "",
  sort: "",
  price: "",
  author: "",
  publisher: "",
  supplier: "",
};

//(search, category, price, author, publisher, supplier) is a filter

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

async function getBookIDByCatIDLimit(catID, limit) {
  var result = await new Promise((resolve, reject) => {
    var sql =
      "SELECT id_book FROM hcmus_book_store.list_categories WHERE id_category = '" +
      catID +
      "' LIMIT " +
      limit +
      ";";

    connection.query(sql, (err, temp) => {
      if (err) return reject(err);
      return resolve(temp);
    });
  });
  return result;
}

async function getTotalPage(
  search,
  category,
  price,
  author,
  publisher,
  supplier,
  status = "Active"
) {
  var sql = "SELECT COUNT(*) FROM hcmus_book_store.book_info ";
  console.log("Inside get total page");
  console.log(status);
  var bodyStr = await getBodyString(
    search,
    category,
    "",
    price,
    author,
    publisher,
    supplier,
    status
  );
  sql += bodyStr + ";";

  var result = await new Promise((resolve, reject) => {
    connection.query(sql, (err, temp) => {
      if (err) return resolve("error");

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
async function getMaxID() {
  var sql = "SELECT MAX(id) FROM hcmus_book_store.book_info";
  result = await queryAsync(sql);
  return result[0]["MAX(id)"];
}

//Get querry string
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
  } else if (sort == "id") {
    result = "ORDER BY id ASC ";
  } else if (sort == "title") {
    result = "ORDER BY title ASC ";
  } else if (sort == "price") {
    result = "ORDER BY base_price ASC ";
  } else if (sort == "author") {
    result = "ORDER BY author ASC ";
  }

  return result;
}

async function getCategoryString(category) {
  var result = "";

  if (category == "") {
    var result = "";
  } else {
    var catID = await getCategoryID(category);
    console.log(catID);

    if (catID != "") {
      var ListBookID = await getBookIDByCatID(catID);
      result = "WHERE id IN (";
      ListBookID.forEach(
        (element) => (result += "'" + element["id_book"] + "',")
      );
      result = result.substr(0, result.length - 1);
      result += ") ";
    }
  }

  return result;
}

async function getSearchString(whereStr, search) {
  var result = "";

  if (search == "") {
    var result = "";
  } else {
    search = search.replace("+", " ");
    result = " title LIKE '%" + search + "%' ";
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

async function getAuthorString(whereStr, author) {
  var result = "";

  if (author == "") {
    var result = "";
  } else {
    author = author.replace("+", " ");
    result = " author LIKE '%" + author + "%' ";
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

async function getPublisherString(whereStr, publisher) {
  var result = "";

  if (publisher == "") {
    var result = "";
  } else {
    publisher = publisher.replace("+", " ");
    result = " publisher LIKE '%" + publisher + "%' ";
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

async function getSupplierString(whereStr, supplier) {
  var result = "";

  if (supplier == "") {
    var result = "";
  } else {
    supplier = supplier.replace("+", " ");
    result = " supplier LIKE '%" + supplier + "%' ";
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
async function getBodyString(
  search,
  category,
  sort,
  price,
  author,
  publisher,
  supplier,
  status = "Active"
) {
  var result = "";

  //order by
  var sortStr = await getSortString(sort);

  //where
  var whereStr = "";
  var categoryStr = await getCategoryString(category);
  whereStr += categoryStr;

  var searchStr = await getSearchString(whereStr, search);
  whereStr += searchStr;

  var priceStr = await getPriceString(whereStr, price);
  whereStr += priceStr;

  var authorStr = await getAuthorString(whereStr, author);
  whereStr += authorStr;

  var publisherStr = await getPublisherString(whereStr, publisher);
  whereStr += publisherStr;

  var supplierStr = await getSupplierString(whereStr, supplier);
  whereStr += supplierStr;

  status_string = "status='" + status + "' ";
  if (whereStr) {
    status_string = "AND status='" + status + "' ";
  } else {
    status_string = "WHERE status='" + status + "' ";
  }
  result = whereStr + status_string + sortStr;
  console.log(result);
  return result;
}
async function getSqlString(
  page,
  search,
  category,
  sort,
  price,
  author,
  publisher,
  supplier,
  status = "Active"
) {
  var sql = "SELECT * FROM hcmus_book_store.book_info ";
  var offset = LIMITED_ITEM_PER_PAGE * (page - 1);

  var bodyStr = await getBodyString(
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
    status
  );

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

async function removeAllCatbyBookID(BookID) {
  var sql = "DELETE FROM list_categories WHERE id_book = ";
  sql = sql + BookID;
  console.log(sql);
  result = await queryAsync(sql);
  return result;
}

exports.getBooks = async (
  page,
  search,
  category,
  sort,
  price,
  author,
  publisher,
  supplier,
  status = "Active"
) => {
  var result;
  var sql = await getSqlString(
    page,
    search,
    category,
    sort,
    price,
    author,
    publisher,
    supplier,
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

exports.pageNumber = async (
  page,
  search,
  category,
  price,
  author,
  publisher,
  supplier,
  status = "Active"
) => {
  pageDetail.currentPage = page;
  var temp = await getTotalPage(
    search,
    category,
    price,
    author,
    publisher,
    supplier,
    status
  );

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

exports.getPageApi = async (
  page,
  search,
  category,
  sort,
  price,
  author,
  publisher,
  supplier,
  status = "Active"
) => {
  pageDetailAPI.currentPage = page;
  var temp = await getTotalPage(
    search,
    category,
    price,
    author,
    publisher,
    supplier,
    status
  );

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
  pageDetailAPI.category = category;
  pageDetailAPI.sort = sort;
  pageDetailAPI.price = price;
  pageDetailAPI.publisher = publisher;
  pageDetailAPI.author = author;
  pageDetailAPI.supplier = supplier;

  return pageDetailAPI;
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

//Set status of product to Block <=> Move product to recycle bin
exports.removeProducts = async (listProduct) => {
  console.log(listProduct);
  var sql = new SQL();
  sql.Update("book_info");
  sql.Set("status='Block'");
  sql.Where("id " + sql.In(listProduct));
  console.log(sql.Query());
  await queryAsync(sql.Query());
};

//Set status of product to Active
exports.restoreProducts = async (listProduct) => {
  console.log(listProduct);
  var sql = new SQL();
  sql.Update("book_info");
  sql.Set("status='Active'");
  sql.Where("id " + sql.In(listProduct));
  console.log(sql.Query());
  await queryAsync(sql.Query());
};

//Set status of product to Delete
exports.deleteProducts = async (listProduct) => {
  console.log(listProduct);
  var sql = new SQL();
  sql.Update("book_info");
  sql.Set("status='Delete'");
  sql.Where("id " + sql.In(listProduct));
  console.log(sql.Query());
  await queryAsync(sql.Query());
};

//Add new product
exports.addNewProduct = async (req, res, image_url, cloudinary_id) => {
  data = req.body;
  console.log(typeof(data.description_title));
  data.description_title = data.description_title.replace(/'/g, "");
  data.description_title = data.description_title.replace(/"/g, "");
  data.description = data.description.replace(/'/g, "");
  data.description = data.description.replace(/"/g, "");
  var id = await getMaxID();
  id += 1;
  //Add to hcmus_book_store.book_info
  var sql =
    "INSERT INTO hcmus_book_store.book_info (id, title, base_price, image, isbn, supplier, author, publisher, public_year, weight, size, number_page, page, description_title, description,cloudinary_id) VALUES ";
  sql =
    sql +
    "(" +
    id +
    ", '" +
    data.title +
    "', '" +
    data.base_price +
    "', '" +
    image_url +
    "', '" +
    data.isbn +
    "', '" +
    data.supplier;
  sql =
    sql +
    "', '" +
    data.author +
    "', '" +
    data.publisher +
    "', '" +
    data.public_year +
    "', '" +
    data.weight +
    "', '" +
    data.size +
    "', '" +
    data.number_page +
    "', '" +
    data.page +
    "', '" +
    data.description_title +
    "', '" +
    data.description +
    "', '" +
    cloudinary_id +
    "')";
  console.log(sql);
  await queryAsync(sql);

  //Add to hcmus_book_store.list_categories
  sql =
    "INSERT INTO hcmus_book_store.list_categories(id_book,id_category) VALUES ";
  console.log(data.category);
  var iduser_category;
  if (!data.category) return true;

  data.category.forEach((element) => {
    iduser_category = "('" + id + "','" + element + "'),";
    sql += iduser_category;
  });
  sql = sql.slice(0, -1);
  console.log(sql);
  await queryAsync(sql);
  return true;
};

//Edit product, image change stay in routes/product
exports.editProduct = async (req, res, image_url, cloudinary_id) => {
  data = req.body;
  //Update hcmus_book_store.book_info
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
  //Add to hcmus_book_store.list_categories
  await removeAllCatbyBookID(req.params.id);
  sql =
    "INSERT INTO hcmus_book_store.list_categories(id_book,id_category) VALUES ";
  var idbook_category;
  data.category.forEach((element) => {
    idbook_category = "('" + req.params.id + "','" + element + "'),";
    sql += idbook_category;
  });
  sql = sql.slice(0, -1);
  console.log(sql);
  await queryAsync(sql);
  return true;
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

//Get all category name + id
exports.getCategoryList = async () => {
  var sql = "SELECT * FROM hcmus_book_store.category";
  result = await queryAsync(sql);
  return result;
};

//Get list category_name of a book
exports.getCatbyBookID = async (BookID) => {
  var sql =
    "SELECT category.id_category, category.category_name FROM category JOIN list_categories ON category.id_category=list_categories.id_category WHERE list_categories.id_book=";
  sql = sql + BookID;
  console.log(sql);
  result = await queryAsync(sql);
  return result;
};
