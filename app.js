const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express_hbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const configRoutes = require("./routes");
const securityFile = require("./routes/security.js");


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.engine('handlebars', express_hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'mysecretkey546',
  cookie: {},
  resave: false,
  saveUninitialized: false
}));

 //mount logger
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// login check handler
app.use( function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,crossdomain,withcredentials,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin,TokenType");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  if (req.session.auth) {
    next();
  } else {
    securityFile(req,val => {
      if(val.res == 0){
        next();
      }else{
        res.redirect("./main_Page/homePage")
      }
    });
  }
});

configRoutes(app);

app.use(function (err, req, res, next) {
  err.status = 404;
  next(err);
});

app.use(errorHandler());

module.exports = app;