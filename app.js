var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
var hbs = require( 'express-handlebars' );
var passport = require('./controllers/passport');
var session = require('express-session');


dotenv.config({
  path: path.resolve(__dirname, "./.env"),
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter=require("./routes/products");
var ordersRouter=require("./routes/orders");
var statisicRouter=require("./routes/statistic");

var signIn = require("./routes/signin");
var signOut = require("./routes/signout");


var productsAPI=require("./routes/api/products");
var ordersAPI=require("./routes/api/orders");
var usersAPI=require("./routes/api/users");

var app = express();

var connection = require("./models/connection");

//

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(session({ 
  secret: 'anything', 
  resave: true, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", statisicRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.use("/signin?", signIn);
app.use("/signout", signOut);

app.use("/api/products",productsAPI);
app.use("/api/orders",ordersAPI);
app.use("/api/users",usersAPI);
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
