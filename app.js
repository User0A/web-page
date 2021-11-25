const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
  .connect(
      "mongodb://localhost/persons",
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(express.static(__dirname + '/views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/illnesses', require('./routes/illnesses.js'));
app.use('/hospitals', require('./routes/hospitals.js'));
app.use('/industries', require('./routes/industries.js'));
app.use('/pills', require('./routes/pills.js'));
app.use('/providers', require('./routes/providers.js'));
app.use('/providerpills', require('./routes/providerpills.js'));
app.use('/industryproviders', require('./routes/industryproviders.js'));
app.use('/illnesshospitals', require('./routes/illnesshospitals.js'));


let port = process.env.PORT;
if (port==null || port== ""){
    port = 3000;
}
app.listen(port, console.log(`Server running on  ${port}`));
