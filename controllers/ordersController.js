var ordersService = require("../models/ordersService");


exports.OrderCon = (req, res, next) => {
  if (typeof req.user === "undefined"){ 
    return res.redirect("/signin");
  }
  index(req, res, next);//get index order by day
};

exports.OrderPending = (req, res, next) => {
  if (typeof req.user === "undefined"){ 
    return res.redirect("/signin");
  }
  if (typeof req.user === "undefined"){ 
    return res.redirect("/signin");
  }
  req.query.status='Pending';
  console.log(req.query.status);
  index(req, res, next);//get index order by day
};

exports.OrderDelivery = (req, res, next) => {
  req.query.status='Delivery';
  index(req, res, next);//get index order by day
};

exports.OrderFulfill = (req, res, next) => {
  if (typeof req.user === "undefined"){ 
    return res.redirect("/signin");
  }
  req.query.status='Fulfill';
  index(req, res, next);//get index order by day
};

exports.OrderCancel = (req, res, next) => {
  if (typeof req.user === "undefined"){ 
    return res.redirect("/signin");
  }
  req.query.status='Cancel';
  index(req, res, next);//get index order by day
};

exports.OrderHandleSubmit = async (req, res, next) => {
  var result = [];
  for (var i in req.body) result.push(i);
  if (req.body.delivery) {
    await ordersService.HandleOrder(result,'Delivery');
  } else if (req.body.fulfill)
  {
    await ordersService.HandleOrder(result,'Fulfill');
  }
  else if (req.body.cancel){
    await ordersService.HandleOrder(result,'Cancel');
  }

  res.redirect('back');
};

exports.OrderDetail = (req, res, next) => {
  if (typeof req.user === "undefined"){ 
    return res.redirect("/signin");
  }
  index(req, res, next);//get invoice
};

exports.OrderPendingList = (req, res, next) => {
  index(req, res, next);//get index order by day status=Chưa duyệt
};

exports.OrderPendingList = (req, res, next) => {
  index(req, res, next);//get index order by day status=Đang vận chuyển
};

exports.OrderFullfillList = (req, res, next) => {
  index(req, res, next);//get index order by day status=Hoàn tất
};


async function getbook (req, res, next) {
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get Search
  const search = req.query.search || "";

  //Get Sort type
  const sort = req.query.sort || "";

  //Get price
  const price = req.query.price || "";

  const status = req.query.status || "";
  // Get books from model
  //const books = await productService.getBooks(curPage, search, sort, price, status);

  return books;
};


async function getpage (req, res, next) {
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get Search
  const search = req.query.search || "";

  //Get Sort type
  const sort = req.query.sort || "";

  //Get price
  const price = req.query.price || "";

  const status = req.query.status || "";

  //Get Page infomation
  const page = await productService.getPageApi(curPage, search, sort, price, status);

  return page;
};

async function index(req, res, next) {
  //Get current page, default by 1
  const curPage = +req.query.page || 1;

  //Get Search
  const search = req.query.search || "";

  //Get catogory
  //const category = req.query.category || "";

  //Get Sort type
  const sort = req.query.sort || "";

  //Get price
  const price = req.query.price || "";

  const status = req.query.status || "";
  //Get Supplier
  //const supplier = req.query.supplier || "";

  //Get Author
  //const author = req.query.author || "";

  //Get publisher
  //const publisher = req.query.publisher || "";

  //Get Page infomation
  const page = await ordersService.pageNumber(
    curPage,
    search,
    status
  );
  console.log(page);
  // Get books from model
  const orders = await ordersService.getOrders(
    page.currentPage,
    search,
    sort,
    status
  );
  console.log(orders)

  //get new url


  const sortURL = await ordersService.getURL(
    search,
    sort,
    price,
    2
  );
  const defaultsortURL = sortURL.substring(0, sortURL.length - 1);

  const priceURL = await ordersService.getURL(
    search,
    sort,
    price,
    3
  );
  const defaultpriceURL = priceURL.substring(0, priceURL.length - 1);

  /*const authorURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 4);
  const defaultauthorURL = authorURL.substring(0,authorURL.length-1);

  const publisherURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 5);
  const defaultpublisherURL = publisherURL.substring(0,publisherURL.length-1);

  const supplierURL = await bookService.getURL(category, sort, price, author, publisher, supplier, 6);
  const defaultsupplierURL = supplierURL.substring(0,supplierURL.length-1);*/

  const sortCode = await ordersService.getSortCode(sort);
  const priceCode = await ordersService.getPriceCode(price);

  // Pass data to view to display list of books
  res.render("invoice/list", {
    layout: "main_layout",
    orders,
    page,
    sort,
    sortCode,
    defaultsortURL,
    sortURL,
    price,
    priceCode,
    defaultpriceURL,
    priceURL,
    search,
  });
}



exports.OrderDetail= async(req, res, next)=>{

var info=await ordersService.getOrderByID(req.params.id);
var detail=await ordersService.getDetailOrderByID(req.params.id);
console.log('detail');
console.log(detail);
res.render('invoice/detail',{layout:'main_layout',detail,info})
}