var usersService = require("../../models/usersService");


exports.userapi = async (req, res, next) => {
    console.log(req.body);
    console.log('user api');
    res.json(await getUser(req, res, next));
}

exports.pageapi = async (req, res, next) => {
   
    res.json(await getpage(req, res, next));
}

async function getUser (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get Search
    const search = req.query.search || "";
    console.log('Below is query');
    console.log(req.query);
    //Get catogoryID

    //Get Sort type
    const sort = req.query.sort || "";

    //Get price

    //Get Supplier

    const status = req.query.status || "";
    // Get books from model
    const users = await usersService.getUsers(curPage, search, sort, status);

    return users;
};

async function getbook_delete (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get Search
    const search = req.query.search || "";

    //Get Sort type
    const sort = req.query.sort || "";

    //Get price
    const price = req.query.price || "";

    //Get Supplie

    // Get books from model
    const books = await ordersService.getOrders(curPage, search,sort, price,'Block');

    return books;
};


async function getpage (req, res, next) {
    //Get current page, default by 1
    const curpage = +req.query.page || 1;

    //Get Search
    const search = req.query.search || "";

    //Get Sort type
    const sort = req.query.sort || "";

    //Get price

    const status = req.query.status || "";
    console.log(req.query);
    //Get Page infomation
    const page = await usersService.getPageApi(curpage, search,sort, status);

    return page;
};

async function getpage_delete (req, res, next) {
    //Get current page, default by 1
    const curPage = +req.query.page || 1;

    //Get Search
    const search = req.query.search || "";

    //Get catogoryID
    const category = req.query.category || "";

    //Get Sort type
    const sort = req.query.sort || "";

    //Get price
    const price = req.query.price || "";

    //Get Supplier
    const supplier = req.query.supplier || "";

    //Get Author
    const author = req.query.author || "";

    //Get publisher
    const publisher = req.query.publisher || "";

    //Get Page infomation
    const page = await productService.getPageApi(curPage, search, category, sort, price, author, publisher, supplier,'Block');

    return page;
};

