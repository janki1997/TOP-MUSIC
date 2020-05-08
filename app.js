/* TOP MUSIC
 * App
 * ~
 */

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const session = require('express-session');
const securityFile = require("./routes/security.js");
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({
  secret: 'mysecretkey546',
  cookie: {},
  resave: false,
  saveUninitialized: false
}));

require("./routes")(app);

app.use(function (req, res, next) {

  if (req.session.auth) {
    next();
  } else {
    securityFile(req, val => {
      if (val.res == 0) {
        next();
      } else {
        res.render("/layouts/home")
      }
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
  if (process && process.send) process.send({ done: true });
});