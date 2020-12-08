var conn = require('./connection');
const SQL = require('./SQL');

exports.Search = async (value, page, itemLimit) => {
    var sql = new SQL();
    var offset = itemLimit * (page - 1);
    sql.Select("*");
    sql.From("book_info");
    sql.Where("title = '" + value + "' or author = '" + value + "'");
    sql.Limit(itemLimit);
    sql.Offset(offset);
    var s = sql.Query();
    var Result = await new Promise((resolve, reject) => {
        conn.query(sql.Query(),(err,results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
    return Result;
}

exports.Amount = async (value) => {
    var results = getAmount(value);
    return results;
}

async function getAmount(value) {
    var sql = new SQL();
    sql.Select("COUNT(*)");
    sql.From("hcmus_book_store.book_info");
    sql.Where("title = '" + value + "' or author = '" + value + "'");
    var str = sql.Query();
    var Result = await new Promise((resolve, reject) => {
        conn.query(sql.Query(),(err,results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
    var results = Result;
    return Result;
}