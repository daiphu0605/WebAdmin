var mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

var connection = mysql.createConnection({
  host: process.env.DB_HOST, //host:'45.77.129.37',
  user: process.env.DB_USER, // user:'hcmus_book_store',
  password: process.env.DB_PASS, //password:'fBGHJJdjS8WaEjJB',
  database: process.env.DB_DATABASE //database:'hcmus_book_store'
});

/*var connection = mysql.createConnection({
  host:'45.77.129.37',
  user:'hcmus_book_store',
  password:'fBGHJJdjS8WaEjJB',
  database:'hcmus_book_store'
});*/

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("DB connected...");
  }
});

module.exports = connection;
