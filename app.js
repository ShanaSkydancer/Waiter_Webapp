'use strict';

const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const $ = require("jquery");
const format = require("util").format;

var app = express();

//Folders being accessed
//'public' is the folder that styling, fonts, images are in
app.use(express.static('public'));
//'views' is the folder where my layouts are in
app.use(express.static('views'));
//'routes' is where my specific handlebar templates and js functions are
app.use(express.static('routes'));
//'vendors' is where my template files are
app.use(express.static('vendors'));

//Connect Mongoose to your .js and have it access the MongoBD
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiter_webapps";
mongoose.connect(mongoURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the DB!');
});

  var workingSchema = new mongoose.Schema({
    waiter: String,
    days: Array
  });
  const workingModel = mongoose.model('workingModel', workingSchema);

//Port and environment variable
app.set('port', (process.env.PORT || 3000));

//Use ExpressHandlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Use bodyParser
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Use flash for error messages
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));
app.use(flash());

//Functions being accessed
const WaiterRoutes = require("./waiteravailability");

//Access the function
const waiterAvailabilityRoutes = WaiterRoutes(workingModel);

//Using "/" makes it the "index page" i.e. it has no route
app.get('/', (req, res) => {
  res.render("index");
});

//Showing the loging
// app.get('/waiter', waiterAvailabilityRoutes.login);
//Route to add waiters
// app.get('/waiter/add', waiterAvailabilityRoutes.add);
// app.get('/log-in', function (req, res) {
//   res.render("login");
// });

// app.get('/admin', function (req, res) {
//   res.render("admin");
// });

// app.get('/waiter', function (req, res) {
//   res.render("waiter");
// });

//Shows the login for admin of waiter to access
app.get('/login', waiterAvailabilityRoutes.login);
app.get('/waiter/:username', waiterAvailabilityRoutes.waiter);
app.get('/admin', waiterAvailabilityRoutes.admin);
//Post data
app.post('/login', waiterAvailabilityRoutes.login);
app.post('/waiter/:username', waiterAvailabilityRoutes.waiter);
app.post('/admin/remove', waiterAvailabilityRoutes.remove);



//Hosts my server
var server = app.listen(app.get("port"), () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Waiter Webapp listening at http://%s:%s', host, port);
});