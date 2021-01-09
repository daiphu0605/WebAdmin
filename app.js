var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
var hbs = require( 'express-handlebars' );


require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter=require("./routes/products");


var signIn = require("./routes/signin");
var signUp = require("./routes/signup");

var productsAPI=require("./routes/api/products");

var app = express();

var connection = require("./models/connection");

//

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use("/signin", signIn);
app.use("/signUp", signUp);

app.use("/api/products",productsAPI);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
