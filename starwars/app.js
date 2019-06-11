const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const constants = require('./constants');

const { LinkMongoDB } = constants;

mongoose.connect(LinkMongoDB, { useNewUrlParser: true }).then(() => {
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Not Connected to Database ERROR!', err);
});

const indexRouter = require('./routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).render('error');
});

module.exports = app;
