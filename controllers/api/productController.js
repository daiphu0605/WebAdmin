var productService = require("../../models/productService");
var search = require('../../models/search');

exports.bookapi = async (req, res, next) => {
    console.log(req.body);
    res.json(await getbook(req, res, next));
}

exports.pageapi = async (req, res, next) => {
    console.log(req.body);
    res.json(await getpage(req, res, next));
}

async function getbook (req, res, next) {
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

    const status = req.query.status || "";
    // Get books from model
    const books = await productService.getBooks(curPage, search, category, sort, price, author, publisher, supplier,status);

    return books;
};

async function getbook_delete (req, res, next) {
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

    // Get books from model
    const books = await productService.getBooks(curPage, search, category, sort, price, author, publisher, supplier,'Block');

    return books;
};


async function getpage (req, res, next) {
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

    const status = req.query.status || "";

    //Get Page infomation
    const page = await productService.getPageApi(curPage, search, category, sort, price, author, publisher, supplier,status);

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

exports.oldbookapi = async (req, res, next) => {
    res.json(await getbook(req, res, next))
}
